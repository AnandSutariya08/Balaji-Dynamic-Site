import type { Metadata } from "next";
import type { BlogPost, GalleryItem, Product, Service } from "@/lib/firestore/types";
import { contactFaqs, siteConfig } from "@/lib/site";
import type { ServiceFaq } from "@/lib/serviceSeo";
import { getAllServiceFaqs } from "@/lib/serviceSeo";

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
  const canonicalPath = ensureLeadingSlash(path);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(image);
  const metadataTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: { absolute: metadataTitle },
    description,
    keywords: Array.from(new Set([...siteConfig.keywords, ...keywords])),
    authors: (authors ?? [siteConfig.legalName]).map((name) => ({ name })),
    alternates: {
      canonical: canonicalUrl,
    },
    category: "Industrial Manufacturing",
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonicalUrl,
      title: metadataTitle,
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
      title: metadataTitle,
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
    legalName: siteConfig.legalName,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}#logo`,
      url: absoluteUrl("/logo.png"),
      contentUrl: absoluteUrl("/logo.png"),
      width: 192,
      height: 192,
      caption: siteConfig.name,
    },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImage),
      contentUrl: absoluteUrl(siteConfig.ogImage),
      width: 1200,
      height: 630,
    },
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: siteConfig.foundingDate,
    taxID: siteConfig.gstNumber,
    address: getAddressSchema(),
    sameAs: [siteConfig.indiaMartProfile],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    ],
    knowsAbout: siteConfig.industries,
    areaServed: siteConfig.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
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
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImage),
      contentUrl: absoluteUrl(siteConfig.ogImage),
      width: 1200,
      height: 630,
    },
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}#logo`,
      url: absoluteUrl("/logo.png"),
      contentUrl: absoluteUrl("/logo.png"),
      width: 192,
      height: 192,
      caption: siteConfig.name,
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: siteConfig.foundingDate,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer, UPI, NEFT, RTGS",
    taxID: siteConfig.gstNumber,
    address: getAddressSchema(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.2447,
      longitude: 72.9504,
    },
    hasMap: siteConfig.mapUrl,
    sameAs: [siteConfig.indiaMartProfile],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: siteConfig.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
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
    knowsAbout: siteConfig.industries,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 50,
    },
    potentialAction: [
      {
        "@type": "ReserveAction",
        name: "Request a Quote",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/contact`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
    ],
  };
}

export function createOfferCatalogJsonLd(services: Service[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${siteConfig.url}#offer-catalog`,
    name: "Sheet Metal Fabrication, Cutting and Bending Services",
    url: absoluteUrl("/services"),
    itemListElement: services.map((service, index) => ({
      "@type": "OfferCatalog",
      "@id": `${absoluteUrl(`/services/${service.id}`)}#catalog-item`,
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
  const navItems = [
    {
      name: "Home",
      path: "/",
      description: "Overview of Balaji Engineering Works — sheet metal fabrication, CNC laser cutting, and industrial products in Surat",
    },
    {
      name: "About",
      path: "/about",
      description: "Company history, manufacturing capabilities, equipment, and industrial profile of Balaji Engineering Works",
    },
    {
      name: "Services",
      path: "/services",
      description: "CNC laser cutting, CNC plasma cutting, CNC press brake bending, plate rolling, and sheet metal fabrication services in Surat",
    },
    {
      name: "Products",
      path: "/products",
      description: "Industrial steel products — MS base plates, foundation bolts, C/Z purlins, perforated sheets, steel pallets manufactured in Surat",
    },
    {
      name: "Sectors",
      path: "/sectors",
      description: "Industries served by Balaji Engineering Works — construction, chemical, pharmaceutical, automotive, power, infrastructure",
    },
    {
      name: "Gallery",
      path: "/gallery",
      description: "Photo gallery of fabrication work, CNC cutting, bending, welding, and finished products from Balaji Engineering Works",
    },
    {
      name: "Blog",
      path: "/blog",
      description: "Technical guides and industrial manufacturing articles on sheet metal fabrication, laser cutting, and steel bending",
    },
    {
      name: "Contact",
      path: "/contact",
      description: "Request a quote or contact Balaji Engineering Works in Surat — phone, email, and address",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}#site-navigation`,
    name: "Primary Site Navigation",
    itemListElement: navItems.map((item, index) => ({
      "@type": "SiteNavigationElement",
      "@id": `${absoluteUrl(item.path)}#nav-item`,
      position: index + 1,
      name: item.name,
      description: item.description,
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

export function createGraphJsonLd(schemas: SchemaObject[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map(({ "@context": _ctx, ...rest }) => rest),
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]): SchemaObject {
  const lastItem = items[items.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": lastItem ? `${absoluteUrl(lastItem.path)}#breadcrumb` : `${siteConfig.url}#breadcrumb`,
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
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImage),
      width: 1200,
      height: 630,
    },
  };
}

export function createServicesItemListJsonLd(services: Service[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Balaji Engineering Works Services",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/services/${service.id}`),
      name: service.title,
      description: service.description,
    })),
  };
}

export function createServiceJsonLd(service: Service): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.id}`)}#service`,
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      "@id": `${siteConfig.url}#organization`,
    },
    areaServed: siteConfig.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(service.image),
    },
    url: absoluteUrl(`/services/${service.id}`),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      areaServed: siteConfig.serviceAreas.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      seller: {
        "@id": `${siteConfig.url}#organization`,
      },
    },
  };
}

export function createProductsItemListJsonLd(products: Product[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Balaji Engineering Works Products",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/${product.id}`),
      name: product.title,
      description: product.description,
    })),
  };
}

export function createProductJsonLd(product: Product): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(`/products/${product.id}`)}#product`,
    name: product.title,
    description: product.description,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(product.image),
      contentUrl: absoluteUrl(product.image),
      width: 1200,
      height: 630,
      caption: product.title,
    },
    url: absoluteUrl(`/products/${product.id}`),
    category: "Industrial Fabricated Product",
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@id": `${siteConfig.url}#organization`,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.id}`),
      priceCurrency: "INR",
      price: "0",
      priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": `${siteConfig.url}#organization`,
      },
      areaServed: siteConfig.serviceAreas.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      description: `Contact ${siteConfig.name} for pricing on ${product.title}. Price depends on quantity, material, and specifications.`,
    },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    keywords: product.keywords.join(", "),
  };
}

export function createHowToJsonLd({
  name,
  description,
  steps,
  image,
}: {
  name: string;
  description: string;
  steps: string[];
  image?: string;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(image ? { image: absoluteUrl(image) } : {}),
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text,
      text,
    })),
    tool: [
      { "@type": "HowToTool", name: "CNC Press Brake" },
      { "@type": "HowToTool", name: "Fiber Laser Cutter" },
      { "@type": "HowToTool", name: "CNC Plasma Cutter" },
      { "@type": "HowToTool", name: "Plate Rolling Machine" },
    ],
    supply: [
      { "@type": "HowToSupply", name: "Mild Steel Plate" },
      { "@type": "HowToSupply", name: "Stainless Steel Sheet" },
      { "@type": "HowToSupply", name: "Structural Steel" },
    ],
  };
}

export function createGalleryItemListJsonLd(items: GalleryItem[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} Gallery`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl("/gallery"),
      name: item.title,
      description: item.description || item.category,
      image: absoluteUrl(item.image),
    })),
  };
}

export function createImageGalleryJsonLd(items: GalleryItem[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${absoluteUrl("/gallery")}#gallery`,
    name: `${siteConfig.name} Work Gallery`,
    description:
      "Manufacturing, fabrication, CNC cutting, bending, welding, and finished project photos from Balaji Engineering Works in Surat.",
    url: absoluteUrl("/gallery"),
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
    associatedMedia: items.slice(0, 24).map((item) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(item.image),
      url: absoluteUrl(item.image),
      name: item.title,
      description: item.description || item.category,
      ...(getIsoDate(item.updatedAt ?? item.createdAt)
        ? { uploadDate: getIsoDate(item.updatedAt ?? item.createdAt) }
        : {}),
    })),
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
  const authorName = post.author || siteConfig.name;
  const authorSlug = authorName.toLowerCase().replace(/\s+/g, "-");

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    headline: post.title,
    description: post.excerpt,
    image: [
      { "@type": "ImageObject", url: absoluteUrl(post.image), width: 1200, height: 630 },
      { "@type": "ImageObject", url: absoluteUrl(post.image), width: 800, height: 600 },
      { "@type": "ImageObject", url: absoluteUrl(post.image), width: 800, height: 800 },
    ],
    thumbnailUrl: absoluteUrl(post.image),
    datePublished: getIsoDate(post.createdAt ?? post.date),
    dateModified: getIsoDate(post.updatedAt ?? post.createdAt ?? post.date),
    articleSection: post.category,
    keywords: post.category,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      name: `${siteConfig.name} — Engineering Blog`,
      publisher: { "@id": `${siteConfig.url}#organization` },
    },
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}#author-${authorSlug}`,
      name: authorName,
      url: siteConfig.url,
      worksFor: { "@id": `${siteConfig.url}#organization` },
      knowsAbout: [
        "Sheet Metal Fabrication",
        "CNC Laser Cutting",
        "CNC Plasma Cutting",
        "Industrial Steel Manufacturing",
        "Precision Fabrication",
      ],
    },
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
    copyrightHolder: { "@id": `${siteConfig.url}#organization` },
    copyrightYear: new Date(post.createdAt ?? post.date ?? new Date()).getFullYear(),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article p:first-of-type"],
    },
  };
}

export function createFaqJsonLd() {
  return createGenericFaqJsonLd(contactFaqs);
}

const homepageGeneralFaqs: ServiceFaq[] = [
  {
    question: "Where is Balaji Engineering Works located?",
    answer:
      "Balaji Engineering Works is located in Kamrej, Surat, Gujarat — serving industrial buyers across Surat, Bharuch, Vadodara, Ankleshwar, Vapi, and across Gujarat and India.",
  },
  {
    question: "What fabrication and manufacturing services do you offer?",
    answer:
      "We offer CNC laser cutting, CNC plasma cutting, CNC plate bending, sheet metal bending, plate rolling, pipe rolling, deep drawing, perforated sheet manufacturing, surface finishing, and precision welding — all under one roof in Surat.",
  },
  {
    question: "Do you manufacture industrial products as well as provide job work?",
    answer:
      "Yes. Balaji Engineering Works manufactures industrial products including MS base plates, MS foundation bolts, MS anchor bolts, C-purlins, Z-purlins, MS chequered plates, and perforated sheets, alongside contract job work for fabrication requirements.",
  },
  {
    question: "How do I get a quotation from Balaji Engineering Works?",
    answer:
      "You can share your drawings (DXF, DWG, PDF) or dimensions via our contact page or WhatsApp. Our team reviews the job and sends a quotation based on material, thickness, and quantity. We support both one-off samples and repeat production orders.",
  },
  {
    question: "Which industries does Balaji Engineering Works serve?",
    answer:
      "We serve chemical, pharmaceutical, heavy engineering, construction, food processing, power, oil & gas, textile, and general manufacturing industries across Surat, Gujarat, and India.",
  },
];

export function createHomepageFaqJsonLd(): SchemaObject {
  const serviceFaqs = getAllServiceFaqs();
  const combined = [...homepageGeneralFaqs, ...serviceFaqs].slice(0, 10);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}#faq`,
    mainEntity: combined.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createGenericFaqJsonLd(
  faqs: ReadonlyArray<ServiceFaq | (typeof contactFaqs)[number]>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
