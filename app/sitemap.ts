import type { MetadataRoute } from "next";
import { staticServices } from "@/lib/servicesData";
import { getProductsData } from "@/lib/productsData";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { sectorsData } from "@/lib/sectorsData";
import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
import { getPublicGalleryFromFirestore } from "@/lib/firestore/publicGalleryServer";
import type { BlogPost, GalleryItem, Product } from "@/lib/firestore/types";

type SitemapEntry = MetadataRoute.Sitemap[number];

function toDate(value?: string) {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function maxDate(dates: Date[]) {
  return new Date(Math.max(...dates.map((d) => d.getTime())));
}

function uniqueImages(images: Array<string | undefined>) {
  return Array.from(new Set(images.filter(Boolean))) as string[];
}

function toBlogDate(post: BlogPost) {
  return toDate(post.updatedAt ?? post.createdAt ?? post.date);
}

function toGalleryDate(item: GalleryItem) {
  return toDate(item.updatedAt ?? item.createdAt);
}

function toProductDate(product: Product) {
  return toDate(product.updatedAt ?? product.createdAt);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, gallery, products] = await Promise.all([
    getPublicBlogsFromFirestore({ fallbackToStatic: false }),
    getPublicGalleryFromFirestore(),
    getProductsData(),
  ]);
  const services = staticServices;

  const now = new Date();

  const serviceLastModified = services.length
    ? maxDate(services.map((s) => toDate(s.updatedAt ?? s.createdAt)))
    : now;
  const blogLastModified = posts.length
    ? maxDate(posts.map(toBlogDate))
    : now;
  const productLastModified = products.length
    ? maxDate(products.map(toProductDate))
    : now;
  const galleryLastModified = gallery.length
    ? maxDate(gallery.map(toGalleryDate))
    : now;
  const homeLastModified = maxDate([
    serviceLastModified,
    productLastModified,
    blogLastModified,
    galleryLastModified,
  ]);

  const staticEntries: SitemapEntry[] = [
    {
      url: siteConfig.url,
      lastModified: homeLastModified,
      changeFrequency: "daily",
      priority: 1.0,
      images: uniqueImages([
        absoluteUrl(siteConfig.ogImage),
        absoluteUrl("/logo.png"),
        ...services.slice(0, 6).map((s) => absoluteUrl(s.image)),
      ]),
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: serviceLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: uniqueImages([
        absoluteUrl("/service-fabrication.png"),
        absoluteUrl(siteConfig.ogImage),
      ]),
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: serviceLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: uniqueImages(services.map((s) => absoluteUrl(s.image))),
    },
    {
      url: `${siteConfig.url}/products`,
      lastModified: productLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: uniqueImages(
        products.length
          ? products.filter((p) => p.image).slice(0, 12).map((p) => absoluteUrl(p.image))
          : [absoluteUrl("/product-base-plates.png")],
      ),
    },
    {
      url: `${siteConfig.url}/sectors`,
      lastModified: serviceLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: uniqueImages(sectorsData.map((s) => absoluteUrl(s.image))),
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: blogLastModified,
      changeFrequency: "daily",
      priority: 0.85,
      images: uniqueImages(
        posts.length
          ? posts.filter((p) => p.image).slice(0, 12).map((p) => absoluteUrl(p.image))
          : [absoluteUrl("/service-fabrication.png")],
      ),
    },
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: galleryLastModified,
      changeFrequency: "weekly",
      priority: 0.75,
      images: uniqueImages(
        gallery.length
          ? gallery.slice(0, 20).map((i) => absoluteUrl(i.image))
          : [absoluteUrl("/product-base-plates.png")],
      ),
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: serviceLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      images: uniqueImages([
        absoluteUrl("/service-cnc.png"),
        absoluteUrl(siteConfig.ogImage),
      ]),
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: homeLastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: homeLastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/rss.xml`,
      lastModified: blogLastModified,
      changeFrequency: "daily",
      priority: 0.4,
    },
  ];

  const serviceEntries: SitemapEntry[] = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.id}`,
    lastModified: toDate(service.updatedAt ?? service.createdAt),
    changeFrequency: "monthly",
    priority: 0.9,
    images: uniqueImages([absoluteUrl(service.image)]),
  }));

  const productEntries: SitemapEntry[] = products
    .filter((p) => p.id)
    .map((product) => ({
      url: `${siteConfig.url}/products/${product.id}`,
      lastModified: toProductDate(product),
      changeFrequency: "weekly",
      priority: 0.88,
      images: uniqueImages(
        product.image
          ? [absoluteUrl(product.image)]
          : [absoluteUrl("/product-base-plates.png")],
      ),
    }));

  const sectorEntries: SitemapEntry[] = sectorsData.map((sector) => ({
    url: `${siteConfig.url}/sectors/${sector.id}`,
    lastModified: serviceLastModified,
    changeFrequency: "monthly",
    priority: 0.75,
    images: uniqueImages([absoluteUrl(sector.image)]),
  }));

  const blogEntries: SitemapEntry[] = posts
    .filter((p) => p.slug)
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: toBlogDate(post),
      changeFrequency: "weekly",
      priority: 0.8,
      images: uniqueImages(
        post.image
          ? [absoluteUrl(post.image)]
          : [absoluteUrl("/service-fabrication.png")],
      ),
    }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...productEntries,
    ...sectorEntries,
    ...blogEntries,
  ];
}
