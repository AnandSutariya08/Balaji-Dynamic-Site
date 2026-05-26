import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/services",
          "/services/",
          "/products",
          "/products/",
          "/blog",
          "/blog/",
          "/gallery",
          "/about",
          "/contact",
          "/sectors",
          "/sectors/",
          "/sitemap.xml",
          "/sitemap-images.xml",
          "/rss.xml",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/_next/",
          "/404",
          "/500",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "Bytespider",
        disallow: ["/"],
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/sitemap-images.xml`,
    ],
    host: new URL(base).host,
  };
}
