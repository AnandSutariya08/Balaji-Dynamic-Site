import HomePage from "@/components/site/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublicBlogs, getPublicServices } from "@/lib/public-data";
import {
  buildMetadata,
  createOfferCatalogJsonLd,
  createSiteNavigationJsonLd,
  createServicesItemListJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title =
  "Manufacturer of Sheet Metal Bending & CNC Laser Cutting in Surat";
const description =
  "Balaji Engineering Works is a Surat-based manufacturer and service provider of sheet metal bending, shearing, CNC laser cutting, CNC plasma cutting, rolling, punching, and fabrication services.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "manufacturer of sheet metal bending Surat",
    "CNC plasma cutting Surat",
    "laser cutting services Surat",
    "sheet metal fabrication Gujarat",
  ],
});

export default async function Page() {
  const [posts, services] = await Promise.all([
    getPublicBlogs(),
    getPublicServices(),
  ]);

  const schemas = [
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
      <HomePage initialPosts={posts.slice(0, 3)} />
    </>
  );
}
