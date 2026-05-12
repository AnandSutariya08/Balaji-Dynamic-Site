"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Zap, Loader2 } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogs";
import type { BlogPost } from "@/lib/firestore/types";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const categoryColors: Record<string, string> = {
  Technical: "bg-blue-50 text-blue-700 border-blue-200",
  Guide: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Industry: "bg-red-50 text-primary border-primary/20",
};

export default function BlogPage({
  initialPosts = [],
}: {
  initialPosts?: BlogPost[];
}) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Technical", "Guide", "Industry"];
  const { posts: blogPosts, loading } = useBlogs(initialPosts);

  const filteredPosts = filter === "All" ? blogPosts : blogPosts.filter(post => post.category === filter);
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);
  const postHref = (slug: string) => `/blog/${encodeURIComponent(slug)}`;

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">

        {/* HERO */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden pb-10 md:pb-24">
          <div className="absolute inset-0">
            <img src="/service-fabrication.png" alt="Fabrication Workshop" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[250px] bg-primary/20 blur-[80px] rounded-full" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(172,60,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(172,60,60,0.3) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          </div>
          <div className="container relative z-10 mx-auto px-4 pt-28 md:pt-36">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary mb-6 md:mb-10">
                <BookOpen className="w-3 h-3" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">{blogPosts.length} Articles · Engineering Intelligence</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 md:mb-0">
                Insights &<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">Knowledge</span>
              </h1>
              <div className="hidden md:block max-w-md mt-8">
                <p className="text-xl text-zinc-400 font-light leading-relaxed mb-8">Expert perspectives on metal fabrication, CNC precision, material science, and the future of industrial engineering.</p>
                <div className="flex items-center gap-8 text-sm">
                  <div>
                    <div className="text-3xl font-display font-black text-white">{blogPosts.length}</div>
                    <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Articles</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <div className="text-3xl font-display font-black text-white">3</div>
                    <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Categories</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <div className="text-3xl font-display font-black text-white">20+</div>
                    <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Yrs Experience</div>
                  </div>
                </div>
              </div>
              <div className="flex md:hidden items-center gap-5 mt-5 pb-2">
                {[
                  { v: blogPosts.length.toString(), l: "Articles" },
                  { v: "3", l: "Categories" },
                  { v: "20+", l: "Yrs Exp" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-5">
                    {i > 0 && <div className="w-px h-7 bg-white/10" />}
                    <div>
                      <div className="text-xl font-display font-black text-white">{s.v}</div>
                      <div className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#EDEAE4] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "CNC Plate Bending Guides",
                  desc: "Learn what buyers should check before choosing a bending vendor in Surat.",
                  href: "/services/cnc-plate-bending",
                },
                {
                  title: "CNC Laser Cutting Knowledge",
                  desc: "Compare laser cutting, profile cutting, and fabrication process choices.",
                  href: "/services/cnc-laser-cutting",
                },
                {
                  title: "Plate Rolling and Forming",
                  desc: "Find the right process for rolled and curved industrial plate shapes.",
                  href: "/services/plate-rolling",
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-6 transition-colors hover:border-primary/40 hover:bg-white"
                >
                  <h2 className="text-xl font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-slate-500">
                    {card.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    Explore Service <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-slate-400 text-sm bg-[#F7F5F1]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading articles from Firestore…
          </div>
        )}

        {/* FEATURED POST */}
        {!loading && filter === "All" && featuredPost && (
          <section className="py-10 md:py-20 border-b border-black/8 bg-[#F7F5F1]">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 mb-6 md:mb-12">
                <div className="h-px flex-1 bg-black/8" />
                <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase flex items-center gap-2"><TrendingUp className="w-3 h-3" /> Featured Article</span>
                <div className="h-px flex-1 bg-black/8" />
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="group">
              <Link href={postHref(featuredPost.slug)} className="block">
                  <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-black/8 hover:border-primary/30 transition-colors bg-[#EDEAE4]">
                    <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                      <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 md:top-6 md:left-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${categoryColors[featuredPost.category] ?? "bg-slate-50 text-slate-700 border-slate-200"}`}>
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 md:p-10 xl:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 md:mb-6">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-xl md:text-3xl xl:text-4xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-3 md:mb-6 leading-[0.95] group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                      <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed mb-6 md:mb-10 line-clamp-2 md:line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs md:text-sm group-hover:gap-4 transition-all">
                        Read Full Article <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* RECENT HIGHLIGHTS */}
        {!loading && filter === "All" && recentPosts.length > 0 && (
          <section className="py-10 md:py-16 border-b border-black/8 bg-[#EDEAE4]">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-6 md:mb-10">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">Latest Articles</span>
              </div>
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <Link key={post.slug} href={postHref(post.slug)} className="group block">
                    <div className="flex gap-4 items-start p-5 rounded-xl border border-black/8 hover:border-primary/30 hover:bg-[#F7F5F1] transition-all bg-[#EDEAE4]">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#D5D0C8]">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border mb-2 ${categoryColors[post.category] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>{post.category}</span>
                        <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-snug">{post.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{post.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col md:hidden gap-3">
                {recentPosts.map((post) => (
                  <Link key={post.slug} href={postHref(post.slug)} className="group block">
                    <div className="flex gap-4 items-center p-4 rounded-xl border border-black/8 bg-[#EDEAE4] hover:border-primary/30 transition-colors">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#D5D0C8]">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border mb-2 ${categoryColors[post.category] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>{post.category}</span>
                        <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-snug">{post.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{post.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FILTER BAR */}
        <section className="py-4 md:py-10 border-b border-black/8 bg-[#F7F5F1]">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase hidden sm:block shrink-0">Filter:</span>
              <div className="flex gap-2 md:gap-3 shrink-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`h-9 md:h-10 px-4 md:px-6 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      filter === cat
                        ? "bg-primary text-white shadow-[0_0_15px_rgba(172,60,60,0.3)]"
                        : "bg-[#EDEAE4] text-slate-600 hover:bg-[#D5D0C8] hover:text-[#1A1A1A] border border-black/8"
                    }`}
                  >
                    {cat}
                    <span className={`ml-1.5 text-[9px] ${filter === cat ? 'text-white/70' : 'text-slate-400'}`}>
                      ({cat === "All" ? blogPosts.length : blogPosts.filter(p => p.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="py-10 md:py-20 bg-[#F7F5F1]">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-24 text-slate-400 text-sm">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading…
              </div>
            ) : (
              <motion.div variants={container} initial="hidden" animate="show" key={filter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.slug}
                    variants={item}
                    className="group bg-[#EDEAE4] rounded-2xl overflow-hidden border border-black/8 flex flex-col h-full hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link href={postHref(post.slug)} className="block relative overflow-hidden aspect-video">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                      <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border backdrop-blur-sm ${categoryColors[post.category] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>{post.category}</span>
                      </div>
                      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-[#F7F5F1]/90 backdrop-blur-sm border border-black/10 rounded-full px-2.5 py-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Clock className="w-2 h-2" /> {post.readTime}</span>
                      </div>
                    </Link>
                    <div className="p-5 md:p-7 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3 md:mb-5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.date}</span>
                      </div>
                      <h3 className="text-base md:text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-3 md:mb-4 leading-[1.1] group-hover:text-primary transition-colors flex-grow">
                        <Link href={postHref(post.slug)}>{post.title}</Link>
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4 md:mb-6 font-light leading-relaxed">{post.excerpt}</p>
                      <div className="mt-auto pt-4 md:pt-5 border-t border-black/8 flex items-center justify-between">
                        <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase">{post.author ?? "Balaji Engineering"}</span>
                        <Link href={postHref(post.slug)} className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredPosts.length === 0 && (
              <div className="text-center py-20 md:py-32">
                <div className="text-6xl font-display font-black text-black/5 mb-4">0</div>
                <p className="text-slate-400 font-bold uppercase tracking-widest">No articles in this category yet</p>
              </div>
            )}
          </div>
        </section>

        {/* KNOWLEDGE CTA */}
        <section className="py-14 md:py-32 bg-[#EDEAE4] border-t border-black/8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Have a Question?</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4 mb-6 md:mb-8 leading-[0.9]">Talk to Our<br />Engineers</h2>
                <p className="text-slate-600 font-light text-base md:text-lg leading-relaxed mb-8 md:mb-10">Can't find the answer in our articles? Our experienced team is ready to discuss your specific fabrication challenge directly.</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Button size="lg" className="h-12 md:h-14 px-8 md:px-10 font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_25px_rgba(172,60,60,0.3)] border-none" asChild>
                    <Link href="/contact">Ask Our Team</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 md:h-14 px-8 md:px-10 border-black/20 text-[#1A1A1A] hover:bg-black/5 font-bold uppercase tracking-widest" asChild>
                    <Link href="/services">View Services</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { icon: BookOpen, title: "Guides", value: `${blogPosts.filter(p => p.category === 'Guide').length} Articles` },
                  { icon: Zap, title: "Technical", value: `${blogPosts.filter(p => p.category === 'Technical').length} Articles` },
                  { icon: TrendingUp, title: "Industry", value: `${blogPosts.filter(p => p.category === 'Industry').length} Articles` },
                  { icon: Clock, title: "Avg Read Time", value: "6 Min" },
                ].map((card, i) => (
                  <div key={i} className="p-5 md:p-8 bg-[#F7F5F1] border border-black/8 rounded-2xl text-center group hover:border-primary/30 transition-colors">
                    <card.icon className="w-6 h-6 md:w-7 md:h-7 text-primary mx-auto mb-3 md:mb-4" />
                    <div className="text-lg md:text-2xl font-display font-black text-[#1A1A1A] mb-1">{card.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
