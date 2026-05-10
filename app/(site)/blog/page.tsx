import BlogPage from "@/components/site/BlogPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublicBlogs } from "@/lib/public-data";
import {
  buildMetadata,
  createBlogJsonLd,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Sheet Metal Fabrication Blog & Guides";
const description =
  "Read fabrication guides, technical insights, and manufacturing articles from Balaji Engineering Works on sheet metal bending, laser cutting, plate rolling, and steel fabrication.";

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
  const posts = await getPublicBlogs();
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
      <BlogPage initialPosts={posts} />
    </>
  );
}
