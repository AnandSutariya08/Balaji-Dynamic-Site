import { useState, useRef } from "react";
import { X, Upload, Loader2, Plus, Trash2, ImageIcon, AlertCircle } from "lucide-react";
import { addService, updateService } from "@/lib/firestore/services";
import { uploadImage } from "@/lib/firestore/storage";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Service, ServiceInput, ServiceSpec } from "@/lib/firestore/types";

const EMPTY: ServiceInput = {
  title: "",
  tagline: "",
  description: "",
  image: "",
  features: [""],
  specs: [{ label: "", value: "" }],
};

interface Props {
  service?: Service | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ServiceForm({ service, onClose, onSaved }: Props) {
  const isEdit = !!service;
  const [form, setForm] = useState<ServiceInput>(
    service
      ? { title: service.title, tagline: service.tagline, description: service.description, image: service.image, features: [...service.features], specs: service.specs.map(s => ({ ...s })) }
      : EMPTY
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(service?.image || "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof ServiceInput>(key: K, value: ServiceInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setFeature = (i: number, val: string) => {
    const arr = [...form.features];
    arr[i] = val;
    set("features", arr);
  };
  const addFeature = () => set("features", [...form.features, ""]);
  const removeFeature = (i: number) => set("features", form.features.filter((_, idx) => idx !== i));

  const setSpec = (i: number, key: "label" | "value", val: string) => {
    const arr = form.specs.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    set("specs", arr);
  };
  const addSpec = () => set("specs", [...form.specs, { label: "", value: "" }]);
  const removeSpec = (i: number) => set("specs", form.specs.filter((_, idx) => idx !== i));

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
        imageUrl = await uploadImage(imageFile, "service-images", setUploadProgress);
        setUploadProgress(null);
      }
      const data: ServiceInput = {
        ...form,
        image: imageUrl,
        features: form.features.filter(Boolean),
        specs: form.specs.filter((s) => s.label && s.value),
      };
      if (isEdit && service) {
        await updateService(service.id, data);
      } else {
        await addService(data);
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
          <h2 className="text-white font-bold text-base">{isEdit ? "Edit Service" : "New Service"}</h2>
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
            <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="CNC Machining" className={inputCls} />
          </Field>

          <Field label="Tagline" required>
            <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} required placeholder="Precision from ±0.01mm" className={inputCls} />
          </Field>

          <Field label="Description" required>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} required rows={4} placeholder="Full description of the service..." className={textareaCls} />
          </Field>

          <Field label="Cover Image">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative border-2 border-dashed border-white/10 hover:border-[#AC3C3C]/50 rounded-xl overflow-hidden cursor-pointer transition-colors"
              style={{ minHeight: 130 }}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="" className="w-full h-32 object-cover opacity-70" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium flex items-center gap-2"><Upload className="w-4 h-4" />Change</span>
                  </div>
                </>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center gap-2 text-zinc-500">
                  <ImageIcon className="w-7 h-7" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
              {uploadProgress !== null && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                  <div className="h-full bg-[#AC3C3C] transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <p className="text-xs text-zinc-600 mt-1">Or paste a URL:</p>
            <input value={form.image} onChange={(e) => { set("image", e.target.value); if (!imageFile) setImagePreview(e.target.value); }} placeholder="https://..." className={inputCls + " mt-1"} />
          </Field>

          <Field label="Features">
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input value={f} onChange={(e) => setFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className={inputCls + " flex-1"} />
                  <button type="button" onClick={() => removeFeature(i)} className="text-zinc-600 hover:text-red-400 transition-colors p-2.5 rounded-xl hover:bg-red-400/5">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addFeature} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mt-1">
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>
          </Field>

          <Field label="Specs (label / value pairs)">
            <div className="space-y-2">
              {form.specs.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input value={s.label} onChange={(e) => setSpec(i, "label", e.target.value)} placeholder="Tolerance" className={inputCls + " flex-1"} />
                  <input value={s.value} onChange={(e) => setSpec(i, "value", e.target.value)} placeholder="±0.01mm" className={inputCls + " flex-1"} />
                  <button type="button" onClick={() => removeSpec(i)} className="text-zinc-600 hover:text-red-400 transition-colors p-2.5 rounded-xl hover:bg-red-400/5">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addSpec} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mt-1">
                <Plus className="w-3.5 h-3.5" /> Add Spec
              </button>
            </div>
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
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />{uploadProgress !== null ? `Uploading ${uploadProgress}%` : "Saving..."}</> : isEdit ? "Update Service" : "Add Service"}
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
