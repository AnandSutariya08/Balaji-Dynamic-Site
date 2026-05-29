import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
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
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/sitemap-images.xml`,
    ],
  };
}
