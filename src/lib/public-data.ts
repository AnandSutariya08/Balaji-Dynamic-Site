import "server-only";

import { revalidateTag } from "next/cache";
import { blogPosts } from "@/lib/blogData";
import { staticServices } from "@/lib/servicesData";
import type { BlogPost as StaticBlogPost } from "@/lib/blogData";
import type { BlogPost, Service } from "@/lib/firestore/types";

const BLOGS_TAG = "public-blogs";
const SERVICES_TAG = "public-services";

function isPublicFirebaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  );
}

function projectId() {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
}

function apiKey() {
  return process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
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

function mapStaticPost(post: StaticBlogPost): BlogPost {
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

async function fetchCollection<T>(collectionId: string, tag: string): Promise<T[] | null> {
  if (!isPublicFirebaseConfigured()) {
    return null;
  }

  const response = await fetch(
    `${baseUrl()}/${collectionId}?key=${apiKey()}&pageSize=100`,
    {
      next: {
        revalidate: 300,
        tags: [tag],
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    documents?: Record<string, unknown>[];
  };

  return (data.documents ?? []).map((document) => parseDoc(document) as T);
}

export async function getPublicBlogs(): Promise<BlogPost[]> {
  const posts = await fetchCollection<BlogPost>("blog-posts", BLOGS_TAG);
  return posts && posts.length > 0 ? posts : blogPosts.map(mapStaticPost);
}

export async function getPublicBlogBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublicBlogs();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPublicServices(): Promise<Service[]> {
  const services = await fetchCollection<Service>("services", SERVICES_TAG);
  return services && services.length > 0 ? services : staticServices;
}

export function refreshPublicCache() {
  revalidateTag(BLOGS_TAG);
  revalidateTag(SERVICES_TAG);
}
