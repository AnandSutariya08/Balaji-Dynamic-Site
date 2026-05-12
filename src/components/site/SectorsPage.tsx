"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { SectorsSection } from "@/components/site/SectorsSection";

export default function SectorsPage() {
  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/hero-bg.png" alt="Industries served by Balaji Engineering Works" className="w-full h-full object-cover object-center opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/70 to-[#1A1A1A]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
          </div>
          <div className="container relative z-10 mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary mb-8 md:mb-10">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">Industries Across India</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 md:mb-8">
                Sectors<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">We Serve</span>
              </h1>
              <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
                From automotive to defense, we support critical industries with dependable sheet metal forming, cutting, fabrication, and component manufacturing.
              </p>
            </div>
          </div>
        </section>

        <SectorsSection title="Sectors We Support" />
      </div>
    </PageTransition>
  );
}

