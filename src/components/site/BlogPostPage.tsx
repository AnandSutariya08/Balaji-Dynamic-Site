"use client";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  Clock,
  Linkedin,
  Loader2,
  Share2,
  Twitter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { useBlogPost } from "@/hooks/useBlogs";
import type { BlogPost } from "@/lib/firestore/types";

function shareLink(platform: "x" | "linkedin", post: BlogPost) {
  const url = encodeURIComponent(
    typeof window === "undefined"
      ? `/blog/${post.slug}`
      : `${window.location.origin}/blog/${post.slug}`,
  );
  const title = encodeURIComponent(post.title);

  if (platform === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  }

  return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
}

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
    restDelta: 0.001,
  });

  const currentUrl = post
    ? typeof window === "undefined"
      ? `/blog/${post.slug}`
      : `${window.location.origin}/blog/${post.slug}`
    : "";

  async function handleShare() {
    if (!post || typeof navigator === "undefined") {
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: currentUrl,
      });
      return;
    }

    if (navigator.clipboard && currentUrl) {
      await navigator.clipboard.writeText(currentUrl);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4 text-zinc-400">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-bold uppercase tracking-widest">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Post Not Found</h1>
          <Button asChild variant="outline">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-primary"
        style={{ scaleX }}
      />

      <article className="min-h-screen bg-black">
        <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
          </div>

          <div className="container relative z-10 mx-auto px-4 pb-12 pt-24 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to Insights
                </Link>
              </div>
              <Badge className="mb-4 bg-primary px-4 py-1 uppercase tracking-[0.2em] text-white hover:bg-primary">
                {post.category}
              </Badge>
              <h1
                className="mb-6 font-display font-bold uppercase tracking-tight text-white"
                style={{ fontSize: "clamp(1.75rem, min(6vw, 8vh), 4.5rem)" }}
              >
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {post.readTime}
                </span>
                {post.author && <span className="flex items-center gap-2">By {post.author}</span>}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert prose-red max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-li:text-zinc-400 prose-p:text-sm prose-p:leading-relaxed prose-p:text-zinc-400 md:prose-p:text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <aside className="space-y-8 md:space-y-12">
                <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-8">
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
                    Article Source
                  </h4>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 font-display font-bold text-white">
                      BE
                    </div>
                    <div>
                      <div className="font-bold uppercase tracking-tight text-white">
                        {post.author ?? "Balaji Engineering"}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-zinc-500">
                        Industrial fabrication team
                      </div>
                    </div>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                    These articles are intended to help fabrication buyers,
                    engineers, and project teams understand production-related
                    considerations more clearly.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={shareLink("x", post)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 transition-colors hover:text-white"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={shareLink("linkedin", post)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 transition-colors hover:text-white"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => void handleShare()}
                      className="text-zinc-500 transition-colors hover:text-white"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {related.length > 0 && (
                  <div>
                    <h4 className="mb-6 border-l-2 border-primary pl-4 text-sm font-bold uppercase tracking-widest text-white">
                      Related Articles
                    </h4>
                    <div className="space-y-6">
                      {related.map((relatedPost) => (
                        <Link
                          key={relatedPost.slug}
                          href={`/blog/${relatedPost.slug}`}
                          className="group block"
                        >
                          <div className="mb-3 aspect-video overflow-hidden rounded-lg border border-white/5">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <h5 className="line-clamp-2 text-sm font-bold uppercase tracking-tight text-white transition-colors group-hover:text-primary">
                            {relatedPost.title}
                          </h5>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-zinc-950 py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="mb-8 text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
              Interested in our <span className="text-primary">Capabilities?</span>
            </h3>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 bg-primary px-10 font-bold uppercase tracking-widest hover:bg-primary/90"
                asChild
              >
                <Link href="/services">Our Services</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-white/20 px-10 font-bold uppercase tracking-widest text-white"
                asChild
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
