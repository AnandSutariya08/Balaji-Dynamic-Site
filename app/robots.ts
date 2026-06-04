import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      // Google crawlers
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
        userAgent: "Googlebot-Video",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-News",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // Bing / Microsoft
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "msnbot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // Yahoo
      {
        userAgent: "Slurp",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // DuckDuckGo
      {
        userAgent: "DuckDuckBot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // Apple
      {
        userAgent: "Applebot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // Google AI / Gemini
      {
        userAgent: "Google-Extended",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // AI crawlers — allowed
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
        userAgent: "anthropic-ai",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "YouBot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bytedance-Bot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Amazonbot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Diffbot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // Social media crawlers
      {
        userAgent: "facebookexternalhit",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Twitterbot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "LinkedInBot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "WhatsApp",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Telegrambot",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // Blocked scrapers
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "Bytespider",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: ["/"],
      },
      // Default
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: [
      `${base}/sitemap-index.xml`,
      `${base}/sitemap.xml`,
      `${base}/sitemap-images.xml`,
      `${base}/sitemap-news.xml`,
    ],
  };
}
