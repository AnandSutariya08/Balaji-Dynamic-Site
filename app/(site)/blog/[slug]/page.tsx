import { notFound } from "next/navigation";
import BlogPostPage from "@/components/site/BlogPostPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublicBlogBySlug, getPublicBlogs } from "@/lib/public-data";
import {
  buildMetadata,
  createBlogPostingJsonLd,
  createBreadcrumbJsonLd,
} from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getPublicBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublicBlogBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const metadata = buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.createdAt ?? post.date,
    modifiedTime: post.updatedAt ?? post.createdAt ?? post.date,
    authors: [post.author || "Balaji Engineering Works"],
    section: post.category,
    keywords: [post.category, post.title, "sheet metal fabrication blog"],
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: {
        "application/rss+xml": "/rss.xml",
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([
    getPublicBlogBySlug(slug),
    getPublicBlogs(),
  ]);

  if (!post) {
    notFound();
  }

  const related = posts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);

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
      <BlogPostPage
        slug={slug}
        initialPost={post}
        initialRelated={related}
        initialPosts={posts}
      />
    </>
  );
}
