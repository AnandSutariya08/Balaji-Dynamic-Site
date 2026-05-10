import ServicesPage from "@/components/site/ServicesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublicServices } from "@/lib/public-data";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createOfferCatalogJsonLd,
  createServiceJsonLd,
  createServicesItemListJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Sheet Metal Forming, Laser Cutting & Plate Bending Services";
const description =
  "Explore sheet metal bending, shearing, CNC laser cutting, CNC plasma cutting, plate rolling, profile cutting, punching, and fabrication services from Balaji Engineering Works in Surat.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "sheet metal bending services Surat",
    "CNC laser cutting services Gujarat",
    "CNC plasma cutting services Surat",
    "plate profile cutting company",
    "sheet metal fabrication services India",
  ],
});

export default async function Page() {
  const services = await getPublicServices();
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/services",
      type: "CollectionPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    createOfferCatalogJsonLd(services),
    createServicesItemListJsonLd(services),
    ...services.map((service) => createServiceJsonLd(service)),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <ServicesPage initialServices={services} />
    </>
  );
}
