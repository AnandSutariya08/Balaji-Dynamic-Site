"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Loader2,
  Settings,
  Shield,
  Zap,
} from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import type { Service } from "@/lib/firestore/types";
import { siteConfig } from "@/lib/site";

const capabilities = [
  { label: "Press Brake Capacity", value: "Up to 1200 tonnes" },
  { label: "Laser Cutting Support", value: "Industrial sheet and plate work" },
  { label: "Plate Rolling", value: "Heavy rolling for fabrication jobs" },
  { label: "Profile Cutting", value: "Plasma and profile-based cutting" },
  { label: "Sheet Processing", value: "Bending, cutting, and fabrication" },
  { label: "Project Support", value: "CAD-ready manufacturing response" },
] as const;

const materials = [
  { name: "Mild Steel (MS)", grades: "IS 2062 E250 / E350", thickness: "0.5 mm - 60 mm" },
  { name: "Stainless Steel", grades: "SS 304 / SS 316 / SS 316L", thickness: "0.5 mm - 25 mm" },
  { name: "Hot Rolled Steel", grades: "IS 2062 HR", thickness: "2 mm - 50 mm" },
  { name: "Cold Rolled Steel", grades: "IS 513 CR", thickness: "0.5 mm - 3 mm" },
  { name: "Structural Steel", grades: "IS 2062 E250B/C", thickness: "5 mm - 100 mm" },
] as const;

const reasons = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "We prioritize responsive quoting and practical production scheduling for urgent fabrication requirements.",
  },
  {
    icon: Shield,
    title: "Quality Focus",
    desc: "Inspection discipline and production consistency help reduce downstream issues for buyers and project teams.",
  },
  {
    icon: Layers,
    title: "One Supplier Flow",
    desc: "Cutting, bending, rolling, and fabrication support can be coordinated through one manufacturing partner.",
  },
  {
    icon: Settings,
    title: "CAD-Friendly Process",
    desc: "We can review DXF, DWG, STEP, and drawing-based requirements to speed up job discussion.",
  },
] as const;

export default function ServicesPage({
  initialServices = [],
}: {
  initialServices?: Service[];
}) {
  const { services, loading } = useServices(initialServices);

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <section className="relative flex min-h-[80vh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="h-full w-full bg-cover bg-center opacity-25"
              style={{ backgroundImage: "url('/service-cnc.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>
          <div className="container relative z-10 mx-auto px-4 pb-16 pt-28 md:pb-24 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-4xl"
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-primary md:mb-10">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.3em]">
                  {services.length} Core Capabilities | Heavy Fabrication | Gujarat
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl xl:text-8xl">
                Our
                <br />
                <span className="bg-gradient-to-r from-[#AC3C3C] to-[#e05555] bg-clip-text text-transparent">
                  Capabilities
                </span>
              </h1>
              <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-300 sm:text-xl">
                Explore the main fabrication and sheet metal processing services we
                support for industrial buyers in Surat, Gujarat, and across India.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="overflow-hidden bg-primary py-5 md:py-6">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee3 25s linear infinite" }}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-4 text-xs font-bold uppercase tracking-widest text-white/80 sm:text-sm md:gap-6"
              >
                <span>CNC LASER CUTTING</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>PLATE BENDING</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>SHEET ROLLING</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>PROFILE CUTTING</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>BASE PLATES</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>STRUCTURAL STEEL</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
              </div>
            ))}
          </div>
          <style>{`@keyframes marquee3 { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
        </section>

        <section className="bg-[#F7F5F1] py-8">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-32 text-sm text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading services from
              Firestore...
            </div>
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="group grid border-b border-black/8 lg:grid-cols-2"
              >
                <div
                  className={`relative h-[260px] overflow-hidden sm:h-[380px] lg:h-[500px] ${
                    index % 2 !== 0 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-4 top-4 text-[3rem] font-black leading-none text-white/5 md:left-8 md:top-8 md:text-[5rem]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-2 p-4 sm:grid-cols-4 md:gap-3 md:p-8">
                    {service.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-lg border border-white/10 bg-black/60 p-2 text-center backdrop-blur-sm md:rounded-xl md:p-3"
                      >
                        <div className="text-sm font-black text-primary md:text-lg">
                          {spec.value}
                        </div>
                        <div className="mt-0.5 text-[8px] font-bold uppercase tracking-widest text-zinc-400 md:mt-1 md:text-[9px]">
                          {spec.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`flex flex-col justify-center bg-[#F7F5F1] p-6 sm:p-10 md:p-12 xl:p-16 ${
                    index % 2 !== 0 ? "lg:order-1" : ""
                  }`}
                >
                  <span className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary md:mb-4">
                    {service.tagline}
                  </span>
                  <h2 className="mb-4 text-3xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-4xl xl:text-5xl md:mb-6">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-sm font-light leading-relaxed text-slate-600 md:mb-8 md:text-base">
                    {service.description}
                  </p>
                  <div className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mb-10 md:gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      className="h-12 w-full border-black/15 px-6 text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-black/5 sm:w-fit md:h-14 md:px-8"
                      asChild
                    >
                      <Link href={`/services/${service.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      className="h-12 w-full border-none bg-primary px-6 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(172,60,60,0.25)] hover:bg-primary/90 sm:w-fit md:h-14 md:px-8"
                      asChild
                    >
                      <Link href={`/contact?service=${service.id}`}>
                        Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </section>

        <section className="border-t border-black/8 bg-[#EDEAE4] py-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center md:mb-20">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Infrastructure
              </span>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:text-7xl">
                Production Readiness
              </h2>
            </div>
            <div className="grid gap-px bg-black/8 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-[#EDEAE4] p-7 transition-colors hover:bg-[#F7F5F1] md:p-10"
                >
                  <div className="mb-3 text-4xl font-black text-primary/20 transition-colors group-hover:text-primary/40 md:mb-4 md:text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h4 className="mb-2 text-lg font-black uppercase tracking-tight text-[#1A1A1A] md:text-xl">
                    {capability.label}
                  </h4>
                  <p className="text-sm font-light text-slate-500">
                    {capability.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#F7F5F1] py-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Material Support
                </span>
                <h2 className="mt-4 mb-6 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:mb-8 md:text-7xl">
                  What We
                  <br />
                  Process
                </h2>
                <p className="mb-10 text-base font-light leading-relaxed text-slate-600 md:mb-12 md:text-lg">
                  We work with common industrial steel categories and fabrication
                  materials used in sheet metal, structure, and project-based
                  manufacturing requirements.
                </p>
                <Button
                  size="lg"
                  className="h-12 w-full border-none bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(172,60,60,0.3)] hover:bg-primary/90 sm:w-auto md:h-14 md:px-10"
                  asChild
                >
                  <Link href="/contact">Discuss Your Material</Link>
                </Button>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-black/10">
                <table className="min-w-[480px] w-full text-left">
                  <thead>
                    <tr className="bg-[#EDEAE4]">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 md:px-6 md:py-5">
                        Material
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 md:px-6 md:py-5">
                        Grades
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 md:px-6 md:py-5">
                        Thickness
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material) => (
                      <tr
                        key={material.name}
                        className="group border-t border-black/8 transition-colors hover:bg-[#EDEAE4]"
                      >
                        <td className="px-4 py-4 text-sm font-bold text-[#1A1A1A] transition-colors group-hover:text-primary md:px-6 md:py-5">
                          {material.name}
                        </td>
                        <td className="px-4 py-4 text-xs font-mono text-slate-500 md:px-6 md:py-5">
                          {material.grades}
                        </td>
                        <td className="px-4 py-4 text-xs font-bold text-slate-600 md:px-6 md:py-5">
                          {material.thickness}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#EDEAE4] py-16 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {reasons.map((reason) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-6 transition-all hover:border-primary/40 hover:bg-primary/5 md:p-8"
                >
                  <reason.icon className="mb-5 h-7 w-7 text-primary md:mb-6 md:h-8 md:w-8" />
                  <h4 className="mb-2 text-lg font-black uppercase tracking-tight text-[#1A1A1A] md:mb-3 md:text-xl">
                    {reason.title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-slate-500">
                    {reason.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1C1C1C] py-20 md:py-40">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-primary/8 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-black uppercase tracking-tighter text-white sm:text-6xl md:mb-8 md:text-8xl">
                Ready to
                <br />
                Get Fabricating?
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg font-light text-zinc-400 md:mb-14 md:text-xl">
                Upload your drawings, discuss the specification, or contact us for a
                fabrication quote and production discussion.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="h-12 w-full border-none bg-primary px-10 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(172,60,60,0.4)] hover:bg-primary/90 sm:h-16 sm:w-auto sm:px-12 sm:text-base"
                  asChild
                >
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full border-white/20 px-10 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 sm:h-16 sm:w-auto sm:px-12"
                  asChild
                >
                  <Link href="/blog">Read Technical Insights</Link>
                </Button>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-xl font-black text-white md:mt-10 md:text-2xl">
                <Clock className="h-5 w-5 text-primary md:h-6 md:w-6" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
