import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { staticServices } from "@/lib/servicesData";
import { getProductsData } from "@/lib/productsData";
import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
import { getPublicGalleryFromFirestore } from "@/lib/firestore/publicGalleryServer";
import { sectorsData } from "@/lib/sectorsData";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function imageTag(url: string, caption: string, title: string) {
  if (!url) return "";
  const absUrl = absoluteUrl(url);
  return `
    <image:image>
      <image:loc>${esc(absUrl)}</image:loc>
      <image:caption>${esc(caption)}</image:caption>
      <image:title>${esc(title)}</image:title>
    </image:image>`;
}

function urlTag(loc: string, images: string) {
  if (!images.trim()) return "";
  return `
  <url>
    <loc>${esc(loc)}</loc>${images}
  </url>`;
}

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const [posts, gallery, products] = await Promise.all([
    getPublicBlogsFromFirestore({ fallbackToStatic: true }),
    getPublicGalleryFromFirestore(),
    getProductsData(),
  ]);
  const services = staticServices;

  const entries: string[] = [];

  entries.push(
    urlTag(
      siteConfig.url,
      [
        imageTag(siteConfig.ogImage, `${siteConfig.name} - Sheet Metal Fabrication, CNC Cutting and Bending Services in Surat`, siteConfig.name),
        imageTag("/logo.png", `${siteConfig.name} Logo`, `${siteConfig.name} Logo`),
        ...services.slice(0, 6).map((s) =>
          imageTag(s.image, `${s.title} - ${siteConfig.name}`, s.title)
        ),
      ].join(""),
    ),
  );

  entries.push(
    urlTag(
      `${siteConfig.url}/services`,
      services
        .map((s) => imageTag(s.image, `${s.title} Service - ${siteConfig.name} Surat`, s.title))
        .join(""),
    ),
  );

  for (const service of services) {
    entries.push(
      urlTag(
        `${siteConfig.url}/services/${service.id}`,
        imageTag(service.image, `${service.title} in Surat | ${siteConfig.name}`, service.title),
      ),
    );
  }

  if (products.length > 0) {
    entries.push(
      urlTag(
        `${siteConfig.url}/products`,
        products
          .filter((p) => p.image)
          .slice(0, 15)
          .map((p) => imageTag(p.image, `${p.title} - ${siteConfig.name}`, p.title))
          .join(""),
      ),
    );

    for (const product of products.filter((p) => p.image)) {
      entries.push(
        urlTag(
          `${siteConfig.url}/products/${product.id}`,
          imageTag(
            product.image,
            `${product.title} | Manufactured by ${siteConfig.name}, Surat`,
            product.title,
          ),
        ),
      );
    }
  }

  if (gallery.length > 0) {
    const galleryImages = gallery
      .filter((i) => i.image)
      .map((i) =>
        imageTag(
          i.image,
          `${i.title} - ${i.category} | ${siteConfig.name} Gallery`,
          i.title || i.category,
        )
      )
      .join("");
    entries.push(urlTag(`${siteConfig.url}/gallery`, galleryImages));
  }

  if (posts.length > 0) {
    entries.push(
      urlTag(
        `${siteConfig.url}/blog`,
        posts
          .filter((p) => p.image)
          .slice(0, 15)
          .map((p) => imageTag(p.image, `${p.title} | ${siteConfig.name} Blog`, p.title))
          .join(""),
      ),
    );

    for (const post of posts.filter((p) => p.image)) {
      entries.push(
        urlTag(
          `${siteConfig.url}/blog/${post.slug}`,
          imageTag(post.image, `${post.title} | ${siteConfig.name}`, post.title),
        ),
      );
    }
  }

  for (const sector of sectorsData) {
    entries.push(
      urlTag(
        `${siteConfig.url}/sectors/${sector.id}`,
        imageTag(sector.image, `${sector.name} - ${siteConfig.name}`, sector.name),
      ),
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.filter(Boolean).join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
