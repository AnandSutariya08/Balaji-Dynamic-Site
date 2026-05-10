"use client";

import type { FormEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { AlertCircle, ImageIcon, Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { addService, updateService } from "@/lib/firestore/services";
import { uploadImage } from "@/lib/firestore/storage";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Service, ServiceInput } from "@/lib/firestore/types";

const EMPTY: ServiceInput = {
  title: "",
  tagline: "",
  description: "",
  image: "",
  features: [""],
  specs: [{ label: "", value: "" }],
};

export function ServiceForm({
  service,
  onClose,
  onSaved,
}: {
  service?: Service | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(service);
  const [form, setForm] = useState<ServiceInput>(
    service
      ? {
          title: service.title,
          tagline: service.tagline,
          description: service.description,
          image: service.image,
          features: [...service.features],
          specs: service.specs.map((spec) => ({ ...spec })),
        }
      : EMPTY,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(service?.image || "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof ServiceInput>(key: K, value: ServiceInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
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
        imageUrl = await uploadImage(imageFile, "service-images", setUploadProgress);
        setUploadProgress(null);
      }

      const payload: ServiceInput = {
        ...form,
        image: imageUrl,
        features: form.features.filter(Boolean),
        specs: form.specs.filter((spec) => spec.label && spec.value),
      };

      if (isEdit && service) {
        await updateService(service.id, payload);
      } else {
        await addService(payload);
      }

      onSaved();
      onClose();
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : "Failed to save service.";
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
            {isEdit ? "Edit Service" : "New Service"}
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
              placeholder="CNC Machining"
              className={inputCls}
            />
          </Field>

          <Field label="Tagline" required>
            <input
              value={form.tagline}
              onChange={(event) => updateField("tagline", event.target.value)}
              required
              placeholder="Precision from +/-0.01mm"
              className={inputCls}
            />
          </Field>

          <Field label="Description" required>
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              required
              rows={4}
              placeholder="Full description of the service..."
              className={textareaCls}
            />
          </Field>

          <Field label="Cover Image">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative min-h-[130px] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-white/10 transition-colors hover:border-[#AC3C3C]/50"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="" className="h-32 w-full object-cover opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      <Upload className="h-4 w-4" />
                      Change image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-32 flex-col items-center justify-center gap-2 text-zinc-500">
                  <ImageIcon className="h-7 w-7" />
                  <span className="text-sm">Click to upload image</span>
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

          <Field label="Features">
            <div className="space-y-2">
              {form.features.map((feature, index) => (
                <div key={`${feature}-${index}`} className="flex gap-2">
                  <input
                    value={feature}
                    onChange={(event) => {
                      const next = [...form.features];
                      next[index] = event.target.value;
                      updateField("features", next);
                    }}
                    placeholder={`Feature ${index + 1}`}
                    className={`${inputCls} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "features",
                        form.features.filter((_, currentIndex) => currentIndex !== index),
                      )
                    }
                    className="rounded-xl p-2.5 text-zinc-600 transition-colors hover:bg-red-400/5 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateField("features", [...form.features, ""])}
                className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Feature
              </button>
            </div>
          </Field>

          <Field label="Specs (label / value pairs)">
            <div className="space-y-2">
              {form.specs.map((spec, index) => (
                <div key={`${spec.label}-${index}`} className="flex gap-2">
                  <input
                    value={spec.label}
                    onChange={(event) => {
                      const next = form.specs.map((item, currentIndex) =>
                        currentIndex === index
                          ? { ...item, label: event.target.value }
                          : item,
                      );
                      updateField("specs", next);
                    }}
                    placeholder="Tolerance"
                    className={`${inputCls} flex-1`}
                  />
                  <input
                    value={spec.value}
                    onChange={(event) => {
                      const next = form.specs.map((item, currentIndex) =>
                        currentIndex === index
                          ? { ...item, value: event.target.value }
                          : item,
                      );
                      updateField("specs", next);
                    }}
                    placeholder="+/-0.01mm"
                    className={`${inputCls} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "specs",
                        form.specs.filter((_, currentIndex) => currentIndex !== index),
                      )
                    }
                    className="rounded-xl p-2.5 text-zinc-600 transition-colors hover:bg-red-400/5 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateField("specs", [...form.specs, { label: "", value: "" }])}
                className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Spec
              </button>
            </div>
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
              "Update Service"
            ) : (
              "Add Service"
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
