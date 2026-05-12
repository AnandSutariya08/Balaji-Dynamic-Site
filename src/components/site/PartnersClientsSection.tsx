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

function LogoCard({ company }: { company: CompanyEntry }) {
  return (
    <div className="h-20 rounded-xl border border-black/10 bg-white px-4 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-[1.02] hover:shadow-[0_0_26px_rgba(172,60,60,0.18)] transition-all duration-300">
      {company.logo ? (
        <img
          src={company.logo}
          alt={company.name}
          className="h-10 w-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="w-full flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] font-black tracking-wider shrink-0">
            {monogram(company.name)}
          </div>
          <div className="text-sm md:text-[15px] font-bold text-[#1A1A1A] uppercase tracking-wide line-clamp-2">
            {company.name}
          </div>
        </div>
      )}
      <div className="sr-only">
        {company.name}
      </div>
    </div>
  );
}

function MobileMarquee({ items }: { items: CompanyEntry[] }) {
  const track = [...items, ...items];
  return (
    <div className="md:hidden overflow-hidden">
      <div className="flex gap-3 whitespace-nowrap marquee-track">
        {track.map((item, index) => (
          <div key={`${item.name}-${index}`} className="w-[240px] shrink-0">
            <LogoCard company={item} />
          </div>
        ))}
      </div>
      <style>{`
        .marquee-track {
          animation: partnersMarquee 26s linear infinite;
        }
        @keyframes partnersMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
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

  return (
    <section id="partners-clients" className="py-16 md:py-28 bg-[#F7F5F1] border-y border-black/8">
      <div className="container mx-auto px-4 space-y-12 md:space-y-16">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-5 md:mb-7">
            <div className="text-primary text-[10px] md:text-xs font-black tracking-[0.35em] uppercase mb-3">OUR CLIENTS</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#1A1A1A] uppercase tracking-tight">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {clients.map((item, index) => (
              <motion.div key={`${item.name}-${index}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <LogoCard company={item} />
              </motion.div>
            ))}
          </div>
          <MobileMarquee items={clients} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
          <div className="mb-5 md:mb-7">
            <div className="text-primary text-[10px] md:text-xs font-black tracking-[0.35em] uppercase mb-3">OUR PARTNERS</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#1A1A1A] uppercase tracking-tight">
              Trusted Raw Material Partners
            </h2>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#EDEAE4] p-4 md:p-6">
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {partners.map((item, index) => (
                <motion.div key={`${item.name}-${index}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                  <LogoCard company={item} />
                </motion.div>
              ))}
            </div>
            <MobileMarquee items={partners} />
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
