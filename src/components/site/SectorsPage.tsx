"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { SectorsSection } from "@/components/site/SectorsSection";
import { PageHero } from "@/components/site/PageHero";

export default function SectorsPage() {
  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <PageHero
          imageSrc="/hero-bg.png"
          imageAlt="Industries served by Balaji Engineering Works"
          pill={(
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                Industries Across India
              </span>
            </div>
          )}
          title={(
            <>
              Sectors
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">
                We Serve
              </span>
            </>
          )}
          description={(
            <>
              From automotive to defense, we support critical industries with dependable sheet metal forming,
              cutting, fabrication, and component manufacturing.
            </>
          )}
          stats={[
            { v: "20+", l: "Years" },
            { v: "500+", l: "Projects" },
            { v: "India", l: "Coverage" },
          ]}
        />

        <SectorsSection title="Sectors We Support" />
      </div>
    </PageTransition>
  );
}
