"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/lib/firestore/types";

const CATEGORIES = ["All", "CNC Cutting", "Fabrication", "Products", "Plant", "Projects", "General"];

export default function GalleryPage({ items }: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx);
    setLightbox(item);
  };

  const closeLightbox = () => setLightbox(null);

  const prev = () => {
    const newIdx = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox(filtered[newIdx]);
  };

  const next = () => {
    const newIdx = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox(filtered[newIdx]);
  };

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <PageHero
          imageSrc="/product-base-plates.png"
          imageAlt="Balaji Engineering Works manufacturing gallery"
          pill={(
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-primary">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] sm:text-[10px]">
                {items.length} Photos — Surat Manufacturing Facility
              </span>
            </div>
          )}
          title={(
            <>
              Our Work
              <br />
              <span className="bg-gradient-to-r from-[#AC3C3C] to-[#e05555] bg-clip-text text-transparent">
                Gallery
              </span>
            </>
          )}
          description="A visual record of our fabrication work, CNC cutting, bending, welding, and finished products from the Balaji Engineering Works facility in Surat."
          stats={[
            { v: items.length.toString(), l: "Photos" },
            { v: "25+", l: "Years" },
            { v: "Surat", l: "Facility" },
          ]}
        />

        {/* Category filter */}
        <section className="sticky top-0 z-30 border-b border-black/8 bg-[#F7F5F1]/95 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-[0_0_16px_rgba(172,60,60,0.35)]"
                      : "border border-black/12 bg-white text-slate-500 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto text-xs font-bold text-slate-400">
                {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
              </span>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Camera className="mb-4 h-12 w-12 text-slate-300" />
                <p className="text-lg font-bold text-slate-400">No photos in this category yet</p>
              </div>
            ) : (
              <motion.div
                layout
                className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
              >
                <AnimatePresence>
                  {filtered.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03, duration: 0.4 }}
                      className="group mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
                      onClick={() => openLightbox(item)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <ZoomIn className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        {item.category && (
                          <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {item.category}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-display font-black uppercase tracking-tight text-[#1A1A1A] line-clamp-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-1 text-xs font-light leading-relaxed text-slate-500 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                          <span className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1C1C1C] py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter text-white md:text-6xl">
              Need This Work
              <br />
              for Your Project?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-zinc-400">
              Share your drawing and requirements. Our Surat team will review and reply with a practical quote.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/90" asChild>
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 border-white/20 px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeLightbox}
              aria-label="Close"
            />

            <motion.div
              key={lightbox.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-2xl"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-[#AC3C3C]/30 bg-[#AC3C3C]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#e05555]">
                    {lightbox.category}
                  </span>
                  <span className="text-xs font-bold text-zinc-300">{lightbox.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">{lightboxIndex + 1} / {filtered.length}</span>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/8 hover:text-white"
                    aria-label="Close lightbox"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="relative bg-black">
                <img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="max-h-[65vh] w-full object-contain"
                />

                {filtered.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); prev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); next(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Details */}
              <div className="border-t border-white/8 p-5">
                <h2 className="text-lg font-display font-black uppercase tracking-tight text-white">
                  {lightbox.title}
                </h2>
                {lightbox.description && (
                  <p className="mt-2 text-sm font-light leading-relaxed text-zinc-400">
                    {lightbox.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-primary" />
                    <span className="font-bold uppercase tracking-widest text-primary">{lightbox.category}</span>
                  </span>
                  {lightbox.createdAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(lightbox.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
