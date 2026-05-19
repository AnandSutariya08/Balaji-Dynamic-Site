import type { MetadataRoute } from "next";
import { staticServices } from "@/lib/servicesData";
import { getProductsData } from "@/lib/productsData";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { sectorsData } from "@/lib/sectorsData";
import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
import { getPublicGalleryFromFirestore } from "@/lib/firestore/publicGalleryServer";
import type { BlogPost, GalleryItem, Product } from "@/lib/firestore/types";

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

  const serviceLastModified = services.length
    ? maxDate(
        services.map((service) => toDate(service.updatedAt ?? service.createdAt)),
      )
    : new Date();

  const blogLastModified = posts.length
    ? maxDate(posts.map((post) => toBlogDate(post)))
    : new Date();
  const productLastModified = products.length
    ? maxDate(
        products.map((product) => toProductDate(product)),
      )
    : new Date();
  const baseHomeLastModified = maxDate([
    serviceLastModified,
    productLastModified,
    blogLastModified,
  ]);
  const galleryLastModified = gallery.length
    ? maxDate(gallery.map((item) => toGalleryDate(item)))
    : baseHomeLastModified;
  const homeLastModified = maxDate([
    serviceLastModified,
    productLastModified,
    blogLastModified,
    galleryLastModified,
  ]);

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
      images: products.length
        ? uniqueImages(
            products
              .filter((product) => product.image)
              .slice(0, 10)
              .map((product) => absoluteUrl(product.image)),
          )
        : [absoluteUrl("/product-base-plates.png")],
    },
    {
      url: `${siteConfig.url}/sectors`,
      lastModified: homeLastModified,
      images: [absoluteUrl("/service-fabrication.png")],
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: blogLastModified,
      images: posts.length
        ? uniqueImages(
            posts
              .filter((post) => post.image)
              .slice(0, 10)
              .map((post) => absoluteUrl(post.image)),
          )
        : [absoluteUrl("/service-fabrication.png")],
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
      lastModified: galleryLastModified,
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
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: toBlogDate(post),
      images: post.image
        ? uniqueImages([absoluteUrl(post.image)])
        : [absoluteUrl("/service-fabrication.png")],
    }));

  const serviceEntries = [...services].map((service) => ({
    url: `${siteConfig.url}/services/${service.id}`,
    lastModified: toDate(service.updatedAt ?? service.createdAt),
    images: uniqueImages([absoluteUrl(service.image)]),
  }));
  const productEntries = [...products]
    .filter((product) => product.id)
    .map((product) => ({
    url: `${siteConfig.url}/products/${product.id}`,
    lastModified: toProductDate(product),
    images: product.image
      ? uniqueImages([absoluteUrl(product.image)])
      : [absoluteUrl("/product-base-plates.png")],
  }));

  const sectorEntries: MetadataRoute.Sitemap = sectorsData.map((sector) => ({
    url: `${siteConfig.url}/sectors/${sector.id}`,
    lastModified: homeLastModified,
    images: [absoluteUrl(sector.image)],
  }));

  return [...staticEntries, ...serviceEntries, ...productEntries, ...sectorEntries, ...blogEntries];
}
