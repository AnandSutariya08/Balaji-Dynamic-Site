import { useState, useRef, useEffect } from "react";
import { X, Upload, Loader2, Plus, Trash2, ImageIcon, AlertCircle } from "lucide-react";
import { addBlog, updateBlog } from "@/lib/firestore/blogs";
import { uploadImage } from "@/lib/firestore/storage";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost, BlogInput } from "@/lib/firestore/types";

const CATEGORIES = ["Technical", "Guide", "Industry"] as const;

const EMPTY: BlogInput = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  image: "",
  category: "Technical",
  readTime: "",
  date: new Date().toISOString().split("T")[0],
  author: "Balaji Engineering Works",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface Props {
  post?: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function BlogForm({ post, onClose, onSaved }: Props) {
  const isEdit = !!post;
  const [form, setForm] = useState<BlogInput>(
    post ? { slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content, image: post.image, category: post.category, readTime: post.readTime, date: post.date, author: post.author }
    : EMPTY
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(post?.image || "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof BlogInput, value: string) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !isEdit) next.slug = slugify(value);
      return next;
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFirebaseConfigured()) {
      setError("Firebase is not configured. Add your VITE_FIREBASE_* secrets to enable saving.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      let imageUrl = form.image;
      if (imageFile) {
        setUploadProgress(0);
        imageUrl = await uploadImage(imageFile, "blog-images", setUploadProgress);
        setUploadProgress(null);
      }
      const data: BlogInput = { ...form, image: imageUrl };
      if (isEdit && post) {
        await updateBlog(post.id, data);
      } else {
        await addBlog(data);
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save. Check Firebase configuration.");
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-2xl h-full bg-[#141414] border-l border-white/8 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
          <h2 className="text-white font-bold text-base">{isEdit ? "Edit Blog Post" : "New Blog Post"}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {!isFirebaseConfigured() && (
            <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Firebase not configured. Fill in the form — saving will work once you add your <code className="font-mono bg-black/30 px-1 rounded">VITE_FIREBASE_*</code> secrets.</p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 rounded-xl p-4 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{error}
            </div>
          )}

          <Field label="Title" required>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="CNC Machining: A Comprehensive Guide" className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug" required>
              <input value={form.slug} onChange={(e) => set("slug", e.target.value)} required placeholder="cnc-machining-guide" className={inputCls} />
            </Field>
            <Field label="Category" required>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Read Time">
              <input value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="8 min read" className={inputCls} />
            </Field>
            <Field label="Date">
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
            </Field>
          </div>

          <Field label="Author">
            <input value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Balaji Engineering Works" className={inputCls} />
          </Field>

          <Field label="Cover Image">
            <input type="hidden" ref={fileRef as any} />
            <div
              onClick={() => fileRef.current?.click()}
              className="relative border-2 border-dashed border-white/10 hover:border-[#AC3C3C]/50 rounded-xl overflow-hidden cursor-pointer transition-colors"
              style={{ minHeight: 140 }}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="" className="w-full h-36 object-cover opacity-70" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium flex items-center gap-2"><Upload className="w-4 h-4" />Change image</span>
                  </div>
                </>
              ) : (
                <div className="h-36 flex flex-col items-center justify-center gap-2 text-zinc-500">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-sm">Click to upload cover image</span>
                  <span className="text-xs">JPG, PNG, WebP</span>
                </div>
              )}
              {uploadProgress !== null && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                  <div className="h-full bg-[#AC3C3C] transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <p className="text-xs text-zinc-600 mt-1">Or paste a URL directly:</p>
            <input value={form.image} onChange={(e) => { set("image", e.target.value); if (!imageFile) setImagePreview(e.target.value); }} placeholder="https://..." className={inputCls + " mt-1"} />
          </Field>

          <Field label="Excerpt" required>
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required rows={3} placeholder="Brief summary shown on the blog listing page..." className={textareaCls} />
          </Field>

          <Field label="Content (HTML)" required>
            <textarea value={form.content} onChange={(e) => set("content", e.target.value)} required rows={14} placeholder="<h2>Introduction</h2><p>Your article content...</p>" className={`${textareaCls} font-mono text-xs`} />
            <p className="text-xs text-zinc-600 mt-1">HTML is supported. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, etc.</p>
          </Field>
        </form>

        <div className="px-6 py-4 border-t border-white/8 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit as any}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#AC3C3C] hover:bg-[#c44040] text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />{uploadProgress !== null ? `Uploading ${uploadProgress}%` : "Saving..."}</> : isEdit ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5 block">
        {label}{required && <span className="text-[#AC3C3C] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#AC3C3C]/60 transition-colors";
const textareaCls = "w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#AC3C3C]/60 transition-colors resize-none";
