import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createGenericFaqJsonLd,
  createLocalBusinessJsonLd,
  createOrganizationJsonLd,
  createWebPageJsonLd,
  absoluteUrl,
} from "@/lib/seo";
import { sectorsData } from "@/lib/sectorsData";
import SectorDetailPage from "@/components/site/SectorDetailPage";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return sectorsData.map((sector) => ({ id: sector.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = sectorsData.find((s) => s.id === id);

  if (!sector) {
    return buildMetadata({
      title: "Sector Not Found",
      description: "The requested sector page could not be found.",
      path: `/sectors/${id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: sector.metaTitle,
    description: sector.metaDescription,
    path: `/sectors/${sector.id}`,
    image: sector.image,
    keywords: [
      ...sector.keywords,
      sector.name,
      "Balaji Engineering Works",
      "sheet metal fabrication Surat",
      "steel fabrication Gujarat India",
    ],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = sectorsData.find((s) => s.id === id);

  if (!sector) notFound();

  const pageUrl = absoluteUrl(`/sectors/${sector.id}`);
  const imageUrl = absoluteUrl(sector.image);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `${sector.name} Sheet Metal Fabrication`,
    description: sector.metaDescription,
    image: imageUrl,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}#local-business`,
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "State", name: "Maharashtra" },
    ],
    serviceType: "Sheet Metal Fabrication",
    url: pageUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${sector.name} Fabrication Services`,
      itemListElement: sector.services.map((svc, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: svc,
        },
      })),
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${sector.name} — Typical Applications`,
    description: `Components fabricated by Balaji Engineering Works for the ${sector.name} sector`,
    numberOfItems: sector.applications.length,
    itemListElement: sector.applications.map((app, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: app,
    })),
  };

  const schemas = [
    createWebPageJsonLd({
      title: sector.metaTitle,
      description: sector.metaDescription,
      path: `/sectors/${sector.id}`,
      type: "WebPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Sectors We Serve", path: "/sectors" },
      { name: sector.name, path: `/sectors/${sector.id}` },
    ]),
    serviceSchema,
    itemListSchema,
    createOrganizationJsonLd(),
    createLocalBusinessJsonLd(),
    createGenericFaqJsonLd(sector.faqs),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <SectorDetailPage sector={sector} />
    </>
  );
}
