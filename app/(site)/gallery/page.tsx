import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import GalleryPage from "@/components/site/GalleryPage";
import { getPublicGalleryFromFirestore } from "@/lib/firestore/publicGalleryServer";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createGalleryItemListJsonLd,
  createImageGalleryJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

function toIsoDate(value?: string) {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export async function generateMetadata(): Promise<Metadata> {
  const items = await getPublicGalleryFromFirestore();
  const leadImage = items[0]?.image || "/product-base-plates.png";
  const latestModified =
    items
      .map((item) => item.updatedAt ?? item.createdAt)
      .find(Boolean) ?? undefined;
  const count = items.length;

  return buildMetadata({
    title:
      count > 0
        ? `Gallery - ${count} Fabrication and CNC Work Photos in Surat`
        : "Gallery - Sheet Metal Fabrication Work in Surat",
    description:
      count > 0
        ? `Browse ${count} photos of CNC laser cutting, plate bending, welding, sheet metal fabrication, plant work, and finished industrial products from Balaji Engineering Works in Surat, Gujarat.`
        : "Browse photos of CNC laser cutting, plate bending, sheet metal fabrication, and finished industrial products from Balaji Engineering Works in Surat, Gujarat.",
    path: "/gallery",
    keywords: [
      "fabrication gallery surat",
      "sheet metal fabrication photos surat",
      "cnc laser cutting photos surat",
      "plate bending work gallery gujarat",
      "industrial fabrication images surat",
      "manufacturing plant gallery surat",
      "balaji engineering works gallery",
      "steel fabrication images gujarat",
    ],
    image: leadImage,
    modifiedTime: toIsoDate(latestModified),
    section: "Gallery",
  });
}

export default async function Page() {
  const items = await getPublicGalleryFromFirestore();
  const count = items.length;

  const schemas = [
    createWebPageJsonLd({
      title:
        count > 0
          ? `Gallery - ${count} Fabrication and CNC Work Photos in Surat`
          : "Gallery - Sheet Metal Fabrication Work in Surat",
      description:
        count > 0
          ? `Browse ${count} photos of CNC laser cutting, plate bending, sheet metal fabrication, plant activity, and finished industrial products from Balaji Engineering Works in Surat.`
          : "Browse photos of CNC laser cutting, plate bending, sheet metal fabrication, and finished industrial products from Balaji Engineering Works in Surat.",
      path: "/gallery",
      type: "CollectionPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]),
    createGalleryItemListJsonLd(items),
    createImageGalleryJsonLd(items),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <GalleryPage items={items} />
    </>
  );
}
