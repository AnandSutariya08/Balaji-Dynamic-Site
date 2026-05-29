import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createLocalBusinessJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
  createGraphJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--app-font-sans",
  display: "swap",
  preload: true,
});

const rajdhani = Rajdhani({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--app-font-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Industrial Manufacturing",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    languages: {
      "en-IN": siteConfig.url,
      "x-default": siteConfig.url,
    },
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION ?? "",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Sheet Metal Fabrication, CNC Cutting & Bending Services, Surat`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: "@balajiengworks",
    images: [
      {
        url: `${siteConfig.url}/opengraph.jpg`,
        alt: `${siteConfig.name} — Sheet Metal Fabrication, CNC Cutting & Bending Services, Surat`,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": `${siteConfig.address.locality}, ${siteConfig.address.region}, India`,
    "geo.position": "21.2447;72.9504",
    "ICBM": "21.2447, 72.9504",
    "contact:phone_number": siteConfig.phone,
    "contact:email": siteConfig.email,
    "msapplication-TileColor": "#ac3c3c",
    "msapplication-TileImage": `${siteConfig.url}/logo.png`,
    "msapplication-config": "none",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": siteConfig.shortName,
    "rating": "general",
    "language": "en-IN",
    "coverage": "India",
    "distribution": "global",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ac3c3c" },
    { media: "(prefers-color-scheme: dark)", color: "#ac3c3c" },
  ],
  colorScheme: "light",
};

const globalSchema = createGraphJsonLd([
  createOrganizationJsonLd(),
  createLocalBusinessJsonLd(),
  createWebsiteJsonLd(),
]);

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${rajdhani.variable}`}>
      <head>
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.sarvam.ai" />
        <link rel="home" href={siteConfig.url} />
      </head>
      <body>
        <JsonLd data={globalSchema} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
