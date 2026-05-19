import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";
import { sectorsData } from "@/lib/sectorsData";
import SectorDetailPage from "@/components/site/SectorDetailPage";
import { absoluteUrl } from "@/lib/seo";
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
    keywords: sector.keywords,
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sector.name,
    description: sector.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "India",
    serviceType: "Sheet Metal Fabrication",
    url: absoluteUrl(`/sectors/${sector.id}`),
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
      { name: "Sectors", path: "/sectors" },
      { name: sector.name, path: `/sectors/${sector.id}` },
    ]),
    serviceSchema,
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
