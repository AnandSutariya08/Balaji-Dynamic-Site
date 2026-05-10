import BlogPage from "@/components/site/BlogPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublicBlogs } from "@/lib/public-data";
import {
  buildMetadata,
  createBlogJsonLd,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Blog, Guides & Fabrication Insights";
const description =
  "Read fabrication guides, technical insights, and industry updates from Balaji Engineering Works on sheet metal bending, laser cutting, and steel fabrication.";

export const metadata = {
  ...buildMetadata({
    title,
    description,
    path: "/blog",
    keywords: [
      "sheet metal fabrication blog",
      "laser cutting guides",
      "steel bending articles",
      "industrial fabrication insights",
    ],
  }),
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

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
