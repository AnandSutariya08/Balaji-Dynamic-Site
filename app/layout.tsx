import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createLocalBusinessJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

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
  authors: [{ name: siteConfig.legalName }],
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
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
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
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/svg+xml" },
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    shortcut: ["/logo.png"],
    apple: ["/logo.png"],
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": `${siteConfig.address.locality}, ${siteConfig.address.region}`,
    "contact:phone_number": siteConfig.phone,
    "contact:email": siteConfig.email,
  },
};

export const viewport: Viewport = {
  themeColor: "#ac3c3c",
  colorScheme: "light",
};

const globalSchemas = [
  createOrganizationJsonLd(),
  createLocalBusinessJsonLd(),
  createWebsiteJsonLd(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>
        {globalSchemas.map((schema, index) => (
          <JsonLd key={index} data={schema} />
        ))}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
