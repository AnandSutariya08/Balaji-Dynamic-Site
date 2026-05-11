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
  "Explore sheet metal bending, CNC laser cutting, plate rolling, steel cutting, profile cutting, base plates, and custom fabrication services from Balaji Engineering Works through SheetMetalBendingWorks.com.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "sheet metal bending works services",
    "sheet metal bending services Surat",
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
