import { PageTransition } from "@/components/layout/PageTransition";
import { blogPosts } from "@/lib/blogData";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Blog() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Technical", "Guide", "Industry"];

  const filteredPosts = filter === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  const featuredPost = blogPosts[0];

  return (
    <PageTransition>
      <div className="pt-24 pb-16 bg-black min-h-screen">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tight mb-6">
                Insights & <span className="text-primary">Engineering</span>
              </h1>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                Expert perspectives on metal fabrication, CNC precision, and the future of industrial engineering.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {filter === "All" && (
          <section className="py-16 border-b border-white/10">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-2 gap-8 items-center bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5"
              >
                <div className="aspect-video lg:aspect-square overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <Badge variant="outline" className="mb-6 text-primary border-primary/30 uppercase tracking-widest">
                    Featured Post
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-zinc-400 text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-zinc-500 mb-8">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href={`/blog/${featuredPost.slug}`}>Read Article</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="py-12 border-b border-white/10 sticky top-20 bg-black/80 backdrop-blur-md z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                    filter === cat 
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(172,60,60,0.4)]" 
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  variants={item}
                  className="group bg-zinc-900/30 rounded-xl overflow-hidden border border-white/5 flex flex-col h-full hover:border-primary/30 transition-colors"
                >
                  <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 uppercase text-[10px] tracking-widest">
                        {post.category}
                      </Badge>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <span className="text-xs text-zinc-500 uppercase tracking-widest">{post.date}</span>
                      <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
