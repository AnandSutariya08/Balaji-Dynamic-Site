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
    orientation: "portrait-primary",
    background_color: "#f7f5f1",
    theme_color: "#ac3c3c",
    lang: "en-IN",
    dir: "ltr",
    categories: ["business", "industrial", "manufacturing"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/favicon.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Services",
        short_name: "Services",
        description: "View all sheet metal fabrication services",
        url: "/services",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
      {
        name: "Products",
        short_name: "Products",
        description: "Browse industrial steel products",
        url: "/products",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
      {
        name: "Get a Quote",
        short_name: "Quote",
        description: "Request a fabrication quote",
        url: "/contact",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
      {
        name: "Gallery",
        short_name: "Gallery",
        description: "View our fabrication work",
        url: "/gallery",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
    ],
  };
}
