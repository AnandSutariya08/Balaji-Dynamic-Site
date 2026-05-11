import type { MetadataRoute } from "next";
import { staticServices } from "@/lib/servicesData";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";

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
  const posts = await getPublicBlogsFromFirestore();
  const services = staticServices;

  const serviceLastModified = services.length
    ? maxDate(
        services.map((service) => toDate(service.updatedAt ?? service.createdAt)),
      )
    : new Date();

  const blogLastModified = posts.length
    ? maxDate(posts.map((post) => toDate(post.date)))
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
        toDate(b.date).getTime() -
        toDate(a.date).getTime(),
    )
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: toDate(post.date),
      images: post.image ? uniqueImages([absoluteUrl(post.image)]) : undefined,
    }));

  const serviceEntries = [...services].map((service) => ({
    url: `${siteConfig.url}/services/${service.id}`,
    lastModified: toDate(service.updatedAt ?? service.createdAt),
    images: uniqueImages([absoluteUrl(service.image)]),
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
