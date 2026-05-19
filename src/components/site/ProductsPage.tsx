"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Boxes, Factory, Loader2, Ruler, ShieldCheck } from "lucide-react";

import { PageTransition } from "@/components/layout/PageTransition";
import { useProducts } from "@/hooks/useProducts";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/firestore/types";

const highlights = [
  { icon: Boxes, title: "Drawing-Based Production", desc: "Products aligned to dimensions, hole patterns, and fabrication details required by project drawings." },
  { icon: Factory, title: "Integrated Fabrication", desc: "Cutting, bending, punching, welding, and assembly support from one Surat manufacturing team." },
  { icon: Ruler, title: "Project Fit-Up", desc: "Every product is built for installation practicality, dimensional consistency, and coordination with site work." },
  { icon: ShieldCheck, title: "Industrial Durability", desc: "Designed for plant, structure, warehouse, and heavy-duty industrial usage conditions." },
];

const EMPTY_PRODUCTS: Product[] = [];

export default function ProductsPage({
  initialProducts = EMPTY_PRODUCTS,
}: {
  initialProducts?: Product[];
}) {
  const { products, loading } = useProducts(initialProducts);

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <PageHero
          imageSrc="/product-base-plates.png"
          imageAlt="Industrial steel products manufactured by Balaji Engineering Works in Surat"
          pill={(
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-primary">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] sm:text-[10px]">
                {products.length} Product Categories - Surat Manufacturing
              </span>
            </div>
          )}
          title={(
            <>
              Industrial
              <br />
              <span className="bg-gradient-to-r from-[#AC3C3C] to-[#e05555] bg-clip-text text-transparent">
                Products
              </span>
            </>
          )}
          description={(
            <>
              Explore fabricated and industrial-use products from Balaji Engineering Works including gutters, foundation bolts,
              base plates, purlins, perforated sheets, decking sheets, walkway planks, and steel pallets.
            </>
          )}
          stats={[
            { v: products.length.toString(), l: "Products" },
            { v: "25+", l: "Years" },
            { v: "Surat", l: "Facility" },
          ]}
        />

        <section className="overflow-hidden bg-primary py-5 md:py-6">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee-products 25s linear infinite" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 text-xs font-bold uppercase tracking-widest text-white/80 sm:text-sm md:gap-6">
                <span>GUTTERS</span><span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>FOUNDATION BOLTS</span><span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>BASE PLATES</span><span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>Z/C PURLINS</span><span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>PERFORATED SHEETS</span><span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>STEEL PALLETS</span><span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
              </div>
            ))}
          </div>
          <style>{`@keyframes marquee-products { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
        </section>

        <section className="border-y border-black/8 bg-[#EDEAE4] py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-6"
                >
                  <item.icon className="h-7 w-7 text-primary" />
                  <h2 className="mt-5 text-xl font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F1] py-6">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-24 text-slate-400 text-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading products from Firestore...
            </div>
          ) : (
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="group grid items-center border-b border-black/8 lg:grid-cols-2"
              >
                <div className={`relative flex h-[220px] items-center justify-center overflow-hidden bg-[#DDD6CE] sm:h-[280px] lg:h-[340px] ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <img
                    src={product.image}
                    alt={`${product.title} manufactured by Balaji Engineering Works in Surat`}
                    className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <div className="absolute left-4 top-4 text-[3rem] font-display font-black leading-none text-white/6 md:left-8 md:top-8 md:text-[5rem]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className={`flex justify-center bg-[#F7F5F1] p-5 sm:p-8 md:p-10 xl:p-12 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div className="flex w-full max-w-2xl flex-col justify-center">
                    <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-primary md:mb-3">
                      {product.tagline}
                    </span>
                    <h2 className="mb-3 text-[clamp(1.5rem,4vw,2.8rem)] font-display font-black uppercase tracking-tighter leading-[0.95] text-[#1A1A1A] md:mb-4">
                      {product.title}
                    </h2>
                    <p className="mb-5 max-w-xl text-sm font-light leading-relaxed text-slate-600 md:mb-6">
                      {product.description}
                    </p>

                    <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mb-6 md:gap-3">
                      {product.specs.slice(0, 2).map((spec) => (
                        <div key={`${product.id}-${spec.label}`} className="rounded-lg border border-black/8 bg-[#EDEAE4] p-3 text-center md:rounded-xl md:p-4">
                          <div className="text-sm font-display font-black text-primary md:text-base">
                            {spec.value}
                          </div>
                          <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-500 md:text-[10px]">
                            {spec.label}
                          </div>
                        </div>
                      ))}
                    </div>



                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button className="h-12 w-full border-none bg-primary px-6 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(172,60,60,0.25)] hover:bg-primary/90 sm:w-fit md:h-14 md:px-8" asChild>
                        <Link href={`/products/${product.id}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-12 w-full border-black/15 px-6 text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-black/5 sm:w-fit md:h-14 md:px-8" asChild>
                        <Link href={`/contact?service=${product.id}`}>Request Quote</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </section>

        <section className="bg-[#1C1C1C] py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter text-white md:text-7xl">
              Need a Product
              <br />
              Built for Your Project?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-zinc-400 md:text-xl">
              Share your drawing, quantity, material, and application. Our Surat team will review the requirement and reply with a practical quotation.
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
    </PageTransition>
  );
}
