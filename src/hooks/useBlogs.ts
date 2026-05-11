import { useState, useEffect } from "react";
import { blogPosts as staticPosts } from "@/lib/blogData";
import type { BlogPost } from "@/lib/firestore/types";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getBlogs } from "@/lib/firestore/blogs";

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

async function fetchFromFirestore(): Promise<BlogPost[] | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const posts = await getBlogs();
    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.warn("Failed to fetch blogs from Firestore; falling back to static posts.", error);
    return null;
  }
}

export function useBlogs(initialPosts: BlogPost[] = STATIC_POSTS) {
  const fallbackPosts = initialPosts.length > 0 ? initialPosts : STATIC_POSTS;
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchFromFirestore()
      .then((data) => {
        if (data) setPosts(data);
        else setPosts(fallbackPosts);
      })
      .finally(() => setLoading(false));
  }, [fallbackPosts]);

  return { posts, loading };
}

export function useBlogPost(
  slug: string | undefined,
  initialPosts: BlogPost[] = STATIC_POSTS,
  initialPost?: BlogPost | null,
  initialRelated: BlogPost[] = [],
) {
  const { posts, loading } = useBlogs(initialPosts.length > 0 ? initialPosts : STATIC_POSTS);
  const post = slug
    ? initialPost ?? posts.find((item) => item.slug === slug) ?? null
    : null;
  const related =
    initialRelated.length > 0
      ? initialRelated
      : post
        ? posts
            .filter((item) => item.slug !== post.slug && item.category === post.category)
            .slice(0, 3)
        : [];
  return { post, related, loading };
}
