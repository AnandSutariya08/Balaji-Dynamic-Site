import "server-only";

import type { GalleryItem } from "@/lib/firestore/types";

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "balaji-eng";
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCLwn48koGG36jAjS-Ps_YoU4FVVpBj5LA";

function isConfigured() {
  return Boolean(FIREBASE_PROJECT_ID && FIREBASE_API_KEY);
}

function baseUrl() {
  return `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;
}

function parseValue(value: Record<string, unknown> | null | undefined): unknown {
  if (!value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) {
    const arrayValue = value.arrayValue as { values?: Record<string, unknown>[] };
    return (arrayValue.values ?? []).map(parseValue);
  }
  if ("mapValue" in value) {
    const mapValue = value.mapValue as { fields?: Record<string, Record<string, unknown>> };
    return parseFields(mapValue.fields ?? {});
  }
  return null;
}

function parseFields(fields: Record<string, Record<string, unknown>>) {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    result[key] = parseValue(value);
  }
  return result;
}

function parseDoc(document: Record<string, unknown>) {
  const name = typeof document.name === "string" ? document.name : "";
  const fields =
    document.fields && typeof document.fields === "object"
      ? (document.fields as Record<string, Record<string, unknown>>)
      : {};
  return { id: name.split("/").pop() ?? "", ...parseFields(fields) };
}

function toItem(raw: Record<string, unknown>): GalleryItem {
  return {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    description: String(raw.description ?? ""),
    image: String(raw.image ?? ""),
    category: String(raw.category ?? "General"),
    order: typeof raw.order === "number" ? raw.order : 0,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : undefined,
  };
}

function toComparableTime(item: GalleryItem) {
  const raw = item.updatedAt ?? item.createdAt;
  const parsed = new Date(raw ?? 0);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function normalizeGallery(items: GalleryItem[]) {
  return [...items]
    .filter((item) => item.id && item.image)
    .sort((a, b) => {
      const aOrder = a.order ?? 0;
      const bOrder = b.order ?? 0;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return toComparableTime(b) - toComparableTime(a);
    });
}

export async function getPublicGalleryFromFirestore(): Promise<GalleryItem[]> {
  if (!isConfigured()) return [];

  try {
    const response = await fetch(
      `${baseUrl()}/gallery?key=${FIREBASE_API_KEY}&pageSize=100`,
      { next: { revalidate: 300 } },
    );
    if (!response.ok) return [];
    const data = (await response.json()) as { documents?: Record<string, unknown>[] };
    return normalizeGallery(
      (data.documents ?? []).map((d) => toItem(parseDoc(d) as Record<string, unknown>)),
    );
  } catch {
    return [];
  }
}
