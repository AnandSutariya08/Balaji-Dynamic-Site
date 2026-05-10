import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/favicon.svg",
          "/favicon.jpg",
          "/opengraph.jpg",
          "/manifest.webmanifest",
          "/humans.txt",
          "/rss.xml",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
        ],
        disallow: ["/admin", "/admin/", "/api/", "/api"],
      },
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/favicon.svg",
          "/favicon.jpg",
          "/opengraph.jpg",
          "/manifest.webmanifest",
          "/humans.txt",
          "/rss.xml",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
        ],
        disallow: ["/admin", "/admin/", "/api/", "/api"],
      },
      {
        userAgent: "*",
        allow: [
          "/",
          "/favicon.svg",
          "/favicon.jpg",
          "/opengraph.jpg",
          "/manifest.webmanifest",
          "/humans.txt",
          "/rss.xml",
          "/llms.txt",
          "/llms-full.txt",
          "/.well-known/",
        ],
        disallow: ["/admin", "/admin/", "/api/", "/api"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: new URL(siteConfig.url).host,
  };
}
