import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f5f1",
    theme_color: "#ac3c3c",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
    ],
  };
}
