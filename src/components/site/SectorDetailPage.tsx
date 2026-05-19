"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, CheckCircle2, Wrench, Package, Award, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import type { Sector } from "@/lib/sectorsData";

export default function SectorDetailPage({ sector }: { sector: Sector }) {
  const heroImage = sector.image;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <PageHero
          imageSrc={heroImage}
          imageAlt={`${sector.name} sheet metal fabrication — Balaji Engineering Works`}
          pill={(
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                Sector Focus
              </span>
            </div>
          )}
          title={(
            <>
              {sector.name.split(" ").slice(0, -1).join(" ")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">
                {sector.name.split(" ").slice(-1)}
              </span>
            </>
          )}
          description={<>{sector.headline}</>}
          stats={[
            { v: "25+", l: "Years" },
            { v: "500+", l: "Projects" },
            { v: "Pan-India", l: "Supply" },
          ]}
        />

        <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
          <div className="mb-8">
            <Link
              href="/sectors"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#AC3C3C] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to All Sectors
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-[#1A1A1A] mb-6">
                  About This Sector
                </h2>
                <div className="space-y-4">
                  {sector.body.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    Fabrication Services
                  </h2>
                </div>
                <ul className="space-y-3">
                  {sector.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm md:text-base text-slate-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    Typical Applications
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sector.applications.map((app, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-black/8 bg-[#EDEAE4] px-4 py-3 text-sm text-slate-700 font-medium"
                    >
                      {app}
                    </div>
                  ))}
                </div>
              </motion.div>

              {sector.faqs && sector.faqs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-display font-black uppercase tracking-tight text-[#1A1A1A] mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {sector.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-black/8 bg-[#EDEAE4] overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                          aria-expanded={openFaq === i}
                        >
                          <span className="text-sm md:text-base font-semibold text-[#1A1A1A] leading-snug">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 shrink-0 text-primary transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openFaq === i && (
                            <motion.div
                              key="answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 text-sm md:text-base leading-relaxed text-slate-600">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    Why Choose Us
                  </h3>
                </div>
                <ul className="space-y-4">
                  {sector.whyUs.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[9px] font-black text-primary">{i + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">{point}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="rounded-2xl border border-primary/30 bg-primary/5 p-6"
              >
                <h3 className="text-base font-display font-black uppercase tracking-tight text-[#1A1A1A] mb-2">
                  Get a Quote
                </h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Share your drawings or describe your requirement. We typically respond within 4–8 business hours.
                </p>
                <Button className="w-full bg-[#AC3C3C] hover:bg-[#c94848] text-white font-bold uppercase tracking-widest rounded-xl" asChild>
                  <Link href="/contact">
                    Request a Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full mt-3 border-black/20 text-[#1A1A1A] hover:bg-black/5 font-bold uppercase tracking-widest rounded-xl" asChild>
                  <Link href="/services">View All Services</Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6"
              >
                <h3 className="text-sm font-display font-black uppercase tracking-tight text-[#1A1A1A] mb-4">
                  Other Sectors We Serve
                </h3>
                <Link
                  href="/sectors"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#AC3C3C] hover:text-[#c94848] transition-colors"
                >
                  View All 11 Sectors <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <section className="bg-[#1A1A1A] py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#AC3C3C] mb-4">
              Ready to Work Together
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-6">
              Need Parts for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">
                {sector.name}?
              </span>
            </h2>
            <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Send us your drawings or describe your requirement. Our team reviews every inquiry and responds with a detailed quote within 4–8 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#AC3C3C] hover:bg-[#c94848] text-white font-bold uppercase tracking-widest rounded-xl px-8" asChild>
                <Link href="/contact">
                  Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest rounded-xl px-8" asChild>
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
