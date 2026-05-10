import type { MetadataRoute } from "next";
import { getPublicBlogs, getPublicServices } from "@/lib/public-data";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

function toDate(value?: string) {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function maxDate(dates: Date[]) {
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

function uniqueImages(images: Array<string | undefined>) {
  return Array.from(new Set(images.filter(Boolean))) as string[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, services] = await Promise.all([
    getPublicBlogs(),
    getPublicServices(),
  ]);

  const serviceLastModified = services.length
    ? maxDate(
        services.map((service) => toDate(service.updatedAt ?? service.createdAt)),
      )
    : new Date();

  const blogLastModified = posts.length
    ? maxDate(
        posts.map((post) => toDate(post.updatedAt ?? post.createdAt ?? post.date)),
      )
    : new Date();

  const homeLastModified = maxDate([serviceLastModified, blogLastModified]);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: homeLastModified,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: homeLastModified,
      images: [absoluteUrl("/service-fabrication.png")],
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: serviceLastModified,
      images: services.map((service) => absoluteUrl(service.image)),
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: blogLastModified,
      images: [absoluteUrl("/service-fabrication.png")],
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: homeLastModified,
      images: [absoluteUrl("/service-cnc.png")],
    },
  ];

  const blogEntries = [...posts]
    .sort(
      (a, b) =>
        toDate(b.updatedAt ?? b.createdAt ?? b.date).getTime() -
        toDate(a.updatedAt ?? a.createdAt ?? a.date).getTime(),
    )
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: toDate(post.updatedAt ?? post.createdAt ?? post.date),
      images: post.image ? uniqueImages([absoluteUrl(post.image)]) : undefined,
    }));

  const serviceEntries = [...services].map((service) => ({
    url: `${siteConfig.url}/services/${service.id}`,
    lastModified: toDate(service.updatedAt ?? service.createdAt),
    images: uniqueImages([absoluteUrl(service.image)]),
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
