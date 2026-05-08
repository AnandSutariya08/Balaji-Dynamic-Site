import { useState, useEffect } from "react";
import AdminLayout from "./Layout";
import BlogForm from "./BlogForm";
import { getBlogs, deleteBlog } from "@/lib/firestore/blogs";
import { isFirebaseConfigured } from "@/lib/firebase";
import { triggerCacheRefresh } from "@/lib/apiCache";
import type { BlogPost } from "@/lib/firestore/types";
import {
  BookOpen, Plus, Pencil, Trash2, ExternalLink,
  Tag, Clock, RefreshCw, AlertCircle, Loader2
} from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Technical: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Guide: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Industry: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function AdminBlogs() {
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
    } catch (e: any) {
      setError(e.message || "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteBlog(id);
      setPosts((p) => p.filter((b) => b.id !== id));
      triggerCacheRefresh();
    } catch (e: any) {
      setError(e.message || "Failed to delete.");
    } finally {
      setDeleting(null);
    }
  };

  const openEdit = (post: BlogPost) => { setEditing(post); setShowForm(true); };
  const openAdd = () => { setEditing(null); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };
  const handleSaved = () => { load(); triggerCacheRefresh(); };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{posts.length} articles in Firestore</p>
          </div>
          <div className="flex items-center gap-2">
            {configured && (
              <button onClick={load} disabled={loading} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
            )}
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#AC3C3C] hover:bg-[#c44040] text-white text-sm font-bold rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
        </div>

        {!configured && (
          <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 mb-5 text-amber-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Firebase not configured</p>
              <p className="text-amber-400/80 mt-0.5">Add your <code className="font-mono bg-black/30 px-1 rounded">VITE_FIREBASE_*</code> secrets to load and manage posts from Firestore. You can still open the form and explore the UI.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl p-4 mb-5 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24 text-zinc-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading from Firestore...
          </div>
        ) : posts.length === 0 && configured ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="w-10 h-10 text-zinc-700 mb-3" />
            <p className="text-zinc-500 font-medium">No posts yet</p>
            <p className="text-zinc-600 text-sm mt-1 mb-4">Add your first blog post or seed from the JSON file you downloaded.</p>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[#AC3C3C]/10 border border-[#AC3C3C]/30 text-[#e05555] text-sm font-semibold rounded-xl hover:bg-[#AC3C3C]/20 transition-all">
              <Plus className="w-4 h-4" /> Add First Post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#1a1a1a] border border-white/6 rounded-xl p-4 flex items-start gap-4 hover:border-white/12 transition-colors group">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                  {post.image && <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-70" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-semibold text-sm">{post.title}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${CATEGORY_COLORS[post.category] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-1.5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span>{post.date}</span>
                    {post.slug && <span className="font-mono text-zinc-600">/{post.slug}</span>}
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => openEdit(post)} className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all disabled:opacity-50"
                  >
                    {deleting === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <BlogForm
          post={editing}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}
    </AdminLayout>
  );
}
