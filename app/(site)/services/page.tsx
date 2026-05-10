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

const title = "Sheet Metal Fabrication Services in Surat";
const description =
  "Explore CNC laser cutting, sheet bending, plate rolling, profile cutting, and custom steel fabrication services from Balaji Engineering Works.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "sheet metal bending services Surat",
    "CNC laser cutting services Gujarat",
    "plate profile cutting company",
    "heavy steel fabrication services",
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
