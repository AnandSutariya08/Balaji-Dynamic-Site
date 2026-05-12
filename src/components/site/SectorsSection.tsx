"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Car, Plane, Building2, Zap, Factory, Cog, Hammer, Shield, Palette, Anchor, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectorsData } from "@/lib/sectorsData";

export function SectorsSection({
  compact = false,
  title = "Industries We Serve",
}: {
  compact?: boolean;
  title?: string;
}) {
  const items = compact ? sectorsData.slice(0, 6) : sectorsData;
  const iconMap = {
    car: Car,
    plane: Plane,
    building2: Building2,
    zap: Zap,
    factory: Factory,
    cog: Cog,
    hammer: Hammer,
    shield: Shield,
    palette: Palette,
    anchor: Anchor,
    train: Train,
  } as const;

  return (
    <section className="py-16 md:py-32 bg-[#F7F5F1]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-20">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Sectors</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">
              {title}
            </h2>
          </div>
          {compact && (
            <Button variant="outline" className="border-black/20 text-[#1A1A1A] hover:bg-black/5 font-bold uppercase tracking-widest w-full md:w-auto" asChild>
              <Link href="/sectors">View All Sectors</Link>
            </Button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {items.map((sector, i) => (
            <motion.article
              key={sector.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border border-black/8 bg-[#EDEAE4] p-7 md:p-8 hover:border-primary/40 hover:bg-[#F7F5F1] transition-all"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 md:mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                {(() => {
                  const Icon = iconMap[sector.icon as keyof typeof iconMap] ?? Factory;
                  return <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />;
                })()}
              </div>
              <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                {sector.name}
              </h3>
              <p className="mt-3 text-sm md:text-base font-light leading-relaxed text-slate-600">
                {sector.description}
              </p>
            </motion.article>
          ))}
        </div>

        {compact && (
          <div className="mt-8 md:hidden">
            <Button variant="outline" className="w-full border-black/20 text-[#1A1A1A] hover:bg-black/5 font-bold uppercase tracking-widest" asChild>
              <Link href="/sectors">View All Sectors <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
