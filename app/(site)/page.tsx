import HomePage from "@/components/site/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { staticServices } from "@/lib/servicesData";
import {
  buildMetadata,
  createOfferCatalogJsonLd,
  createSiteNavigationJsonLd,
  createServicesItemListJsonLd,
  createWebPageJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo";

const title =
  "Sheet Metal Bending Works in Surat | CNC Laser Cutting & Fabrication";
const description =
  "SheetMetalBendingWorks.com connects industrial buyers with Balaji Engineering Works for CNC press brake bending, sheet metal shearing cutting, CNC laser cutting, plate rolling, profile cutting, and heavy fabrication in Surat.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "sheetmetalbendingworks.com",
    "Balaji Engineering Works Surat",
    "sheet metal fabrication Surat",
    "sheet metal bending works",
    "sheet metal shearing cutting Surat",
    "cnc press brake bending surat",
    "laser cutting services Surat",
    "steel fabrication company Surat",
    "plate rolling Gujarat",
    "manufacturer and service provider Surat",
  ],
});

export default async function Page() {
  const services = staticServices;

  const schemas = [
    createWebsiteJsonLd(),
    createWebPageJsonLd({
      title,
      description,
      path: "/",
    }),
    createSiteNavigationJsonLd(),
    createOfferCatalogJsonLd(services),
    createServicesItemListJsonLd(services),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <HomePage />
    </>
  );
}
