import type { Metadata } from "next";
import type { BlogPost, Service } from "@/lib/firestore/types";
import { contactFaqs, siteConfig } from "@/lib/site";

type SchemaObject = Record<string, unknown>;

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

function ensureLeadingSlash(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path === "/" ? "" : ensureLeadingSlash(path)}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = siteConfig.ogImage,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  section,
}: MetadataOptions): Metadata {
  const canonical = ensureLeadingSlash(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: (authors ?? [siteConfig.legalName]).map((name) => ({ name })),
    alternates: {
      canonical,
    },
    category: "Industrial Manufacturing",
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: absoluteUrl(canonical),
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(section ? { section } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

function getIsoDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toISOString();
}

function getAddressSchema() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  };
}

export function createOrganizationJsonLd(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl(siteConfig.ogImage),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: siteConfig.foundingDate,
    address: getAddressSchema(),
    knowsAbout: siteConfig.industries,
  };
}

export function createLocalBusinessJsonLd(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#local-business`,
    additionalType: "https://schema.org/IndustrialEstablishment",
    name: siteConfig.legalName,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl("/logo.svg"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: siteConfig.foundingDate,
    priceRange: siteConfig.priceRange,
    address: getAddressSchema(),
    hasMap: siteConfig.mapUrl,
    areaServed: siteConfig.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    ],
  };
}

export function createOfferCatalogJsonLd(services: Service[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${siteConfig.url}#offer-catalog`,
    name: "Sheet Metal Fabrication Services",
    url: absoluteUrl("/services"),
    itemListElement: services.map((service, index) => ({
      "@type": "OfferCatalog",
      "@id": `${absoluteUrl(`/services#${service.id}`)}#catalog-item`,
      position: index + 1,
      name: service.title,
      description: service.description,
      itemListElement: service.features.map((feature, featureIndex) => ({
        "@type": "ListItem",
        position: featureIndex + 1,
        name: feature,
      })),
    })),
  };
}

export function createSiteNavigationJsonLd(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Primary Site Navigation",
    itemListElement: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ].map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function createWebsiteJsonLd(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createWebPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: siteConfig.language,
    isPartOf: {
      "@id": `${siteConfig.url}#website`,
    },
    about: {
      "@id": `${siteConfig.url}#local-business`,
    },
  };
}

export function createServicesItemListJsonLd(services: Service[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sheet Metal Fabrication Services",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/services#${service.id}`),
      name: service.title,
      description: service.description,
    })),
  };
}

export function createServiceJsonLd(service: Service): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      "@id": `${siteConfig.url}#organization`,
    },
    areaServed: siteConfig.serviceAreas,
    image: absoluteUrl(service.image),
    url: absoluteUrl(`/services#${service.id}`),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };
}

export function createBlogJsonLd(posts: BlogPost[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description:
      "Fabrication guides, technical knowledge, and industrial manufacturing insights from Balaji Engineering Works.",
    url: absoluteUrl("/blog"),
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      image: absoluteUrl(post.image),
      datePublished: getIsoDate(post.createdAt ?? post.date),
      dateModified: getIsoDate(post.updatedAt ?? post.createdAt ?? post.date),
      author: {
        "@type": "Organization",
        name: post.author || siteConfig.name,
      },
    })),
  };
}

export function createBlogPostingJsonLd(post: BlogPost): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: getIsoDate(post.createdAt ?? post.date),
    dateModified: getIsoDate(post.updatedAt ?? post.createdAt ?? post.date),
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: post.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
    },
  };
}

export function createFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
