import ServicesPage from "@/components/site/ServicesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { staticServices } from "@/lib/servicesData";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createOfferCatalogJsonLd,
  createServiceJsonLd,
  createServicesItemListJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title =
  "Sheet Metal Bending, Cutting & Fabrication Services in Surat";
const description =
  "Explore CNC press brake bending, sheet metal shearing cutting, CNC laser cutting, CNC plasma cutting, plate rolling, profile cutting, base plates, and custom fabrication services from Balaji Engineering Works through SheetMetalBendingWorks.com.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "sheet metal bending works services",
    "sheet metal bending services Surat",
    "sheet metal cutting and bending services surat",
    "sheet metal shearing cutting surat",
    "cnc press brake bending surat",
    "press brake bending services surat",
    "laser cutting services in surat",
    "cnc laser cutting services surat",
    "cnc plasma cutting services surat",
    "CNC laser cutting services Gujarat",
    "steel cutting services Surat",
    "plate profile cutting company",
    "heavy steel fabrication services",
  ],
});

export default async function Page() {
  const services = staticServices;
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
