"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { useBlogPost } from "@/hooks/useBlogs";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronLeft, ArrowRight, Share2, Linkedin, Twitter, Loader2 } from "lucide-react";
import type { BlogPost } from "@/lib/firestore/types";

export default function BlogPostPage({
  slug,
  initialPost,
  initialRelated = [],
  initialPosts = [],
}: {
  slug: string;
  initialPost?: BlogPost | null;
  initialRelated?: BlogPost[];
  initialPosts?: BlogPost[];
}) {
  const { post, related, loading } = useBlogPost(
    slug,
    initialPosts,
    initialPost,
    initialRelated,
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4 text-zinc-400">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm uppercase tracking-widest font-bold">Loading article…</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Post Not Found</h1>
          <Button asChild variant="outline">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <article className="bg-black min-h-screen">
        {/* Post Hero */}
        <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
          </div>

          <div className="container mx-auto px-4 relative z-10 pt-24 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
                  <ChevronLeft className="w-4 h-4" /> Back to Insights
                </Link>
              </div>
              <Badge className="mb-4 bg-primary text-white hover:bg-primary uppercase tracking-[0.2em] px-4 py-1">
                {post.category}
              </Badge>
              <h1
                className="font-display font-bold text-white uppercase tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(1.75rem, min(6vw, 8vh), 4.5rem)' }}
              >
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-zinc-400 uppercase tracking-widest text-xs font-semibold">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {post.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {post.readTime}</span>
                {post.author && <span className="flex items-center gap-2">By {post.author}</span>}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Post Content */}
        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-16">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert prose-red max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-p:text-sm md:prose-p:text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Sidebar */}
              <aside className="space-y-8 md:space-y-12">
                {/* Author Card */}
                <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">The Author</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-display font-bold">
                      BE
                    </div>
                    <div>
                      <div className="text-white font-bold uppercase tracking-tight">{post.author ?? "Balaji Engineering"}</div>
                      <div className="text-zinc-500 text-xs uppercase tracking-widest">Precision Works</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    Our engineering team brings 20+ years of industrial experience to every insight we share.
                  </p>
                  <div className="flex gap-4">
                    <button className="text-zinc-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></button>
                    <button className="text-zinc-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></button>
                    <button className="text-zinc-500 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                  </div>
                </div>

                {/* Related Posts */}
                {related.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6 border-l-2 border-primary pl-4">Related Articles</h4>
                    <div className="space-y-6">
                      {related.map(rp => (
                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                          <div className="aspect-video rounded-lg overflow-hidden mb-3 border border-white/5">
                            <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <h5 className="text-sm font-display font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                            {rp.title}
                          </h5>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6 border-l-2 border-primary pl-4">Related Services</h4>
                  <div className="space-y-3">
                    {[
                      { title: "Sheet Bending Service", href: "/services/sheet-bending" },
                      { title: "CNC Laser Cutting", href: "/services/laser-cutting" },
                      { title: "Plate Profile Cutting", href: "/services/profile-cutting" },
                    ].map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block rounded-xl border border-white/8 bg-zinc-900/50 p-4 transition-colors hover:border-primary/40 hover:bg-zinc-900"
                      >
                        <h5 className="text-sm font-display font-black uppercase tracking-tight text-white">
                          {service.title}
                        </h5>
                        <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                          View Service <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-zinc-950 border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-8">
              Interested in our <span className="text-primary">Capabilities?</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-10 h-14 uppercase tracking-widest font-bold" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white px-10 h-14 uppercase tracking-widest font-bold" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
