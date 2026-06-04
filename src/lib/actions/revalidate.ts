"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateBlogCache() {
  revalidateTag("blog-posts");
  revalidatePath("/blog", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/sitemap-news.xml");
  revalidatePath("/sitemap-index.xml");
  revalidatePath("/rss.xml");
  revalidatePath("/atom.xml");
}
