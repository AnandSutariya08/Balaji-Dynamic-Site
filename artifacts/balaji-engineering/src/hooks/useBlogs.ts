import { useState, useEffect } from "react";
import { getBlogs } from "@/lib/firestore/blogs";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost } from "@/lib/firestore/types";

function mapStatic(p: any): BlogPost {
  return {
    id: p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    image: p.image,
    category: p.category,
    readTime: p.readTime,
    date: p.date,
    author: "Balaji Engineering Works",
  };
}

export function useBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts.map(mapStatic));
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    setLoading(true);
    getBlogs()
      .then((data) => {
        if (data.length > 0) setPosts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}

export function useBlogPost(slug: string | undefined) {
  const { posts, loading } = useBlogs();
  const post = slug ? posts.find((p) => p.slug === slug) ?? null : null;
  const related = post
    ? posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
    : [];
  return { post, related, loading };
}
