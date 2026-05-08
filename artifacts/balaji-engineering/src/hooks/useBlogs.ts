import { useState, useEffect } from "react";
import { blogPosts as staticPosts } from "@/lib/blogData";
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

const STATIC_POSTS: BlogPost[] = staticPosts.map(mapStatic);

async function fetchFromApi(): Promise<BlogPost[] | null> {
  try {
    const res = await fetch("/api/blogs");
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export function useBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>(STATIC_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromApi()
      .then((data) => {
        if (data) setPosts(data);
      })
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
