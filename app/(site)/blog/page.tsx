import BlogPage from "@/components/site/BlogPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
import {
  buildMetadata,
  createBlogJsonLd,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Sheet Metal Bending Works Blog & Guides | CNC Laser Cutting & Fabrication Tips | Balaji Engineering Works";
const description =
  "Read sheet metal bending works guides, CNC laser cutting tips, plasma cutting insights, press brake bending articles, and fabrication knowledge from Balaji Engineering Works in Surat.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/blog",
  keywords: [
    "Balaji Engineering Works blog",
    "sheet metal fabrication blog",
    "laser cutting guides",
    "steel bending articles",
    "industrial fabrication insights",
  ],
});

export default async function Page() {
  const posts = await getPublicBlogsFromFirestore();
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/blog",
      type: "CollectionPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    createBlogJsonLd(posts),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <BlogPage />
    </>
  );
}
