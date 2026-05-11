"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Clock,
  Eye,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { BlogForm } from "./BlogForm";
import { deleteBlog } from "@/lib/firestore/blogs";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost } from "@/lib/firestore/types";

const CATEGORY_COLORS: Record<string, string> = {
  Technical: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Guide: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Industry: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [previewing, setPreviewing] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (!configured) return;
    setLoading(true);
    setError("");

    const q = query(collection(db, "blog-posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const nextPosts = snap.docs.map((docSnap) => {
          const data = docSnap.data() as any;
          return {
            id: docSnap.id,
            slug: data.slug ?? "",
            title: data.title ?? "",
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            image: data.image ?? "",
            category: data.category ?? "Technical",
            readTime: data.readTime ?? "",
            date: data.date ?? "",
            author: data.author ?? "",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          } as BlogPost;
        });
        setPosts(nextPosts);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to load posts.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [configured]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteBlog(id);
      setPosts((current) => current.filter((post) => post.id !== id));
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : "Failed to delete.";
      setError(message);
    } finally {
      setDeleting(null);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleSaved = async () => {
    // No-op: real-time subscription keeps the list updated.
  };

  return (
    <>
      <div className="w-full p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
            <p className="mt-0.5 text-sm text-zinc-500">{posts.length} articles in Firestore</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-[#AC3C3C] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c44040]"
            >
              <Plus className="h-4 w-4" />
              New Post
            </button>
          </div>
        </div>

        {!configured && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Firebase not configured</p>
              <p className="mt-0.5 text-amber-400/80">
                Add your{" "}
                <code className="rounded bg-black/30 px-1 font-mono">
                  NEXT_PUBLIC_FIREBASE_*
                </code>{" "}
                variables to load and manage posts from Firestore.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-zinc-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading from Firestore...
          </div>
        ) : posts.length === 0 && configured ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="mb-3 h-10 w-10 text-zinc-700" />
            <p className="font-medium text-zinc-500">No posts yet</p>
            <p className="mb-4 mt-1 text-sm text-zinc-600">
              Add your first blog post or seed from your existing content.
            </p>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 rounded-xl border border-[#AC3C3C]/30 bg-[#AC3C3C]/10 px-4 py-2 text-sm font-semibold text-[#e05555] transition-all hover:bg-[#AC3C3C]/20"
            >
              <Plus className="h-4 w-4" />
              Add First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/6 bg-[#1a1a1a] transition-colors hover:border-white/12"
              >
                <div className="relative aspect-[16/9] w-full bg-zinc-900">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover opacity-70"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-xl border border-white/10 bg-black/50 p-1.5 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => setPreviewing(post)}
                    className="rounded-lg p-2 text-zinc-200 transition-all hover:bg-white/10"
                    aria-label="Preview post"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <a
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-2 text-zinc-200 transition-all hover:bg-white/10"
                    aria-label="Open post"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(post);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-zinc-200 transition-all hover:bg-white/10"
                    aria-label="Edit post"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="rounded-lg p-2 text-zinc-200 transition-all hover:bg-red-400/15 hover:text-red-300 disabled:opacity-50"
                    aria-label="Delete post"
                  >
                    {deleting === post.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                      {post.title}
                    </h3>
                    <span
                      className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                        CATEGORY_COLORS[post.category] ||
                        "border-zinc-700 bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                    {post.slug && <span className="truncate font-mono text-zinc-600">/{post.slug}</span>}
                  </div>
                  <p className="line-clamp-3 text-xs leading-relaxed text-zinc-500">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {previewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setPreviewing(null)}
            aria-label="Close preview"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Post preview"
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-white">{previewing.title}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                    {previewing.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {previewing.readTime}
                  </span>
                  <span>{previewing.date}</span>
                  {previewing.slug && (
                    <span className="truncate font-mono text-zinc-600">/{previewing.slug}</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewing(null)}
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto">
              {previewing.image && (
                <div className="aspect-[16/9] w-full bg-black">
                  <img
                    src={previewing.image}
                    alt={previewing.title}
                    className="h-full w-full object-cover opacity-85"
                  />
                </div>
              )}
              <div className="space-y-4 p-5">
                {previewing.excerpt && (
                  <div className="rounded-xl border border-white/8 bg-white/4 p-4 text-sm text-zinc-300">
                    {previewing.excerpt}
                  </div>
                )}
                <div
                  className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: previewing.content }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <BlogForm post={editing} onClose={closeForm} onSaved={() => void handleSaved()} />
      )}
    </>
  );
}
