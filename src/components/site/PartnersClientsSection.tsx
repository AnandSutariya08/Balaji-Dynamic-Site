"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rawMaterialPartners, valuableClients, type CompanyEntry } from "@/lib/partnersClientsData";

function monogram(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}${words[2]?.[0] ?? ""}`.toUpperCase();
}

function LogoMark({ company }: { company: CompanyEntry }) {
  return (
    <div className="group flex items-center justify-center h-[56px] sm:h-[70px] md:h-[88px] lg:h-[98px]">
      {company.logo ? (
        <img
          src={company.logo}
          alt={company.name}
          className="h-[36px] sm:h-[45px] md:h-[55px] lg:h-[60px] w-[120px] sm:w-[188px] md:w-[238px] lg:w-[263px] object-contain opacity-95 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:drop-shadow-[0_10px_22px_rgba(0,0,0,0.12)]"
          loading="lazy"
        />
      ) : (
        <div className="text-[11px] md:text-xs font-black tracking-[0.28em] uppercase text-[#1A1A1A]/75 group-hover:text-[#1A1A1A] transition-colors group-hover:-translate-y-0.5">
          {monogram(company.name)}
        </div>
      )}
      <div className="sr-only">{company.name}</div>
    </div>
  );
}

function splitIntoTwoRows(items: CompanyEntry[]) {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

function MarqueeRow({
  items,
  direction,
  durationSeconds,
  durationSecondsMobile,
}: {
  items: CompanyEntry[];
  direction: "ltr" | "rtl";
  durationSeconds: number;
  durationSecondsMobile?: number;
}) {
  // Use two identical tracks that continuously chase each other (true infinite loop without visible restart)
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#F7F5F1] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#F7F5F1] to-transparent z-10" />

      <div
        className="relative"
        style={{
          ["--marquee-duration" as never]: `${durationSeconds}s`,
          ["--marquee-duration-mobile" as never]: durationSecondsMobile
            ? `${durationSecondsMobile}s`
            : undefined,
        }}
      >
        <div
          className={[
            "flex w-max min-w-full items-center justify-around gap-2 sm:gap-8 lg:gap-12 whitespace-nowrap will-change-transform transform-gpu",
            direction === "ltr" ? "marquee-ltr-a" : "marquee-rtl-a",
          ].join(" ")}
        >
          {items.map((company, index) => (
            <div key={`${company.name}-a-${index}`} className="shrink-0">
              <LogoMark company={company} />
            </div>
          ))}
        </div>

        <div
          className={[
            "absolute top-0 left-0 flex w-max min-w-full items-center justify-around gap-2 sm:gap-8 lg:gap-12 whitespace-nowrap will-change-transform transform-gpu",
            direction === "ltr" ? "marquee-ltr-b" : "marquee-rtl-b",
          ].join(" ")}
        >
          {items.map((company, index) => (
            <div key={`${company.name}-b-${index}`} className="shrink-0">
              <LogoMark company={company} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeRtlA { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-100%,0,0); } }
        @keyframes marqueeRtlB { 0% { transform: translate3d(100%,0,0); } 100% { transform: translate3d(0,0,0); } }
        @keyframes marqueeLtrA { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(100%,0,0); } }
        @keyframes marqueeLtrB { 0% { transform: translate3d(-100%,0,0); } 100% { transform: translate3d(0,0,0); } }

        .marquee-rtl-a { animation: marqueeRtlA var(--marquee-duration, 34s) linear infinite; }
        .marquee-rtl-b { animation: marqueeRtlB var(--marquee-duration, 34s) linear infinite; }
        .marquee-ltr-a { animation: marqueeLtrA var(--marquee-duration, 34s) linear infinite; }
        .marquee-ltr-b { animation: marqueeLtrB var(--marquee-duration, 34s) linear infinite; }

        @media (max-width: 640px) {
          .marquee-rtl-a, .marquee-rtl-b, .marquee-ltr-a, .marquee-ltr-b {
            animation-duration: var(--marquee-duration-mobile, var(--marquee-duration, 34s));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-rtl-a, .marquee-rtl-b, .marquee-ltr-a, .marquee-ltr-b { animation: none; transform: none; position: static; }
        }
      `}</style>
    </div>
  );
}

function ReducedMotionGrid({ items }: { items: CompanyEntry[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-10 lg:gap-y-12 items-center">
      {items.map((company, index) => (
        <motion.div
          key={`${company.name}-${index}`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.015, 0.18), duration: 0.3 }}
          viewport={{ once: true, margin: "-10%" }}
          className="flex items-center justify-center"
        >
          <LogoMark company={company} />
        </motion.div>
      ))}
    </div>
  );
}

export function PartnersClientsSection({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const partners = variant === "compact" ? rawMaterialPartners.slice(0, 6) : rawMaterialPartners;
  const clients = variant === "compact" ? valuableClients.slice(0, 10) : valuableClients;
  const [clientsRowA, clientsRowB] = splitIntoTwoRows(clients);

  return (
    <section id="partners-clients" className="py-16 md:py-28 bg-[#F7F5F1] border-y border-black/8">
      <div className="container mx-auto px-4 space-y-12 md:space-y-16">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-5 md:mb-7">
            <div className="text-primary text-[10px] md:text-xs font-black tracking-[0.35em] uppercase mb-3">OUR CLIENTS</div>
            <h2 className="text-[clamp(1.55rem,4.4vw,3.2rem)] font-display font-black text-[#1A1A1A] uppercase tracking-tight leading-[0.95]">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="pt-10 md:pt-12 border-t border-black/10">
            <div className="space-y-4 sm:space-y-5">
              <MarqueeRow items={clientsRowA} direction="ltr" durationSeconds={30} durationSecondsMobile={18} />
              <MarqueeRow items={clientsRowB} direction="rtl" durationSeconds={30} durationSecondsMobile={18} />
            </div>
            <div className="hidden motion-reduce:block pt-6">
              <ReducedMotionGrid items={clients} />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
          <div className="mb-5 md:mb-7">
            <div className="text-primary text-[10px] md:text-xs font-black tracking-[0.35em] uppercase mb-3">OUR PARTNERS</div>
            <h2 className="text-[clamp(1.55rem,4.4vw,3.2rem)] font-display font-black text-[#1A1A1A] uppercase tracking-tight leading-[0.95]">
              Trusted Raw Material Partners
            </h2>
          </div>

          <div className="pt-10 md:pt-12 border-t border-black/10">
            <MarqueeRow items={partners} direction="ltr" durationSeconds={24} durationSecondsMobile={14} />
            <div className="hidden motion-reduce:block pt-6">
              <ReducedMotionGrid items={partners} />
            </div>
          </div>
        </motion.div>

        {variant === "compact" && (
          <div className="pt-1">
            <Button variant="outline" className="border-black/20 text-[#1A1A1A] hover:bg-black/5 font-bold uppercase tracking-widest w-full md:w-auto" asChild>
              <Link href="/about#partners-clients">
                View Full List <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
