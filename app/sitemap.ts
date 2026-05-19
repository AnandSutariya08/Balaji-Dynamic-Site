import type { MetadataRoute } from "next";
import { staticProducts } from "@/lib/productsData";
import { staticServices } from "@/lib/servicesData";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
import { getPublicGalleryFromFirestore } from "@/lib/firestore/publicGalleryServer";

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
  const gallery = await getPublicGalleryFromFirestore();
  const products = staticProducts;
  const services = staticServices;

  const serviceLastModified = services.length
    ? maxDate(
        services.map((service) => toDate(service.updatedAt ?? service.createdAt)),
      )
    : new Date();

  const blogLastModified = posts.length
    ? maxDate(posts.map((post) => toDate(post.date)))
    : new Date();
  const productLastModified = products.length
    ? maxDate(
        products.map((product) => toDate(product.updatedAt ?? product.createdAt)),
      )
    : new Date();

  const homeLastModified = maxDate([serviceLastModified, productLastModified, blogLastModified]);

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
      url: `${siteConfig.url}/products`,
      lastModified: productLastModified,
      images: products.map((product) => absoluteUrl(product.image)),
    },
    {
      url: `${siteConfig.url}/sectors`,
      lastModified: homeLastModified,
      images: [absoluteUrl("/service-fabrication.png")],
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: blogLastModified,
      images: [absoluteUrl("/service-fabrication.png")],
    },
    {
      url: `${siteConfig.url}/llms.txt`,
      lastModified: homeLastModified,
    },
    {
      url: `${siteConfig.url}/llms-full.txt`,
      lastModified: homeLastModified,
    },
    {
      url: `${siteConfig.url}/rss.xml`,
      lastModified: blogLastModified,
    },
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: gallery.length
        ? maxDate(gallery.map((item) => toDate(item.updatedAt ?? item.createdAt)))
        : homeLastModified,
      images: gallery.length
        ? uniqueImages(gallery.slice(0, 10).map((item) => absoluteUrl(item.image)))
        : [absoluteUrl("/product-base-plates.png")],
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: homeLastModified,
      images: [absoluteUrl("/service-cnc.png")],
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: homeLastModified,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: homeLastModified,
      images: [absoluteUrl(siteConfig.ogImage)],
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
  const productEntries = [...products].map((product) => ({
    url: `${siteConfig.url}/products/${product.id}`,
    lastModified: toDate(product.updatedAt ?? product.createdAt),
    images: uniqueImages([absoluteUrl(product.image)]),
  }));

  return [...staticEntries, ...serviceEntries, ...productEntries, ...blogEntries];
}
