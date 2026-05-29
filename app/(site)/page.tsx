import HomePage from "@/components/site/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductsData } from "@/lib/productsData";
import { staticServices } from "@/lib/servicesData";
import {
  buildMetadata,
  createHomepageFaqJsonLd,
  createOfferCatalogJsonLd,
  createProductsItemListJsonLd,
  createSiteNavigationJsonLd,
  createServicesItemListJsonLd,
  createWebPageJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo";

const title =
  "Sheet Metal Bending Works Surat | CNC Laser Cutting, Fabrication & Industrial Products | Balaji Engineering Works";
const description =
  "Balaji Engineering Works — sheet metal bending works in Surat providing CNC laser cutting, CNC plasma cutting, CNC plate bending, press brake bending, plate rolling, heavy fabrication, and industrial products including base plates, foundation bolts, purlins, and perforated sheets.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "Balaji Engineering Works Surat",
    "laser cutting services in surat",
    "cnc plasma cutting services surat",
    "cnc plate bending service surat",
    "sheet metal fabrication Surat",
    "sheet metal shearing cutting Surat",
    "cnc press brake bending surat",
    "steel fabrication company Surat",
    "industrial products manufacturer Surat",
    "foundation bolts manufacturer Surat",
    "plate rolling Gujarat",
    "manufacturer and service provider Surat",
  ],
});

export default async function Page() {
  const services = staticServices;
  const products = await getProductsData();

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
    createProductsItemListJsonLd(products),
    createHomepageFaqJsonLd(),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <HomePage initialProducts={products} />
    </>
  );
}
