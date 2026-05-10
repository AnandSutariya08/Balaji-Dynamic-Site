"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Clock,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { BlogForm } from "./BlogForm";
import { getBlogs, deleteBlog } from "@/lib/firestore/blogs";
import { isFirebaseConfigured } from "@/lib/firebase";
import { triggerCacheRefresh } from "@/lib/apiCache";
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
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const configured = isFirebaseConfigured();

  const load = async () => {
    if (!configured) return;
    setLoading(true);
    setError("");
    try {
      const data = await getBlogs();
      setPosts(data);
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : "Failed to load posts.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteBlog(id);
      setPosts((current) => current.filter((post) => post.id !== id));
      await triggerCacheRefresh();
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
    await load();
    await triggerCacheRefresh();
  };

  return (
    <>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
            <p className="mt-0.5 text-sm text-zinc-500">{posts.length} articles in Firestore</p>
          </div>
          <div className="flex items-center gap-2">
            {configured && (
              <button
                type="button"
                onClick={() => void load()}
                disabled={loading}
                className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            )}
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
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group flex items-start gap-4 rounded-xl border border-white/6 bg-[#1a1a1a] p-4 transition-colors hover:border-white/12"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  {post.image && (
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover opacity-70" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{post.title}</h3>
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                        CATEGORY_COLORS[post.category] ||
                        "border-zinc-700 bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="mb-1.5 flex items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                    {post.slug && <span className="font-mono text-zinc-600">/{post.slug}</span>}
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">{post.excerpt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(post);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-red-400/5 hover:text-red-400 disabled:opacity-50"
                  >
                    {deleting === post.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <BlogForm post={editing} onClose={closeForm} onSaved={() => void handleSaved()} />
      )}
    </>
  );
}
