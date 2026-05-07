import AdminLayout from "./Layout";
import { blogPosts } from "@/lib/blogData";
import { Link } from "wouter";
import { BookOpen, ExternalLink, Tag, Clock, Download } from "lucide-react";
import blogsJson from "@/lib/seed/blogs.json";

const CATEGORY_COLORS: Record<string, string> = {
  Technical: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Guide: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Industry: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function AdminBlogs() {
  const handleDownloadSeed = () => {
    const blob = new Blob([JSON.stringify(blogsJson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blogs-seed.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{blogPosts.length} articles · read-only preview</p>
          </div>
          <button
            onClick={handleDownloadSeed}
            className="flex items-center gap-2 px-4 py-2 bg-[#AC3C3C]/10 hover:bg-[#AC3C3C]/20 border border-[#AC3C3C]/30 text-[#e05555] text-sm font-semibold rounded-xl transition-all"
          >
            <Download className="w-4 h-4" />
            Download Seed JSON
          </button>
        </div>

        <div className="bg-[#1a1a1a] border border-white/6 rounded-xl p-4 mb-5 text-sm text-zinc-400">
          <p>
            These posts are currently stored in code. Use the <strong className="text-white">Download Seed JSON</strong> button
            to get the Firebase-ready file, then upload it to Firestore to make them fully editable from this panel.
          </p>
        </div>

        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div key={post.slug} className="bg-[#1a1a1a] border border-white/6 rounded-xl p-4 flex items-start gap-4 hover:border-white/12 transition-colors">
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-70" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap mb-1">
                  <h3 className="text-white font-semibold text-sm leading-snug">{post.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2">
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{post.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
              <div className="shrink-0">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border mb-2 ${CATEGORY_COLORS[post.category] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                  {post.category}
                </span>
                <div>
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors mt-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
