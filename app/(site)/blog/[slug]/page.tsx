import { notFound } from "next/navigation";
import BlogPostPage from "@/components/site/BlogPostPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublicBlogBySlugFromFirestore } from "@/lib/firestore/publicBlogsServer";
import { buildMetadata, createBlogPostingJsonLd, createBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublicBlogBySlugFromFirestore(slug);

  if (!post) {
    return buildMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.createdAt ?? post.date,
    modifiedTime: post.updatedAt ?? post.createdAt ?? post.date,
    authors: [post.author || "Balaji Engineering Works"],
    section: post.category,
    keywords: [
      post.category,
      post.title,
      "sheet metal fabrication blog",
      "Balaji Engineering Works",
      "Surat fabrication guide",
    ],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPublicBlogBySlugFromFirestore(slug);
  if (!post) notFound();

  const schemas = [
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    createBlogPostingJsonLd(post),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <BlogPostPage slug={slug} />
    </>
  );
}
