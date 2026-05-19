import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type {
  Product,
  ProductFaq,
  ProductInput,
  ProductSpec,
} from "@/lib/firestore/types";

const COL = "products";

export type ProductCreateInput = ProductInput & {
  id: string;
};

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function normalizeSpecs(value: unknown): ProductSpec[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const spec = item as Record<string, unknown>;
      const label = String(spec.label ?? "").trim();
      const rawValue = spec.value;
      const parsedValue =
        typeof rawValue === "string"
          ? rawValue.trim()
          : rawValue == null
            ? ""
            : String(rawValue);

      if (!label || !parsedValue) return null;
      return { label, value: parsedValue };
    })
    .filter((item): item is ProductSpec => Boolean(item));
}

function normalizeFaqs(value: unknown): ProductFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const faq = item as Record<string, unknown>;
      const question = String(faq.question ?? "").trim();
      const answer = String(faq.answer ?? "").trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is ProductFaq => Boolean(item));
}

function fromDoc(id: string, data: Record<string, unknown>): Product {
  return {
    id,
    title: String(data.title ?? ""),
    tagline: String(data.tagline ?? ""),
    description: String(data.description ?? ""),
    image: String(data.image ?? ""),
    features: normalizeStringArray(data.features),
    specs: normalizeSpecs(data.specs),
    applications: normalizeStringArray(data.applications),
    process: normalizeStringArray(data.process),
    faqs: normalizeFaqs(data.faqs),
    keywords: normalizeStringArray(data.keywords),
    metaTitle: String(data.metaTitle ?? ""),
    metaDescription: String(data.metaDescription ?? ""),
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : typeof data.createdAt === "string"
          ? data.createdAt
          : undefined,
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate().toISOString()
        : typeof data.updatedAt === "string"
          ? data.updatedAt
          : undefined,
  };
}

function toPayload(input: ProductInput) {
  return {
    title: input.title.trim(),
    tagline: input.tagline.trim(),
    description: input.description.trim(),
    image: input.image.trim(),
    features: input.features,
    specs: input.specs,
    applications: input.applications,
    process: input.process,
    faqs: input.faqs,
    keywords: input.keywords,
    metaTitle: input.metaTitle.trim(),
    metaDescription: input.metaDescription.trim(),
  };
}

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((docSnap) =>
    fromDoc(docSnap.id, docSnap.data() as Record<string, unknown>),
  );
}

export async function getProduct(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return fromDoc(snap.id, snap.data() as Record<string, unknown>);
}

export async function addProduct(input: ProductCreateInput): Promise<string> {
  const id = input.id.trim();
  if (!id) {
    throw new Error("Product slug is required.");
  }

  const ref = doc(db, COL, id);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    throw new Error("A product with this slug already exists.");
  }

  const { id: _, ...rest } = input;
  await setDoc(ref, {
    ...toPayload(rest),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return id;
}

export async function updateProduct(
  id: string,
  input: Partial<ProductInput>,
): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
