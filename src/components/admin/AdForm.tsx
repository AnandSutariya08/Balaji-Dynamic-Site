"use client";

import { useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { addAd, updateAd, type Ad, type AdInput, type AdType } from "@/lib/firestore/ads";
import { uploadImage } from "@/lib/firestore/storage";

const EMPTY: AdInput = {
  title: "",
  description: "",
  image: "",
  link: "",
  buttonText: "Learn More",
  footerText: "",
  type: "full",
  active: true,
  duration: 8,
};

const AD_TYPES: { value: AdType; label: string; desc: string }[] = [
  { value: "full", label: "Full", desc: "Image + title + text + button" },
  { value: "image", label: "Image Only", desc: "Just the image (clickable)" },
  { value: "text", label: "Text Only", desc: "Title + text + button (no image)" },
];

export function AdForm({
  ad,
  onClose,
  onSaved,
}: {
  ad?: Ad | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(ad);
  const [form, setForm] = useState<AdInput>(
    ad
      ? {
          title: ad.title,
          description: ad.description,
          image: ad.image,
          link: ad.link,
          buttonText: ad.buttonText,
          footerText: ad.footerText,
          type: ad.type,
          active: ad.active,
          duration: ad.duration,
        }
      : EMPTY,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(ad?.image ?? "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function set(field: keyof AdInput, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.type !== "text" && !form.image && !imageFile) {
      setError("Please upload an image for this ad type.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let imageUrl = form.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "ad-images", setUploadProgress);
        setUploadProgress(null);
      }
      const payload: AdInput = { ...form, image: imageUrl };
      if (isEdit && ad) {
        await updateAd(ad.id, payload);
      } else {
        await addAd(payload);
      }
      onSaved();
    } catch {
      setError("Failed to save ad. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const needsImage = form.type !== "text";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#141414] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#141414] px-6 py-4">
          <div className="text-sm font-bold text-white">
            {isEdit ? "Edit Ad" : "Create New Ad"}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/8 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
          {/* Ad Type */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-400">
              Ad Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {AD_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => set("type", t.value)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    form.type === t.value
                      ? "border-[#AC3C3C]/50 bg-[#AC3C3C]/10 text-white"
                      : "border-white/8 bg-white/3 text-zinc-400 hover:border-white/15"
                  }`}
                >
                  <div className="text-xs font-bold">{t.label}</div>
                  <div className="mt-0.5 text-[10px] text-zinc-500">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          {needsImage && (
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-400">
                Ad Image {form.type === "image" ? "(Required)" : "(Optional)"}
              </label>
              {imagePreview ? (
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-800" style={{ aspectRatio: "16/9" }}>
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(""); setImageFile(null); set("image", ""); }}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/3 py-8 transition-colors hover:border-white/25 hover:bg-white/5"
                >
                  <ImageIcon className="h-6 w-6 text-zinc-500" />
                  <span className="text-xs text-zinc-400">Click to upload image</span>
                  <span className="text-[10px] text-zinc-600">Recommended: 16:9 ratio</span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {uploadProgress !== null && (
                <div className="mt-2 overflow-hidden rounded-full bg-white/10" style={{ height: 3 }}>
                  <div
                    className="h-full bg-[#AC3C3C] transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Text fields — hidden for image-only */}
          {form.type !== "image" && (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Ad headline..."
                  className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#AC3C3C]/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={3}
                  placeholder="Body text..."
                  className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#AC3C3C]/50 resize-none"
                />
              </div>
            </>
          )}

          {/* Link + Button Text */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">
                Link URL
              </label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => set("link", e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#AC3C3C]/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">
                Button Text
              </label>
              <input
                type="text"
                value={form.buttonText}
                onChange={(e) => set("buttonText", e.target.value)}
                placeholder="Learn More"
                className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#AC3C3C]/50"
              />
            </div>
          </div>

          {/* Footer text */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">
              Footer / Disclaimer Text <span className="text-zinc-600">(optional)</span>
            </label>
            <input
              type="text"
              value={form.footerText}
              onChange={(e) => set("footerText", e.target.value)}
              placeholder="Small print, terms..."
              className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#AC3C3C]/50"
            />
          </div>

          {/* Duration + Active */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">
                Show Duration: {form.duration}s
              </label>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={form.duration}
                onChange={(e) => set("duration", Number(e.target.value))}
                className="w-full accent-[#AC3C3C]"
              />
              <div className="flex justify-between text-[10px] text-zinc-600">
                <span>5s</span><span>30s</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-400">
                Status
              </label>
              <button
                type="button"
                onClick={() => set("active", !form.active)}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  form.active
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-white/10 bg-white/5 text-zinc-400"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${form.active ? "bg-green-400" : "bg-zinc-600"}`} />
                {form.active ? "Active" : "Inactive"}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#AC3C3C] py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#c44040] disabled:opacity-60"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving
                ? uploadProgress !== null
                  ? `Uploading ${uploadProgress}%`
                  : "Saving…"
                : isEdit
                  ? "Update Ad"
                  : "Create Ad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
