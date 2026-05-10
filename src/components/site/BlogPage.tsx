"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Loader2,
  Rss,
  TrendingUp,
  Zap,
} from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { useBlogs } from "@/hooks/useBlogs";
import type { BlogPost } from "@/lib/firestore/types";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

  const filteredPosts =
    filter === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === filter);
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <section className="relative flex min-h-[70vh] items-end overflow-hidden pb-10 md:pb-24">
          <div className="absolute inset-0">
            <img
              src="/service-fabrication.png"
              alt="Industrial fabrication workshop"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
            <div className="absolute bottom-0 left-0 h-[250px] w-[500px] rounded-full bg-primary/20 blur-[80px]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(172,60,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(172,60,60,0.3) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4 pt-28 md:pt-36">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-primary md:mb-10">
                <BookOpen className="h-3 w-3" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.3em]">
                  {blogPosts.length} Articles | Engineering Insights
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:mb-0 md:text-6xl lg:text-7xl xl:text-8xl">
                Insights &
                <br />
                <span className="bg-gradient-to-r from-[#AC3C3C] to-[#e05555] bg-clip-text text-transparent">
                  Knowledge
                </span>
              </h1>
              <div className="mt-8 hidden max-w-md md:block">
                <p className="mb-8 text-xl font-light leading-relaxed text-zinc-400">
                  Fabrication guides, industrial processing knowledge, and practical
                  production insights from Balaji Engineering Works.
                </p>
                <div className="flex items-center gap-8 text-sm">
                  <div>
                    <div className="text-3xl font-black text-white">
                      {blogPosts.length}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                      Articles
                    </div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <div className="text-3xl font-black text-white">3</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                      Categories
                    </div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <a
                      href="/rss.xml"
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-white"
                    >
                      <Rss className="h-4 w-4" /> RSS Feed
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-5 pb-2 md:hidden">
                {[
                  { v: blogPosts.length.toString(), l: "Articles" },
                  { v: "3", l: "Categories" },
                  { v: "RSS", l: "Feed" },
                ].map((stat, index) => (
                  <div key={stat.l} className="flex items-center gap-5">
                    {index > 0 && <div className="h-7 w-px bg-white/10" />}
                    <div>
                      <div className="text-xl font-black text-white">{stat.v}</div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                        {stat.l}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {loading && (
          <div className="flex items-center justify-center gap-2 bg-[#F7F5F1] py-10 text-sm text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading articles from
            Firestore...
          </div>
        )}

        {!loading && filter === "All" && featuredPost && (
          <section className="border-b border-black/8 bg-[#F7F5F1] py-10 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mb-6 flex items-center gap-4 md:mb-12">
                <div className="h-px flex-1 bg-black/8" />
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  <TrendingUp className="h-3 w-3" /> Featured Article
                </span>
                <div className="h-px flex-1 bg-black/8" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <div className="overflow-hidden rounded-2xl border border-black/8 bg-[#EDEAE4] transition-colors hover:border-primary/30 lg:grid lg:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden lg:aspect-auto">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute left-4 top-4 md:left-6 md:top-6">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                            categoryColors[featuredPost.category] ??
                            "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-5 md:p-10 xl:p-16">
                      <div className="mb-4 flex items-center gap-4 text-xs text-slate-500 md:mb-6">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" /> {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> {featuredPost.readTime}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-black uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary md:mb-6 md:text-3xl xl:text-4xl">
                        {featuredPost.title}
                      </h2>
                      <p className="mb-6 line-clamp-2 text-sm font-light leading-relaxed text-slate-600 md:mb-10 md:line-clamp-3 md:text-base">
                        {featuredPost.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition-all group-hover:gap-4 md:text-sm">
                        Read Full Article <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {!loading && filter === "All" && recentPosts.length > 0 && (
          <section className="border-b border-black/8 bg-[#EDEAE4] py-10 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-6 flex items-center gap-3 md:mb-10">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                  Latest Articles
                </span>
              </div>
              <div className="hidden gap-6 md:grid md:grid-cols-3">
                {recentPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <div className="flex items-start gap-4 rounded-xl border border-black/8 bg-[#EDEAE4] p-5 transition-all hover:border-primary/30 hover:bg-[#F7F5F1]">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#D5D0C8]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <span
                          className={`mb-2 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                            categoryColors[post.category] ??
                            "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {post.category}
                        </span>
                        <h4 className="line-clamp-2 text-sm font-bold uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary">
                          {post.title}
                        </h4>
                        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {post.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 md:hidden">
                {recentPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <div className="flex items-center gap-4 rounded-xl border border-black/8 bg-[#EDEAE4] p-4 transition-colors hover:border-primary/30">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#D5D0C8]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`mb-2 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                            categoryColors[post.category] ??
                            "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {post.category}
                        </span>
                        <h4 className="line-clamp-2 text-sm font-bold uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary">
                          {post.title}
                        </h4>
                        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {post.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-b border-black/8 bg-[#F7F5F1] py-4 md:py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 overflow-x-auto md:gap-4 no-scrollbar">
              <span className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.3em] text-slate-400 sm:block">
                Filter:
              </span>
              <div className="flex shrink-0 gap-2 md:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`h-9 whitespace-nowrap rounded-full px-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 md:h-10 md:px-6 md:text-xs ${
                      filter === category
                        ? "bg-primary text-white shadow-[0_0_15px_rgba(172,60,60,0.3)]"
                        : "border border-black/8 bg-[#EDEAE4] text-slate-600 hover:bg-[#D5D0C8] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {category}
                    <span
                      className={`ml-1.5 text-[9px] ${
                        filter === category ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      (
                      {category === "All"
                        ? blogPosts.length
                        : blogPosts.filter((post) => post.category === category).length}
                      )
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F1] py-10 md:py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-24 text-sm text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin" /> Loading...
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                key={filter}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.slug}
                    variants={item}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/8 bg-[#EDEAE4] transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                  >
                    <Link href={`/blog/${post.slug}`} className="relative block aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5" />
                      <div className="absolute left-3 top-3 md:left-4 md:top-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm ${
                            categoryColors[post.category] ??
                            "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 rounded-full border border-black/10 bg-[#F7F5F1]/90 px-2.5 py-1 backdrop-blur-sm md:bottom-4 md:right-4">
                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                          <Clock className="h-2 w-2" /> {post.readTime}
                        </span>
                      </div>
                    </Link>
                    <div className="flex flex-grow flex-col p-5 md:p-7">
                      <div className="mb-3 flex items-center gap-2 md:mb-5">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="mb-3 flex-grow text-base font-black uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary md:mb-4 md:text-xl">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm font-light leading-relaxed text-slate-500 md:mb-6">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-black/8 pt-4 md:pt-5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
                          {post.author ?? "Balaji Engineering"}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary transition-all group-hover:gap-3"
                        >
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredPosts.length === 0 && (
              <div className="py-20 text-center md:py-32">
                <div className="mb-4 text-6xl font-black text-black/5">0</div>
                <p className="font-bold uppercase tracking-widest text-slate-400">
                  No articles in this category yet
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-black/8 bg-[#EDEAE4] py-14 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Have a Question?
                </span>
                <h2 className="mt-4 mb-6 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:mb-8 md:text-7xl">
                  Talk to Our
                  <br />
                  Engineers
                </h2>
                <p className="mb-8 text-base font-light leading-relaxed text-slate-600 md:mb-10 md:text-lg">
                  If you need help with a fabrication requirement, our team can help
                  connect the article knowledge to your actual manufacturing need.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Button
                    size="lg"
                    className="h-12 border-none bg-primary px-8 font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(172,60,60,0.3)] hover:bg-primary/90 md:h-14 md:px-10"
                    asChild
                  >
                    <Link href="/contact">Ask Our Team</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-black/20 px-8 font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-black/5 md:h-14 md:px-10"
                    asChild
                  >
                    <Link href="/services">View Services</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  {
                    icon: BookOpen,
                    title: "Guides",
                    value: `${blogPosts.filter((post) => post.category === "Guide").length} Articles`,
                  },
                  {
                    icon: Zap,
                    title: "Technical",
                    value: `${blogPosts.filter((post) => post.category === "Technical").length} Articles`,
                  },
                  {
                    icon: TrendingUp,
                    title: "Industry",
                    value: `${blogPosts.filter((post) => post.category === "Industry").length} Articles`,
                  },
                  { icon: Rss, title: "Feed", value: "RSS Ready" },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group rounded-2xl border border-black/8 bg-[#F7F5F1] p-5 text-center transition-colors hover:border-primary/30 md:p-8"
                  >
                    <card.icon className="mx-auto mb-3 h-6 w-6 text-primary md:mb-4 md:h-7 md:w-7" />
                    <div className="mb-1 text-lg font-black text-[#1A1A1A] md:text-2xl">
                      {card.value}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {card.title}
                    </div>
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
