"use client";

import type { FormEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { AlertCircle, ImageIcon, Loader2, Upload, X } from "lucide-react";
import { addBlog, updateBlog } from "@/lib/firestore/blogs";
import { uploadImage } from "@/lib/firestore/storage";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { BlogInput, BlogPost } from "@/lib/firestore/types";

const CATEGORIES = ["Technical", "Guide", "Industry"] as const;

const EMPTY: BlogInput = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  image: "",
  category: "Technical",
  readTime: "",
  date: new Date().toISOString().split("T")[0] ?? "",
  author: "Balaji Engineering Works",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogForm({
  post,
  onClose,
  onSaved,
}: {
  post?: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(post);
  const [form, setForm] = useState<BlogInput>(
    post
      ? {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          category: post.category,
          readTime: post.readTime,
          date: post.date,
          author: post.author,
        }
      : EMPTY,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(post?.image || "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const updateField = (key: keyof BlogInput, value: string) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !isEdit) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isFirebaseConfigured()) {
      setError(
        "Firebase is not configured. Add your NEXT_PUBLIC_FIREBASE_* variables to enable saving.",
      );
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

      const payload: BlogInput = { ...form, image: imageUrl };

      if (isEdit && post) {
        await updateBlog(post.id, payload);
      } else {
        await addBlog(payload);
      }

      onSaved();
      onClose();
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : "Failed to save blog post.";
      setError(message);
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-white/8 bg-[#141414]">
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4">
          <h2 className="text-base font-bold text-white">
            {isEdit ? "Edit Blog Post" : "New Blog Post"}
          </h2>
          <button type="button" onClick={onClose} className="text-zinc-500 transition-colors hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-5 overflow-y-auto p-6">
          {!isFirebaseConfigured() && (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Firebase not configured. Saving will work after you add your{" "}
                <code className="rounded bg-black/30 px-1 font-mono">
                  NEXT_PUBLIC_FIREBASE_*
                </code>{" "}
                variables.
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <Field label="Title" required>
            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              required
              placeholder="CNC Machining: A Comprehensive Guide"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug" required>
              <input
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                required
                placeholder="cnc-machining-guide"
                className={inputCls}
              />
            </Field>
            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Read Time">
              <input
                value={form.readTime}
                onChange={(event) => updateField("readTime", event.target.value)}
                placeholder="8 min read"
                className={inputCls}
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Author">
            <input
              value={form.author}
              onChange={(event) => updateField("author", event.target.value)}
              placeholder="Balaji Engineering Works"
              className={inputCls}
            />
          </Field>

          <Field label="Cover Image">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative min-h-[140px] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-white/10 transition-colors hover:border-[#AC3C3C]/50"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="" className="h-36 w-full object-cover opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      <Upload className="h-4 w-4" />
                      Change image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-36 flex-col items-center justify-center gap-2 text-zinc-500">
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-sm">Click to upload cover image</span>
                  <span className="text-xs">JPG, PNG, WebP</span>
                </div>
              )}

              {uploadProgress !== null && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                  <div
                    className="h-full bg-[#AC3C3C] transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
            <p className="mt-1 text-xs text-zinc-600">Or paste an image URL:</p>
            <input
              value={form.image}
              onChange={(event) => {
                updateField("image", event.target.value);
                if (!imageFile) setImagePreview(event.target.value);
              }}
              placeholder="https://..."
              className={`${inputCls} mt-1`}
            />
          </Field>

          <Field label="Excerpt" required>
            <textarea
              value={form.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
              required
              rows={3}
              placeholder="Brief summary shown on the blog listing page..."
              className={textareaCls}
            />
          </Field>

          <Field label="Content (HTML)" required>
            <textarea
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
              required
              rows={14}
              placeholder="<h2>Introduction</h2><p>Your article content...</p>"
              className={`${textareaCls} font-mono text-xs`}
            />
            <p className="mt-1 text-xs text-zinc-600">
              HTML is supported. Use headings, paragraphs, lists, and bold text as needed.
            </p>
          </Field>
        </form>

        <div className="flex shrink-0 justify-end gap-3 border-t border-white/8 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(event) => void handleSubmit(event as unknown as FormEvent)}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#AC3C3C] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c44040] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {uploadProgress !== null ? `Uploading ${uploadProgress}%` : "Saving..."}
              </>
            ) : isEdit ? (
              "Update Post"
            ) : (
              "Publish Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        {label}
        {required && <span className="ml-0.5 text-[#AC3C3C]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#AC3C3C]/60 focus:outline-none";
const textareaCls =
  "w-full resize-none rounded-xl border border-white/10 bg-[#0f0f0f] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#AC3C3C]/60 focus:outline-none";
