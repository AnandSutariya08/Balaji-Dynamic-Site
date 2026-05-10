"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Factory,
  FileText,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { siteConfig } from "@/lib/site";

const timeline = [
  {
    year: "2001",
    title: "Foundation in Surat",
    desc: "Balaji Engineering Works began with a focused commitment to practical, dependable sheet metal fabrication for industrial buyers in Surat.",
  },
  {
    year: "2005",
    title: "CNC Bending Capability",
    desc: "The addition of CNC press brake infrastructure improved bending accuracy, repeatability, and project capacity.",
  },
  {
    year: "2010",
    title: "Heavy Plate Expansion",
    desc: "We expanded into heavier fabrication and profile-cutting work for larger industrial and infrastructure projects.",
  },
  {
    year: "2015",
    title: "Laser Cutting Growth",
    desc: "Advanced laser cutting allowed faster turnaround, cleaner edge quality, and more complex fabricated components.",
  },
  {
    year: "2020",
    title: "Stronger Regional Footprint",
    desc: "The business grew into a stronger regional manufacturing partner with broader client relationships and better production support.",
  },
  {
    year: "Today",
    title: "Modern Fabrication Partner",
    desc: "We continue improving response speed, project execution, and quality control for sheet metal and industrial fabrication buyers.",
  },
] as const;

const values = [
  {
    title: "Precision First",
    desc: "Every cut, bend, and fabrication job is executed with a focus on dimensional consistency and production reliability.",
    icon: Target,
  },
  {
    title: "Fast Response",
    desc: "We prioritize practical quoting, manufacturability review, and fast communication for urgent industrial requirements.",
    icon: Zap,
  },
  {
    title: "Single-Source Delivery",
    desc: "From cutting and bending to fabrication support, we help reduce vendor handoffs and project friction.",
    icon: Factory,
  },
  {
    title: "Long-Term Trust",
    desc: "Our goal is to become a reliable repeat partner, not just a one-time job shop.",
    icon: Users,
  },
] as const;

const credentials = [
  { title: "GST Registered", desc: siteConfig.gstNumber, icon: FileText },
  { title: "Established", desc: siteConfig.foundingDate, icon: Calendar },
  { title: "Business Type", desc: siteConfig.businessType, icon: Award },
  { title: "Manufacturing Focus", desc: "Industrial fabrication", icon: ShieldCheck },
] as const;

const storyPoints = [
  "Sheet metal bending and forming support for industrial projects",
  "CNC laser cutting and profile cutting capability",
  "Heavy fabrication and plate work for larger job requirements",
  "Manufacturing support for buyers across Surat, Gujarat, and wider India",
] as const;

export default function AboutPage() {
  useEffect(() => {
    const images = [
      "/service-fabrication.png",
      "/service-cnc.png",
      "/service-bending.png",
    ];

    images.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="h-full w-full bg-cover bg-center opacity-30"
              style={{ backgroundImage: "url('/service-fabrication.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/75 to-[#1A1A1A]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4 pb-20 pt-28 md:pb-24 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-5xl"
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-primary md:mb-10">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.3em]">
                  EST. {siteConfig.foundingDate} | {siteConfig.address.locality}
                </span>
              </div>
              <h1 className="mb-8 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:mb-10 md:text-6xl lg:text-7xl xl:text-8xl">
                Built on
                <br />
                <span className="bg-gradient-to-r from-[#AC3C3C] to-[#e05555] bg-clip-text text-transparent">
                  Steel.
                </span>
              </h1>
              <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-zinc-300 sm:text-xl md:mb-14 md:text-2xl">
                Balaji Engineering Works is a Surat-based manufacturer and service
                provider focused on sheet metal bending, CNC laser cutting, profile
                cutting, and fabrication support for industrial buyers.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
                <Button
                  size="lg"
                  className="h-12 border-none bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(172,60,60,0.5)] hover:bg-primary/90 sm:h-16 sm:px-10 sm:text-base"
                  asChild
                >
                  <Link href="/contact">Work With Us</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/20 px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 sm:h-16 sm:px-10 sm:text-base"
                  asChild
                >
                  <Link href="/services">
                    Our Capabilities <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F7F5F1] py-16 md:py-28">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <span className="font-display text-[15rem] font-black text-[#1A1A1A] md:text-[30rem]">
              24
            </span>
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-2 gap-6 md:gap-12 lg:grid-cols-4">
              {[
                { value: 20, suffix: "+", label: "Years of work", icon: Award },
                { value: 500, suffix: "+", label: "Projects supported", icon: Factory },
                { value: 25, suffix: "+", label: "People capacity", icon: Users },
                {
                  value: 25,
                  prefix: "Rs 5-",
                  suffix: " Cr",
                  label: "Turnover range",
                  icon: TrendingUp,
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-colors group-hover:bg-primary/20 md:mb-6 md:h-16 md:w-16">
                    <stat.icon className="h-5 w-5 text-primary md:h-7 md:w-7" />
                  </div>
                  <div className="mb-2 text-4xl font-black text-[#1A1A1A] sm:text-5xl md:mb-3 md:text-8xl">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="mb-3 h-0.5 w-8 bg-primary md:mb-4 md:w-10" />
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.25em]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#EDEAE4] py-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-24">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Company Story
                </span>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:mb-12 md:text-7xl">
                  Practical Fabrication
                  <br />
                  for Industrial Buyers
                </h2>
                <div className="space-y-5 text-base font-light leading-relaxed text-slate-600 md:text-lg">
                  <p>
                    Balaji Engineering Works serves buyers who need dependable sheet
                    metal processing, fabrication support, and responsive production
                    coordination from a Surat-based manufacturing partner.
                  </p>
                  <p>
                    Our work is centered around fabrication requirements where quality,
                    turnaround time, dimensional consistency, and supplier reliability
                    matter just as much as price.
                  </p>
                  <p>
                    We support projects across bending, cutting, rolling, and
                    fabrication with a focus on practical execution for real industrial
                    use cases.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:gap-6">
                  {storyPoints.map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5 md:space-y-6">
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <img
                    src="/service-fabrication.png"
                    alt="Balaji Engineering Works fabrication facility"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
                      {siteConfig.address.locality} Facility | {siteConfig.address.region}
                    </div>
                  </div>
                </motion.div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { label: "Nature", value: siteConfig.businessType },
                    { label: "GST No.", value: siteConfig.gstNumber },
                    { label: "Location", value: `${siteConfig.address.locality}, ${siteConfig.address.region}` },
                    { label: "Employees", value: siteConfig.employeeRange },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-black/8 bg-[#F7F5F1] p-4 md:p-5"
                    >
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        {item.label}
                      </div>
                      <div className="text-xs font-bold text-[#1A1A1A] sm:text-sm">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-black/8 bg-[#F7F5F1] py-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center md:mb-24">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Company Timeline
              </span>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:text-7xl">
                Growth Through Capability
              </h2>
            </div>
            <div className="relative">
              <div className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-black/8 lg:block" />
              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year + item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`relative flex items-center gap-6 py-6 md:gap-8 md:py-12 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                      <div className="group rounded-2xl border border-black/8 bg-[#EDEAE4] p-6 transition-colors hover:border-primary/30 md:p-8">
                        <div className="mb-2 text-4xl font-black text-black/8 transition-colors group-hover:text-primary/20 md:mb-3 md:text-6xl">
                          {item.year}
                        </div>
                        <h4 className="mb-2 text-lg font-black uppercase tracking-tight text-[#1A1A1A] md:mb-3 md:text-xl">
                          {item.title}
                        </h4>
                        <p className="text-sm font-light leading-relaxed text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="z-10 hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-[#F7F5F1] lg:flex">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                    </div>
                    <div className="hidden flex-1 lg:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#EDEAE4] py-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center md:mb-24">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Working Style
              </span>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:text-7xl">
                What Drives Us
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="group rounded-2xl border border-black/8 bg-[#F7F5F1] p-7 transition-all duration-500 hover:border-[#1C1C1C] hover:bg-[#1C1C1C] md:p-10"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-500 group-hover:border-primary group-hover:bg-primary md:mb-8 md:h-14 md:w-14">
                    <value.icon className="h-5 w-5 text-primary transition-colors duration-500 group-hover:text-white md:h-6 md:w-6" />
                  </div>
                  <h4 className="mb-3 text-lg font-black uppercase tracking-tight text-[#1A1A1A] transition-colors duration-500 group-hover:text-white md:mb-4 md:text-xl">
                    {value.title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-zinc-400">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/8 bg-[#F7F5F1] py-16 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center md:mb-20">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Credentials
              </span>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:text-6xl">
                Trust Signals
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {credentials.map((credential) => (
                <motion.div
                  key={credential.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="group rounded-2xl border border-black/10 bg-white p-6 text-center transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 md:p-8"
                >
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20 md:mb-6 md:h-14 md:w-14">
                    <credential.icon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                  </div>
                  <h4 className="mb-2 text-base font-black uppercase tracking-tight text-[#1A1A1A] md:text-xl">
                    {credential.title}
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">
                    {credential.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1C1C1C] py-20 md:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/8 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-black uppercase tracking-tighter text-white sm:text-6xl md:mb-8 md:text-8xl">
                Let&apos;s Build
                <br />
                Something Strong
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg font-light text-zinc-400 md:mb-14 md:text-xl">
                If you need a Surat-based fabrication partner for bending, cutting,
                or sheet metal project support, we are ready to discuss the job.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="h-12 w-full border-none bg-primary px-10 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(172,60,60,0.4)] hover:bg-primary/90 sm:h-16 sm:w-auto sm:px-12 sm:text-base"
                  asChild
                >
                  <Link href="/contact">Get a Quote</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full border-white/20 px-10 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 sm:h-16 sm:w-auto sm:px-12"
                  asChild
                >
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
