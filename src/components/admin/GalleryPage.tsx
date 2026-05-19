"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle, Camera, ExternalLink, ImageIcon,
  Loader2, Pencil, Plus, Tag, Trash2, X,
} from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { addGalleryItem, deleteGalleryItem, updateGalleryItem } from "@/lib/firestore/gallery";
import { uploadImage } from "@/lib/firestore/storage";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { GalleryItem } from "@/lib/firestore/types";

const CATEGORIES = ["CNC Cutting", "Fabrication", "Products", "Plant", "Projects", "General"];

const EMPTY_FORM = { title: "", description: "", category: "General", image: "" };

export function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (!configured) return;
    setLoading(true);
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          title: data.title ?? "",
          description: data.description ?? "",
          image: data.image ?? "",
          category: data.category ?? "General",
          order: data.order ?? 0,
          createdAt: data.createdAt?.toDate?.()?.toISOString() ?? data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() ?? data.updatedAt,
        } as GalleryItem;
      }));
      setLoading(false);
    }, (err) => {
      setError(err.message || "Failed to load gallery.");
      setLoading(false);
    });
    return () => unsub();
  }, [configured]);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setPreviewUrl("");
    setShowForm(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, category: item.category, image: item.image });
    setPreviewUrl(item.image);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setPreviewUrl("");
    setUploadProgress(null);
  };

  const handleFile = async (file: File) => {
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setUploadProgress(0);
    try {
      const url = await uploadImage(file, "gallery", (pct) => setUploadProgress(pct));
      setForm((f) => ({ ...f, image: url }));
      setUploadProgress(null);
    } catch {
      setError("Image upload failed. Please try again.");
      setUploadProgress(null);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.image) { setError("Please upload an image."); return; }
    setError("");
    setSaving(true);
    try {
      if (editing) {
        await updateGalleryItem(editing.id, form);
      } else {
        await addGalleryItem(form);
      }
      closeForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteGalleryItem(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div className="w-full p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Gallery</h1>
            <p className="mt-0.5 text-sm text-zinc-500">{items.length} photos in Firestore</p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-xl bg-[#AC3C3C] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c44040]"
          >
            <Plus className="h-4 w-4" />
            Add Photo
          </button>
        </div>

        {!configured && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Firebase not configured</p>
              <p className="mt-0.5 text-amber-400/80">Add <code className="rounded bg-black/30 px-1 font-mono">NEXT_PUBLIC_FIREBASE_*</code> env vars to manage the gallery.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
            <button type="button" onClick={() => setError("")} className="ml-auto"><X className="h-4 w-4" /></button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-zinc-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading from Firestore...
          </div>
        ) : items.length === 0 && configured ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Camera className="mb-3 h-10 w-10 text-zinc-700" />
            <p className="font-medium text-zinc-500">No photos yet</p>
            <p className="mb-4 mt-1 text-sm text-zinc-600">Add your first gallery photo.</p>
            <button
              type="button"
              onClick={openAdd}
              className="flex items-center gap-2 rounded-xl border border-[#AC3C3C]/30 bg-[#AC3C3C]/10 px-4 py-2 text-sm font-semibold text-[#e05555] transition-all hover:bg-[#AC3C3C]/20"
            >
              <Plus className="h-4 w-4" />
              Add First Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-white/6 bg-[#1a1a1a] transition-colors hover:border-white/12"
              >
                <div className="relative aspect-square w-full bg-zinc-900">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-80" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                      <ImageIcon className="h-8 w-8 text-zinc-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-xl border border-white/10 bg-black/60 p-1 backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
                  <a
                    href="/gallery"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-1.5 text-zinc-200 transition-all hover:bg-white/10"
                    aria-label="Open gallery"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="rounded-lg p-1.5 text-zinc-200 transition-all hover:bg-white/10"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(item.id, item.title)}
                    disabled={deleting === item.id}
                    className="rounded-lg p-1.5 text-zinc-200 transition-all hover:bg-red-400/15 hover:text-red-300 disabled:opacity-50"
                    aria-label="Delete"
                  >
                    {deleting === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="truncate text-xs font-bold text-white">{item.title}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#e05555]">
                    <Tag className="h-2.5 w-2.5" />{item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm} aria-label="Close" />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <h2 className="text-sm font-bold text-white">{editing ? "Edit Photo" : "Add Photo"}</h2>
              <button type="button" onClick={closeForm} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-5 space-y-4">
              {/* Image upload */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">Photo *</label>
                <div
                  className="relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-white/15 bg-white/3 transition-colors hover:border-[#AC3C3C]/50 hover:bg-[#AC3C3C]/5"
                  onClick={() => fileRef.current?.click()}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-zinc-500">
                      <Camera className="h-8 w-8" />
                      <span className="text-xs">Click to upload image</span>
                    </div>
                  )}
                  {uploadProgress !== null && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                      <Loader2 className="mb-2 h-6 w-6 animate-spin text-[#e05555]" />
                      <span className="text-xs font-bold text-white">{uploadProgress}%</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }}
                />
              </div>

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. CNC Laser Cutting — MS Plate"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#AC3C3C]/50 focus:ring-1 focus:ring-[#AC3C3C]/30"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of what is shown in this photo..."
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#AC3C3C]/50 focus:ring-1 focus:ring-[#AC3C3C]/30"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white outline-none focus:border-[#AC3C3C]/50 focus:ring-1 focus:ring-[#AC3C3C]/30"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-white/8 px-5 py-4">
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:bg-white/10 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving || uploadProgress !== null}
                className="flex items-center gap-2 rounded-xl bg-[#AC3C3C] px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#c44040] disabled:opacity-60"
              >
                {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {editing ? "Save Changes" : "Add Photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
