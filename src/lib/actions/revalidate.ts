"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateBlogCache(slug?: string) {
  revalidateTag("blog-posts");
  revalidatePath("/blog", "layout");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/sitemap.xml");
  revalidatePath("/sitemap-news.xml");
  revalidatePath("/sitemap-index.xml");
  revalidatePath("/rss.xml");
  revalidatePath("/atom.xml");
}
