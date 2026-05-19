import type {
  Product,
  ProductFaq,
  ProductSpec,
} from "@/lib/firestore/types";

const FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "balaji-eng";
const FIREBASE_API_KEY =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  "AIzaSyCLwn48koGG36jAjS-Ps_YoU4FVVpBj5LA";

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
    const mapValue = value.mapValue as {
      fields?: Record<string, Record<string, unknown>>;
    };
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

  return {
    id: name.split("/").pop() ?? "",
    ...parseFields(fields),
  };
}

function normalizeStrings(value: unknown): string[] {
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
      const specValue = String(spec.value ?? "").trim();
      if (!label || !specValue) return null;
      return { label, value: specValue };
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

function toProduct(raw: Record<string, unknown>): Product {
  return {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    tagline: String(raw.tagline ?? ""),
    description: String(raw.description ?? ""),
    image: String(raw.image ?? ""),
    features: normalizeStrings(raw.features),
    specs: normalizeSpecs(raw.specs),
    applications: normalizeStrings(raw.applications),
    process: normalizeStrings(raw.process),
    faqs: normalizeFaqs(raw.faqs),
    keywords: normalizeStrings(raw.keywords),
    metaTitle: String(raw.metaTitle ?? ""),
    metaDescription: String(raw.metaDescription ?? ""),
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : undefined,
  };
}

function sortProducts(products: Product[]) {
  return [...products].sort((a, b) => {
    const aTime = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime();
    const bTime = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime();

    if (aTime !== bTime) return bTime - aTime;
    return a.title.localeCompare(b.title);
  });
}

export async function getPublicProductsFromFirestore(): Promise<Product[]> {
  if (!isConfigured()) return [];

  try {
    const response = await fetch(
      `${baseUrl()}/products?key=${FIREBASE_API_KEY}&pageSize=250`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) return [];

    const data = (await response.json()) as {
      documents?: Record<string, unknown>[];
    };
    const products = (data.documents ?? []).map((doc) =>
      toProduct(parseDoc(doc) as Record<string, unknown>),
    ).filter((product) => product.id && product.title);

    return sortProducts(products);
  } catch {
    return [];
  }
}

export async function getPublicProductBySlugFromFirestore(
  slug: string,
): Promise<Product | null> {
  const products = await getPublicProductsFromFirestore();
  return products.find((product) => product.id === slug) ?? null;
}
