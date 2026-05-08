import { fetchCollection, isFirebaseConfigured } from "./firebase";
import { logger } from "./logger";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs: ServiceSpec[];
  createdAt?: string;
  updatedAt?: string;
}

interface AppCache {
  blogs: BlogPost[] | null;
  services: Service[] | null;
  lastFetched: number;
}

const cache: AppCache = {
  blogs: null,
  services: null,
  lastFetched: 0,
};

export async function warmCache(): Promise<void> {
  if (!isFirebaseConfigured()) return;
  try {
    const [blogs, services] = await Promise.all([
      fetchCollection("blog-posts"),
      fetchCollection("services"),
    ]);
    cache.blogs = blogs as BlogPost[];
    cache.services = services as Service[];
    cache.lastFetched = Date.now();
    logger.info(
      { blogs: blogs.length, services: services.length },
      "Cache warmed"
    );
  } catch (err) {
    logger.error({ err }, "Failed to warm cache");
  }
}

export async function getBlogs(): Promise<BlogPost[] | null> {
  if (!isFirebaseConfigured()) return null;
  if (!cache.blogs) await warmCache();
  return cache.blogs;
}

export async function getServices(): Promise<Service[] | null> {
  if (!isFirebaseConfigured()) return null;
  if (!cache.services) await warmCache();
  return cache.services;
}

export async function refreshCache(): Promise<void> {
  cache.blogs = null;
  cache.services = null;
  await warmCache();
}

export function getCacheStatus() {
  return {
    blogs: cache.blogs?.length ?? 0,
    services: cache.services?.length ?? 0,
    lastFetched: cache.lastFetched
      ? new Date(cache.lastFetched).toISOString()
      : null,
  };
}
