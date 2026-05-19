"use client";

import type { FormEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { AlertCircle, ImageIcon, Loader2, Upload, X } from "lucide-react";

import { isFirebaseConfigured } from "@/lib/firebase";
import {
  addProduct,
  updateProduct,
  type ProductCreateInput,
} from "@/lib/firestore/products";
import { uploadImage } from "@/lib/firestore/storage";
import type { Product, ProductFaq, ProductInput, ProductSpec } from "@/lib/firestore/types";

type ProductFormState = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
};

const EMPTY_STATE: ProductFormState = {
  id: "",
  title: "",
  tagline: "",
  description: "",
  image: "",
  metaTitle: "",
  metaDescription: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function serializeSpecs(specs: ProductSpec[]) {
  return specs.map((spec) => `${spec.label}: ${spec.value}`).join("\n");
}

function serializeFaqs(faqs: ProductFaq[]) {
  return faqs.map((faq) => `${faq.question} | ${faq.answer}`).join("\n");
}

function parseSpecs(value: string): ProductSpec[] {
  return splitLines(value)
    .map((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) return null;

      const label = line.slice(0, separatorIndex).trim();
      const specValue = line.slice(separatorIndex + 1).trim();
      if (!label || !specValue) return null;

      return { label, value: specValue };
    })
    .filter((item): item is ProductSpec => Boolean(item));
}

function parseFaqs(value: string): ProductFaq[] {
  return splitLines(value)
    .map((line) => {
      const separatorIndex = line.indexOf("|");
      if (separatorIndex === -1) return null;

      const question = line.slice(0, separatorIndex).trim();
      const answer = line.slice(separatorIndex + 1).trim();
      if (!question || !answer) return null;

      return { question, answer };
    })
    .filter((item): item is ProductFaq => Boolean(item));
}

export function ProductForm({
  product,
  onClose,
  onSaved,
}: {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(product);
  const [form, setForm] = useState<ProductFormState>(
    product
      ? {
          id: product.id,
          title: product.title,
          tagline: product.tagline,
          description: product.description,
          image: product.image,
          metaTitle: product.metaTitle,
          metaDescription: product.metaDescription,
        }
      : EMPTY_STATE,
  );
  const [featuresText, setFeaturesText] = useState(
    product ? product.features.join("\n") : "",
  );
  const [specsText, setSpecsText] = useState(product ? serializeSpecs(product.specs) : "");
  const [applicationsText, setApplicationsText] = useState(
    product ? product.applications.join("\n") : "",
  );
  const [processText, setProcessText] = useState(product ? product.process.join("\n") : "");
  const [faqsText, setFaqsText] = useState(product ? serializeFaqs(product.faqs) : "");
  const [keywordsText, setKeywordsText] = useState(
    product ? product.keywords.join("\n") : "",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const updateField = (key: keyof ProductFormState, value: string) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !isEdit) {
        next.id = slugify(value);
        if (!next.metaTitle) {
          next.metaTitle = value;
        }
      }
      if (key === "description" && !next.metaDescription) {
        next.metaDescription = value;
      }
      return next;
    });
  };

  const buildPayload = (image: string): ProductCreateInput => {
    const normalizedId = slugify(form.id || form.title);
    const features = splitLines(featuresText);
    const specs = parseSpecs(specsText);
    const applications = splitLines(applicationsText);
    const process = splitLines(processText);
    const faqs = parseFaqs(faqsText);
    const keywords = splitLines(keywordsText);

    if (!normalizedId) {
      throw new Error("Product slug is required.");
    }
    if (!form.title.trim()) {
      throw new Error("Product title is required.");
    }
    if (!form.tagline.trim()) {
      throw new Error("Tagline is required.");
    }
    if (!form.description.trim()) {
      throw new Error("Description is required.");
    }
    if (!image.trim()) {
      throw new Error("Product image is required.");
    }
    if (features.length === 0) {
      throw new Error("Add at least one feature.");
    }
    if (specs.length === 0) {
      throw new Error("Add at least one specification using Label: Value format.");
    }
    if (applications.length === 0) {
      throw new Error("Add at least one application.");
    }
    if (process.length === 0) {
      throw new Error("Add at least one process step.");
    }
    if (faqs.length === 0) {
      throw new Error("Add at least one FAQ using Question | Answer format.");
    }

    return {
      id: normalizedId,
      title: form.title.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      image: image.trim(),
      features,
      specs,
      applications,
      process,
      faqs,
      keywords,
      metaTitle: form.metaTitle.trim() || form.title.trim(),
      metaDescription: form.metaDescription.trim() || form.description.trim(),
    };
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
        imageUrl = await uploadImage(imageFile, "product-images", setUploadProgress);
        setUploadProgress(null);
      }

      const payload = buildPayload(imageUrl);

      if (isEdit && product) {
        const { id: _, ...rest } = payload;
        await updateProduct(product.id, rest as ProductInput);
      } else {
        await addProduct(payload);
      }

      onSaved();
      onClose();
    } catch (error_) {
      const message =
        error_ instanceof Error ? error_.message : "Failed to save product.";
      setError(message);
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-full max-w-3xl flex-col overflow-hidden border-l border-white/8 bg-[#141414]">
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4">
          <h2 className="text-base font-bold text-white">
            {isEdit ? "Edit Product" : "New Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 transition-colors hover:text-white"
          >
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

          <div className="grid grid-cols-2 gap-4">
            <Field label="Product Title" required>
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
                placeholder="MS Base Plates"
                className={inputCls}
              />
            </Field>
            <Field label="Product Slug" required>
              <input
                value={form.id}
                onChange={(event) => updateField("id", event.target.value)}
                required
                readOnly={isEdit}
                placeholder="ms-base-plates"
                className={`${inputCls} ${isEdit ? "cursor-not-allowed opacity-70" : ""}`}
              />
            </Field>
          </div>

          <Field label="Tagline" required>
            <input
              value={form.tagline}
              onChange={(event) => updateField("tagline", event.target.value)}
              required
              placeholder="MS base plates and mounting plates for structures..."
              className={inputCls}
            />
          </Field>

          <Field label="Description" required>
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              required
              rows={4}
              placeholder="Describe the product and buyer-facing value..."
              className={textareaCls}
            />
          </Field>

          <Field label="Product Image" required>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative min-h-[180px] cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-white/10 transition-colors hover:border-[#AC3C3C]/50"
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt=""
                    className="h-44 w-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      <Upload className="h-4 w-4" />
                      Change image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-44 flex-col items-center justify-center gap-2 text-zinc-500">
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-sm">Click to upload product image</span>
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
              placeholder="https://... or /product-base-plates.png"
              className={`${inputCls} mt-1`}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Meta Title" required>
              <input
                value={form.metaTitle}
                onChange={(event) => updateField("metaTitle", event.target.value)}
                required
                placeholder="MS Base Plates Manufacturer in Surat"
                className={inputCls}
              />
            </Field>
            <Field label="Meta Description" required>
              <textarea
                value={form.metaDescription}
                onChange={(event) => updateField("metaDescription", event.target.value)}
                required
                rows={3}
                placeholder="SEO description for product page..."
                className={textareaCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Features" required>
              <textarea
                value={featuresText}
                onChange={(event) => setFeaturesText(event.target.value)}
                rows={6}
                placeholder={"One feature per line\nCustom hole patterns\nProject quantity support"}
                className={textareaCls}
              />
            </Field>
            <Field label="Applications" required>
              <textarea
                value={applicationsText}
                onChange={(event) => setApplicationsText(event.target.value)}
                rows={6}
                placeholder={"One application per line\nStructural steel column base plates"}
                className={textareaCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Specifications" required>
              <textarea
                value={specsText}
                onChange={(event) => setSpecsText(event.target.value)}
                rows={6}
                placeholder={"One per line using Label: Value\nMaterial: MS plate\nUse: Columns, supports"}
                className={textareaCls}
              />
            </Field>
            <Field label="Process Steps" required>
              <textarea
                value={processText}
                onChange={(event) => setProcessText(event.target.value)}
                rows={6}
                placeholder={"One step per line\nReview plate size and thickness"}
                className={textareaCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="FAQs" required>
              <textarea
                value={faqsText}
                onChange={(event) => setFaqsText(event.target.value)}
                rows={6}
                placeholder={"One FAQ per line using Question | Answer\nDo you make custom plates? | Yes, we work from drawings."}
                className={textareaCls}
              />
            </Field>
            <Field label="Keywords">
              <textarea
                value={keywordsText}
                onChange={(event) => setKeywordsText(event.target.value)}
                rows={6}
                placeholder={"One keyword per line\nbase plate manufacturer surat"}
                className={textareaCls}
              />
            </Field>
          </div>
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
              "Update Product"
            ) : (
              "Create Product"
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
