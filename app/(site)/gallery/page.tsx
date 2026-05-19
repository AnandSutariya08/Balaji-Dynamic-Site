import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import GalleryPage from "@/components/site/GalleryPage";
import { buildMetadata, createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo";
import { getPublicGalleryFromFirestore } from "@/lib/firestore/publicGalleryServer";

export const metadata: Metadata = buildMetadata({
  title: "Gallery — Sheet Metal Fabrication Work in Surat",
  description:
    "Browse photos of CNC laser cutting, plate bending, sheet metal fabrication, and finished industrial products from Balaji Engineering Works in Surat, Gujarat.",
  path: "/gallery",
  keywords: [
    "fabrication gallery surat",
    "sheet metal fabrication photos",
    "cnc cutting work surat",
    "steel fabrication images gujarat",
    "balaji engineering works gallery",
    "industrial fabrication surat photos",
  ],
  image: "/product-base-plates.png",
});

export default async function Page() {
  const items = await getPublicGalleryFromFirestore();

  const schemas = [
    createWebPageJsonLd({
      title: "Gallery — Sheet Metal Fabrication Work in Surat",
      description:
        "Browse photos of CNC laser cutting, plate bending, sheet metal fabrication, and finished industrial products from Balaji Engineering Works in Surat.",
      path: "/gallery",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]),
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
