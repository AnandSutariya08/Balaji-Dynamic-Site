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

const title = "Sheet Metal Bending, Laser Cutting & Steel Fabrication in Surat";
const description =
  "Balaji Engineering Works delivers CNC laser cutting, sheet metal bending, plate rolling, and heavy steel fabrication in Surat, Gujarat.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "sheet metal bending works Surat",
    "steel fabrication company Surat",
    "laser cutting services Surat",
    "plate rolling Gujarat",
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
