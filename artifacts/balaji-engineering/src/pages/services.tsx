import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Shield, Clock, Layers, Settings, Loader2 } from "lucide-react";
import { useServices } from "@/hooks/useServices";

const capabilities = [
  { label: "CNC Press Brakes", value: "5 machines, up to 800T" },
  { label: "Fiber Laser Cutters", value: "3000 × 6000mm bed" },
  { label: "Plate Rolling Machines", value: "4-roll, up to 60mm" },
  { label: "CNC Profile Cutters", value: "Oxy + Plasma" },
  { label: "Hydraulic Shears", value: "Up to 4000mm width" },
  { label: "Quality Lab", value: "CMM + Optical Inspection" },
];

const materials = [
  { name: "Mild Steel (MS)", grades: "IS 2062 E250 / E350", thickness: "0.5mm – 60mm" },
  { name: "Stainless Steel", grades: "SS 304 / SS 316 / SS 316L", thickness: "0.5mm – 25mm" },
  { name: "Hot Rolled Steel", grades: "IS 2062 HR", thickness: "2mm – 50mm" },
  { name: "Cold Rolled Steel", grades: "IS 513 CR", thickness: "0.5mm – 3mm" },
  { name: "Structural Steel", grades: "IS 2062 E250B/C", thickness: "5mm – 100mm" },
];

export default function Services() {
  const { services, loading } = useServices();

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">

        {/* HERO */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/service-cnc.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>
          <div className="container relative z-10 mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary mb-8 md:mb-10">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">{services.length} Core Capabilities · Heavy Fabrication · Gujarat</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 md:mb-8">
                Our<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">Capabilities</span>
              </h1>
              <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">Advanced CNC machinery. 20 years of expertise. End-to-end fabrication from raw plate to finished component — all under one roof in Surat, Gujarat.</p>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE — red strip */}
        <section className="py-5 md:py-6 bg-primary overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee3 25s linear infinite" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-6 px-4 text-xs sm:text-sm font-bold text-white/80 uppercase tracking-widest">
                <span>CNC LASER CUTTING</span><span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                <span>PLATE BENDING</span><span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                <span>SHEET ROLLING</span><span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                <span>PROFILE CUTTING</span><span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                <span>BASE PLATES</span><span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                <span>STRUCTURAL STEEL</span><span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
              </div>
            ))}
          </div>
          <style>{`@keyframes marquee3 { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
        </section>

        {/* SERVICES — Full-Width Alternating */}
        <section className="py-8 bg-[#F7F5F1]">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-32 text-slate-400 text-sm">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading services from Firestore…
            </div>
          ) : (
            services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 border-b border-black/8 group"
              >
                {/* Image */}
                <div className={`relative h-[260px] sm:h-[380px] lg:h-[500px] overflow-hidden ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 text-[3rem] md:text-[5rem] font-display font-black text-white/5 leading-none">{String(i + 1).padStart(2, "0")}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                    {service.specs.map((spec, j) => (
                      <div key={j} className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
                        <div className="text-sm md:text-lg font-display font-black text-primary">{spec.value}</div>
                        <div className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5 md:mt-1">{spec.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Content */}
                <div className={`p-6 sm:p-10 md:p-12 xl:p-16 flex flex-col justify-center bg-[#F7F5F1] ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 md:mb-4">{service.tagline}</span>
                  <h2 className="text-3xl sm:text-4xl xl:text-5xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mb-4 md:mb-6 leading-[0.9]">{service.title}</h2>
                  <p className="text-slate-600 font-light leading-relaxed mb-6 md:mb-8 text-sm md:text-base">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 mb-8 md:mb-10">
                    {service.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full sm:w-fit h-12 md:h-14 px-6 md:px-8 font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(172,60,60,0.25)] border-none text-sm" asChild>
                    <Link href={`/contact?service=${service.id}`}>Request Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </section>

        {/* MACHINE CAPABILITIES */}
        <section className="py-16 md:py-32 bg-[#EDEAE4] border-t border-black/8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 md:mb-20">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Infrastructure</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">Our Machinery</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8">
              {capabilities.map((cap, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.08 }} className="p-7 md:p-10 bg-[#EDEAE4] hover:bg-[#F7F5F1] transition-colors group">
                  <div className="text-4xl md:text-5xl font-display font-black text-primary/20 mb-3 md:mb-4 group-hover:text-primary/40 transition-colors">{String(i + 1).padStart(2, "0")}</div>
                  <h4 className="text-lg md:text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-2">{cap.label}</h4>
                  <p className="text-sm text-slate-500 font-light">{cap.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MATERIALS TABLE */}
        <section className="py-16 md:py-32 bg-[#F7F5F1] border-y border-black/8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Material Expertise</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4 mb-6 md:mb-8 leading-[0.9]">What We<br />Process</h2>
                <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">We work with a comprehensive range of ferrous metals and structural steels, covering the full spectrum of industrial fabrication needs.</p>
                <Button size="lg" className="h-12 md:h-14 px-8 md:px-10 font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_25px_rgba(172,60,60,0.3)] border-none w-full sm:w-auto" asChild>
                  <Link href="/contact">Discuss Your Material</Link>
                </Button>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-black/10">
                <table className="w-full text-left min-w-[480px]">
                  <thead>
                    <tr className="bg-[#EDEAE4]">
                      <th className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Material</th>
                      <th className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Grades</th>
                      <th className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Thickness</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((m, i) => (
                      <tr key={i} className="border-t border-black/8 hover:bg-[#EDEAE4] transition-colors group">
                        <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-[#1A1A1A] text-sm group-hover:text-primary transition-colors">{m.name}</td>
                        <td className="px-4 md:px-6 py-4 md:py-5 text-slate-500 text-xs font-mono">{m.grades}</td>
                        <td className="px-4 md:px-6 py-4 md:py-5 text-slate-600 text-xs font-bold">{m.thickness}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 md:py-28 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {[
                { icon: Zap, title: "Fast Turnaround", desc: "24–72 hour delivery on standard jobs. Urgent scheduling available." },
                { icon: Shield, title: "Quality Assured", desc: "First-article inspection, in-process checks, and final dimensional reports." },
                { icon: Layers, title: "All Under One Roof", desc: "Cutting, bending, rolling, and profiling — single-source, zero handoffs." },
                { icon: Settings, title: "CAD Ready", desc: "Submit DXF, DWG, or STEP files. We review for manufacturability at no charge." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 md:p-8 border border-black/8 rounded-2xl group hover:border-primary/40 hover:bg-primary/5 transition-all bg-[#F7F5F1]">
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary mb-5 md:mb-6" />
                  <h4 className="text-lg md:text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-40 bg-[#1C1C1C] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/8 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9]">Ready to<br />Get Fabricating?</h2>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-xl mx-auto mb-10 md:mb-14">Upload your drawings or describe your requirements. We respond within hours.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Button size="lg" className="h-12 sm:h-16 px-10 sm:px-12 text-sm sm:text-base font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_40px_rgba(172,60,60,0.4)] border-none w-full sm:w-auto" asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <a href="tel:+917942957640" className="text-xl md:text-2xl font-display font-black text-white hover:text-primary transition-colors">+91-7942957640</a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
