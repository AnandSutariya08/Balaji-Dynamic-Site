"use client";

import { useEffect } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2, Factory, Target, Users, Award, ShieldCheck,
  Zap, TrendingUp, ArrowRight, Calendar, FileText
} from "lucide-react";
import { PartnersClientsSection } from "@/components/site/PartnersClientsSection";

const timeline = [
  { year: "2001", title: "Founded in Navagam", desc: "Balaji Engineering Works is established with a single shearing machine and a vision to serve Surat's growing industrial corridor." },
  { year: "2005", title: "First CNC Investment", desc: "Commissioned our first CNC press brake — a pivotal leap that enabled us to serve automotive and infrastructure clients with repeatable precision." },
  { year: "2010", title: "Heavy Plate Division", desc: "Expanded into heavy-duty plate rolling and profile cutting, catering to the energy and marine sectors across Western India." },
  { year: "2015", title: "Laser Cutting Launch", desc: "Installed state-of-the-art fiber laser cutting systems capable of ±0.1mm tolerances, unlocking complex geometry manufacturing." },
  { year: "2020", title: "₹5-25 Cr Turnover Milestone", desc: "Crossed a landmark turnover milestone, growing our workforce to 25+ specialists serving India's biggest infrastructure firms." },
  { year: "2025", title: "Capacity Expansion", desc: "Expanded fabrication capacity and strengthened production support for larger industrial and infrastructure requirements." },
];

const certifications = [
  { title: "GST Registered", desc: "24BCUPS8314Q1ZK", icon: FileText },
  { title: "Manufacturer", desc: "Industrial Job Work and Supply", icon: Award },
  { title: "20+ Year Track Record", desc: "Established in 2001", icon: Calendar },
  { title: "Surat Facility", desc: "Kamrej, Navagam, Gujarat", icon: ShieldCheck },
];

const values = [
  { title: "Precision First", desc: "Every cut, bend, and weld is executed to the tightest possible tolerance. We don't compromise on accuracy.", icon: Target },
  { title: "Speed to Market", desc: "Fast turnaround is our promise. Advanced CNC automation enables rapid batch production without quality trade-offs.", icon: Zap },
  { title: "End-to-End Ownership", desc: "From CAD review to delivery, we manage every step. Single-source accountability you can rely on.", icon: Factory },
  { title: "Long-Term Partnerships", desc: "We don't just sell jobs — we build relationships. India's leading firms return to us project after project.", icon: Users },
];

export default function AboutPage() {
  // Preload images that are below the fold inside clip-path animations
  useEffect(() => {
    const imgs = ["/service-fabrication.png", "/service-cnc.png", "/service-bending.png"];
    imgs.forEach((src) => { const i = new Image(); i.src = src; });
  }, []);

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">

        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/service-fabrication.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/70 to-[#1A1A1A]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          </div>
          <div className="container relative z-10 mx-auto px-4 pt-28 pb-20 md:pt-32 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary mb-8 md:mb-10">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">EST. 2001 · NAVAGAM, SURAT</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 md:mb-10">
                About<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">Balaji Engineering Works</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl mb-10 md:mb-14">
                Learn how Balaji Engineering Works grew into a trusted Surat manufacturer for CNC laser cutting, sheet metal bending, plate rolling, steel cutting, and heavy fabrication.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                <Button size="lg" className="h-12 sm:h-16 px-8 sm:px-10 text-sm sm:text-base font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(172,60,60,0.5)] border-none" asChild>
                  <Link href="/contact">Work With Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 sm:h-16 px-8 sm:px-10 text-sm sm:text-base font-bold uppercase tracking-widest border-white/20 text-white hover:bg-white/10" asChild>
                  <Link href="/services">Our Capabilities <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 z-20">
            {[{ v: "20+", l: "Years" }, { v: "500+", l: "Projects" }, { v: "25+", l: "Experts" }].map((s, i) => (
              <div key={i} className="text-right">
                <div className="text-4xl font-display font-black text-white">{s.v}</div>
                <div className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <section className="py-8 bg-[#1C1C1C] overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee2 35s linear infinite" }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-8 px-4 text-2xl sm:text-3xl md:text-5xl font-display font-black text-white/15 uppercase">
                <span>PRECISION ENGINEERING</span><span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span>20+ YEARS LEGACY</span><span className="w-2 h-2 rounded-full bg-white/30 inline-block" />
                <span>SURAT, GUJARAT</span><span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span>GST REGISTERED</span><span className="w-2 h-2 rounded-full bg-white/30 inline-block" />
                <span>HEAVY FABRICATION</span><span className="w-2 h-2 rounded-full bg-primary inline-block" />
              </div>
            ))}
          </div>
          <style>{`@keyframes marquee2 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </section>

        {/* STATS ROW */}
        <section className="py-16 md:py-28 bg-[#F7F5F1] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-[15rem] md:text-[30rem] font-display font-black text-[#1A1A1A]">24</span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
              {[
                { value: 20, suffix: "+", label: "Years of Excellence", icon: Award },
                { value: 500, suffix: "+", label: "Projects Delivered", icon: Factory },
                { value: 25, suffix: "+", label: "Skilled Professionals", icon: Users },
                { value: 25, suffix: " Cr", prefix: "5-", label: "Annual Turnover Range", icon: TrendingUp },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div className="text-4xl sm:text-5xl md:text-8xl font-display font-black text-[#1A1A1A] mb-2 md:mb-3">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="h-0.5 w-8 md:w-10 bg-primary mb-3 md:mb-4" />
                  <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-slate-500 uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-16 md:py-32 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Origin Story</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4 mb-8 md:mb-12 leading-[0.9]">
                  From Workshop<br />to Powerhouse
                </h2>
                <div className="space-y-5 text-base md:text-lg text-slate-600 font-light leading-relaxed">
                  <p>Balaji Engineering Works began in 2001 and operates from Plot No. 11, 12, Soham Industrial Estate, NH 8, Kamrej, Navagam, Surat, Gujarat. We have grown by staying focused on dependable fabrication quality, delivery discipline, and practical engineering support.</p>
                  <p>Our infrastructure includes hydraulic shearing, CNC fiber laser cutting, CNC plasma and oxy-fuel profile cutting, press brake bending, plate rolling, punching, and fabrication capabilities that support both custom jobs and repeat production orders.</p>
                  <p>With GST registration 24BCUPS8314Q1ZK and a strong presence across Gujarat and Western India, we serve industries such as automotive, construction, energy, marine, HVAC, and general industrial manufacturing.</p>
                </div>
                <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {["Hydraulic and CNC Bending", "Fiber Laser Cutting Support", "Plate Rolling and Profile Cutting", "25,000 sq.ft. Unit", "Fabrication and Welding Setup", "Fast Quotation Response"].map((fact, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5 md:space-y-6">
                <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.2, ease: "easeInOut" }} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <img src="/service-fabrication.png" alt="Balaji Workshop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" fetchPriority="high" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xs font-bold tracking-[0.3em] text-zinc-300 uppercase">Soham Industrial Estate · Surat, Gujarat</div>
                  </div>
                </motion.div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { label: "Nature", value: "Manufacturer & Service Provider" },
                    { label: "GST No.", value: "24BCUPS8314Q1ZK" },
                    { label: "Location", value: "Kamrej, Navagam, Surat, Gujarat" },
                    { label: "Established", value: "2001" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 md:p-5 bg-[#F7F5F1] border border-black/8 rounded-xl">
                      <div className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-2">{item.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-[#1A1A1A] font-mono">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-16 md:py-32 bg-[#F7F5F1] border-y border-black/8 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 md:mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Our Journey</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">24 Years in the Making</h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/8 hidden lg:block" />
              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`relative flex items-center gap-6 md:gap-8 py-6 md:py-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="p-6 md:p-8 bg-[#EDEAE4] border border-black/8 rounded-2xl hover:border-primary/30 transition-colors group">
                        <div className="text-4xl md:text-6xl font-display font-black text-black/8 mb-2 md:mb-3 group-hover:text-primary/20 transition-colors">{item.year}</div>
                        <h4 className="text-lg md:text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-2 md:mb-3">{item.title}</h4>
                        <p className="text-slate-500 font-light leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden lg:flex w-16 h-16 rounded-full bg-[#F7F5F1] border-2 border-primary/40 items-center justify-center shrink-0 z-10">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-16 md:py-32 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 md:mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Core Philosophy</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">What Drives Us</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7 md:p-10 bg-[#F7F5F1] border border-black/8 rounded-2xl group hover:bg-[#1C1C1C] hover:border-[#1C1C1C] transition-all duration-500"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <v.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="text-lg md:text-xl font-display font-black text-[#1A1A1A] group-hover:text-white uppercase tracking-tight mb-3 md:mb-4 transition-colors duration-500">{v.title}</h4>
                  <p className="text-slate-500 group-hover:text-zinc-400 font-light leading-relaxed text-sm transition-colors duration-500">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-16 md:py-32 bg-[#F7F5F1] relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              {[
                { label: "Mission", text: "Our mission is to deliver high-quality, precision-engineered sheet metal forming products and services that exceed customer expectations. Through continuous improvement, cutting-edge technology, and a commitment to sustainability, we aim to enhance the efficiency and competitiveness of industries worldwide." },
                { label: "Vision", text: "To be the global leader in innovative and sustainable sheet metal forming solutions, driving progress in industries through precision, efficiency, and technological advancement." }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 md:p-12 bg-[#EDEAE4] border border-black/8 rounded-2xl group hover:border-primary/40 transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
                  <div className="text-5xl md:text-6xl font-display font-black text-black/5 mb-4">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-5 md:mb-6">{card.label}</h3>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="py-16 md:py-28 bg-[#EDEAE4] border-t border-black/8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 md:mb-20">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Credentials</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">Trust & Compliance</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {certifications.map((cert, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="p-6 md:p-8 border border-black/10 rounded-2xl text-center group hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 bg-[#F7F5F1]">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <cert.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h4 className="text-base md:text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-2">{cert.title}</h4>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PartnersClientsSection variant="full" />

        <section className="py-16 md:py-24 bg-[#F7F5F1] border-t border-black/8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Popular Services</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">
                  Explore What We Manufacture
                </h2>
              </div>
              <Button variant="outline" className="border-black/20 text-[#1A1A1A] hover:bg-black/5 font-bold uppercase tracking-widest w-full md:w-auto" asChild>
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "CNC Plate Bending", href: "/services/cnc-plate-bending" },
                { title: "CNC Laser Cutting", href: "/services/cnc-laser-cutting" },
                { title: "Plate Rolling", href: "/services/plate-rolling" },
                { title: "Punching", href: "/services/punching" },
              ].map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6 transition-colors hover:border-primary/40 hover:bg-white"
                >
                  <h3 className="text-lg font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    {service.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-40 bg-[#1C1C1C] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/8 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9]">
                Let's Build<br />Something Massive
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-xl mx-auto mb-10 md:mb-14">Our engineering team is ready to take on your most complex fabrication challenges.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Button size="lg" className="h-12 sm:h-16 px-10 sm:px-12 text-sm sm:text-base font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_40px_rgba(172,60,60,0.4)] border-none w-full sm:w-auto" asChild>
                  <Link href="/contact">Get a Quote</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 sm:h-16 px-10 sm:px-12 border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest w-full sm:w-auto" asChild>
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


