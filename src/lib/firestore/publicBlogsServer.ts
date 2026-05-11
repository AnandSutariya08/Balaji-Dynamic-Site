import "server-only";

import type { BlogPost } from "@/lib/firestore/types";
import { blogPosts as staticPosts } from "@/lib/blogData";

function projectId() {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
}

function apiKey() {
  return process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
}

function isConfigured() {
  return Boolean(projectId() && apiKey());
}

function baseUrl() {
  return `https://firestore.googleapis.com/v1/projects/${projectId()}/databases/(default)/documents`;
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

  return {
    id: name.split("/").pop() ?? "",
    ...parseFields(fields),
  };
}

function toPost(raw: Record<string, unknown>): BlogPost {
  const category = (raw.category ?? "Technical") as BlogPost["category"];

  return {
    id: String(raw.id ?? ""),
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    excerpt: String(raw.excerpt ?? ""),
    content: String(raw.content ?? ""),
    image: String(raw.image ?? ""),
    category,
    readTime: String(raw.readTime ?? ""),
    date: String(raw.date ?? ""),
    author: String(raw.author ?? "Balaji Engineering Works"),
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : undefined,
  };
}

function mapStatic(post: (typeof staticPosts)[number]): BlogPost {
  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    category: post.category as BlogPost["category"],
    readTime: post.readTime,
    date: post.date,
    author: "Balaji Engineering Works",
  };
}

export async function getPublicBlogsFromFirestore(): Promise<BlogPost[]> {
  if (!isConfigured()) return staticPosts.map(mapStatic);

  const response = await fetch(
    `${baseUrl()}/blog-posts?key=${apiKey()}&pageSize=250`,
    { next: { revalidate: 300 } },
  );

  if (!response.ok) return staticPosts.map(mapStatic);

  const data = (await response.json()) as { documents?: Record<string, unknown>[] };
  const posts = (data.documents ?? []).map((doc) =>
    toPost(parseDoc(doc) as Record<string, unknown>),
  );
  return posts.length > 0 ? posts : staticPosts.map(mapStatic);
}

export async function getPublicBlogBySlugFromFirestore(slug: string): Promise<BlogPost | null> {
  const posts = await getPublicBlogsFromFirestore();
  return posts.find((post) => post.slug === slug) ?? null;
}
