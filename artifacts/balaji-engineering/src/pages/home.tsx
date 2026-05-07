import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronRight, ChevronLeft, CheckCircle2, Factory, Zap, ShieldCheck, Target, Award, Users, TrendingUp, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const services = [
    { title: "Bending", image: "/service-bending.png", subs: ["Press Brake", "High Tonnage", "Complex Angles"] },
    { title: "Sheet Bending", image: "/service-bending.png", subs: ["MS & SS", "Precision Bends", "Custom Profiles"] },
    { title: "Steel Cutting", image: "/service-steel-cutting.png", subs: ["Plasma Cutting", "Gas Cutting", "High Accuracy"] },
    { title: "Plate Bending", image: "/service-plate-bending.png", subs: ["Heavy Duty", "Structural Steel", "Custom Radii"] },
    { title: "Cutting Services", image: "/service-cnc.png", subs: ["Laser Cutting", "Profile Cutting", "Nesting Optimization"] },
    { title: "Base Plate", image: "/service-base-plates.png", subs: ["Industrial Base", "Machined Finish", "Standard Sizes"] },
    { title: "Plate Profile Cutting", image: "/service-profile.png", subs: ["Intricate Designs", "Batch Production", "Material Saving"] },
    { title: "Sheet Metal Cutting", image: "/service-cnc.png", subs: ["CNC Accuracy", "Thin & Thick Sheets", "Rapid Turnaround"] },
  ];

  const scrollCardIntoView = useCallback((index: number) => {
    const container = servicesScrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement | undefined;
    if (!card) return;
    const scrollLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, services.length - 1));
    setActiveService(clamped);
    scrollCardIntoView(clamped);
  }, [services.length, scrollCardIntoView]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveService((prev) => {
        const next = (prev + 1) % services.length;
        scrollCardIntoView(next);
        return next;
      });
    }, 3000);
  }, [services.length, scrollCardIntoView]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  // Preload below-fold images so they're ready before the user scrolls
  useEffect(() => {
    const imgs = ["/service-fabrication.png", "/service-bending.png", "/service-steel-cutting.png", "/service-plate-bending.png", "/service-cnc.png"];
    imgs.forEach((src) => { const i = new Image(); i.src = src; });
  }, []);

  const handlePrev = () => {
    const prev = (activeService - 1 + services.length) % services.length;
    scrollToIndex(prev);
    resetAutoPlay();
  };

  const handleNext = () => {
    const next = (activeService + 1) % services.length;
    scrollToIndex(next);
    resetAutoPlay();
  };

  useEffect(() => {
    if (aboutTextRef.current) {
      const lines = aboutTextRef.current.querySelectorAll('.reveal-line');
      lines.forEach((line) => {
        gsap.fromTo(line,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, []);

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-[#F7F5F1]">
        {/* Section 1: Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-bg.png"
              alt="Precision Metal Fabrication"
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic gradient — dark left for text, reveal image on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            {/* Subtle red accent glow bottom-left */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-primary/15 blur-[100px] rounded-full" />
          </div>

          <div className="container relative z-10 mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                {/* Badge */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 mb-3 md:mb-4 lg:mb-5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase">EST. 2001 · NAVAGAM, SURAT · GUJARAT</span>
                </motion.div>

                {/* Headline */}
                <h1
                  className="font-display font-black uppercase tracking-tighter leading-[0.88] text-white mb-3 md:mb-4 lg:mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                >
                  <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.75, ease: "easeOut" }}
                    className="block">STEEL</motion.span>
                  <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.32, duration: 0.75, ease: "easeOut" }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e05555] via-[#AC3C3C] to-[#c44040]">PRECISION</motion.span>
                  <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.44, duration: 0.75, ease: "easeOut" }}
                    className="block text-white">MASTERS.</motion.span>
                </h1>

                {/* Sub-text */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.7 }}
                  className="text-sm sm:text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-xl mb-4 md:mb-5 lg:mb-6">
                  CNC laser cutting, press bending &amp; plate rolling — engineered to ±0.1mm. Trusted by India's top infrastructure firms since 2001.
                </motion.p>

                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-black uppercase tracking-widest bg-primary hover:bg-[#c44040] text-white shadow-[0_0_40px_rgba(172,60,60,0.55)] border-none transition-all duration-300" asChild>
                    <Link href="/services">Explore Services</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-black uppercase tracking-widest border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm" asChild>
                    <Link href="/contact">Request Quote</Link>
                  </Button>
                </motion.div>

                {/* Hero stats row */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.7 }}
                  className="flex items-center gap-5 sm:gap-8 mt-5 md:mt-6 lg:mt-8 pt-4 md:pt-5 lg:pt-6 border-t border-white/15">
                  {[
                    { v: "20+", l: "Years" },
                    { v: "500+", l: "Projects" },
                    { v: "±0.1mm", l: "Accuracy" },
                    { v: "800T", l: "Press Brake" },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-base sm:text-2xl md:text-2xl lg:text-3xl font-display font-black text-white leading-none">{s.v}</div>
                      <div className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mt-1">{s.l}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          
        </section>

        {/* Section 2: Marquee Ticker */}
        <section className="py-8 md:py-12 bg-[#1C1C1C] overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-8 px-4 text-2xl sm:text-4xl md:text-6xl font-display font-black text-white/20 uppercase">
                <span>SHEET METAL BENDING</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary" />
                <span>CNC LASER CUTTING</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/30" />
                <span>PLATE ROLLING</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary" />
                <span>HEAVY FABRICATION</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/30" />
                <span>STEEL CUTTING</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary" />
                <span>PRECISION PUNCHING</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/30" />
                <span>STRUCTURAL WELDING</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary" />
                <span>PROFILE CUTTING</span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-marquee { animation: marquee 40s linear infinite; }
          `}</style>
        </section>

        {/* Section 3: Stats */}
        <section className="py-16 md:py-32 bg-[#F7F5F1] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
            <span className="text-[20rem] md:text-[40rem] font-display font-black text-[#1A1A1A]">25</span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
              {[
                { value: 20, label: "Years Experience", suffix: "+", icon: Target },
                { value: 500, label: "Projects Completed", suffix: "+", icon: Factory },
                { value: 25, label: "Skilled Employees", suffix: "+", icon: Users },
                { value: 25, label: "Cr. Turnover", suffix: " Cr", prefix: "₹ 5-", icon: TrendingUp }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl font-display font-black text-[#1A1A1A] mb-3 md:mb-4 whitespace-nowrap">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="h-1 w-10 md:w-12 bg-primary mb-4 md:mb-6" />
                  <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: About Teaser */}
        <section className="py-16 md:py-32 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <img src="/service-fabrication.png" alt="Fabrication Excellence" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>

              <div ref={aboutTextRef} className="space-y-8 md:space-y-12">
                <div className="reveal-line">
                  <span className="text-primary font-bold tracking-[0.3em] uppercase">Who We Are</span>
                  <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">
                    Two Decades of<br />Steel & Precision
                  </h2>
                </div>
                <div className="space-y-5 text-lg md:text-xl text-slate-600 font-light leading-relaxed reveal-line">
                  <p>Established in 2001, Balaji Engineering Works has evolved from a small workshop into a premier industrial power-house in Surat, Gujarat.</p>
                  <p>We specialize in heavy-duty shearing, CNC laser cutting, and complex plate fabrication. Our commitment to accuracy and turnaround time has made us the trusted partner for India's leading infrastructure and automotive firms.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 reveal-line">
                  {["ISO Certified Standards", "Advanced CNC Tech", "Expert Engineering", "End-to-End Solutions"].map((fact, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">{fact}</span>
                    </div>
                  ))}
                </div>
                <div className="reveal-line pt-4 md:pt-8">
                  <Button size="lg" variant="outline" className="h-12 sm:h-16 px-8 sm:px-10 border-black/20 text-[#1A1A1A] hover:bg-black/5 uppercase font-bold tracking-widest" asChild>
                    <Link href="/about">Learn Our History</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Services Showcase */}
        <section className="py-16 md:py-32 bg-[#F7F5F1] border-y border-black/8">
          <div className="container mx-auto px-4 mb-6 md:mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Capabilities</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-3 md:mt-4">Our Expertise</h2>
              </div>
              <Button variant="ghost" className="text-[#1A1A1A] hover:text-primary transition-colors font-bold uppercase tracking-widest hidden md:flex" asChild>
                <Link href="/services">View All Capabilities <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="flex items-center justify-between mt-6 md:mt-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {/* Dot indicators */}
              <div className="flex items-center gap-1.5">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { scrollToIndex(i); resetAutoPlay(); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeService ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-black/15 hover:bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div ref={servicesScrollRef} className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-[5%] snap-x no-scrollbar">
            {services.map((service, i) => (
              <div
                key={i}
                className={`w-[160px] sm:w-[200px] md:w-[240px] min-w-0 h-[260px] sm:h-[320px] md:h-[400px] relative rounded-2xl overflow-hidden snap-center flex-shrink-0 border-2 transition-all duration-300 ${
                  i === activeService ? "border-primary/60 shadow-[0_0_20px_rgba(172,60,60,0.2)]" : "border-transparent"
                } group`}
              >
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-4">
                  <h3 className="text-[11px] sm:text-sm md:text-base font-display font-black text-white uppercase tracking-tight line-clamp-1 mb-2">{service.title}</h3>
                  <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                    {service.subs.map((sub, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-zinc-300">
                        <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest line-clamp-1">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container mx-auto px-4 mt-6 md:hidden">
            <Button variant="outline" className="w-full font-bold uppercase tracking-widest border-black/15 text-[#1A1A1A]" asChild>
              <Link href="/services">View All Capabilities <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </section>

        {/* Section 6: Process */}
        <section className="py-16 md:py-32 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14 md:mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase">Methodology</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">How We Work</h2>
            </div>
            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 h-1 bg-black/8 hidden lg:block -translate-y-1/2"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 relative z-10">
                {[
                  { num: "01", title: "Consultation & Design", desc: "We review your CAD files and engineering requirements for manufacturability." },
                  { num: "02", title: "Material Selection", desc: "Selecting optimal steel grades and preparing sheets for precision processing." },
                  { num: "03", title: "CNC Execution", desc: "High-speed laser cutting, bending, and rolling on automated machinery." },
                  { num: "04", title: "Quality & Delivery", desc: "Rigorous inspection followed by logistics to your facility." }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-[#F7F5F1] p-7 md:p-10 rounded-2xl border border-black/8 group hover:bg-[#1C1C1C] transition-colors duration-500"
                  >
                    <div className="text-4xl md:text-5xl font-display font-black text-black/15 mb-6 md:mb-8 group-hover:text-primary transition-colors">{step.num}</div>
                    <h4 className="text-lg md:text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-3 md:mb-4 group-hover:text-white transition-colors">{step.title}</h4>
                    <p className="text-slate-500 font-light leading-relaxed text-sm group-hover:text-zinc-400 transition-colors">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Industry Sectors */}
        <section className="py-16 md:py-32 bg-[#F7F5F1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 md:mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase">Markets</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">Industries We Serve</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {[
                { name: "Automotive", desc: "Precision components for heavy vehicles and assemblies." },
                { name: "Construction", desc: "Structural steel and architectural metalwork." },
                { name: "Power & Energy", desc: "Enclosures and heavy-duty parts for energy sectors." },
                { name: "Marine", desc: "Corrosion-resistant components for maritime apps." },
                { name: "HVAC", desc: "Ventilation ducting and equipment housing." },
                { name: "Mining", desc: "Heavy-duty parts for extreme durability." }
              ].map((sector, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7 md:p-12 bg-[#EDEAE4] rounded-2xl border border-black/8 hover:border-primary/50 transition-colors group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary transition-colors">
                    <Factory className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-white" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-3 md:mb-4">{sector.name}</h4>
                  <p className="text-slate-500 font-light text-sm md:text-base">{sector.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Why Choose Us */}
        <section className="py-16 md:py-32 bg-[#EDEAE4] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase">The Advantage</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4 mb-10 md:mb-12">
                  Why Partners<br />Choose Balaji
                </h2>
                <div className="grid sm:grid-cols-2 gap-7 md:gap-10">
                  {[
                    { title: "20+ Years Experience", icon: Award },
                    { title: "Advanced CNC Tech", icon: Zap },
                    { title: "End-to-End Fabrication", icon: Factory },
                    { title: "Competitive Pricing", icon: TrendingUp },
                    { title: "Fast Turnaround", icon: Target },
                    { title: "Quality Certified", icon: ShieldCheck }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[#1A1A1A] font-bold uppercase tracking-widest text-xs md:text-sm mb-1 md:mb-2">{item.title}</h5>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">Industry-leading standards and expertise since 2001.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mt-6 lg:mt-0">
                <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full" />
                <img src="/service-cnc.png" alt="CNC Precision" className="relative z-10 rounded-2xl border border-black/10 shadow-xl w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Blog Preview */}
        <section className="py-16 md:py-32 bg-[#F7F5F1]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-24">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase">Intelligence</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">Insights & Knowledge</h2>
              </div>
              <Button variant="ghost" className="text-[#1A1A1A] hover:text-primary transition-colors font-bold uppercase tracking-widest shrink-0" asChild>
                <Link href="/blog">View All Posts <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { title: "Understanding CNC Laser Cutting Tolerances", cat: "Technical", slug: "cnc-laser-cutting-tolerances" },
                { title: "How to Choose the Right Steel Grade for Bending", cat: "Guide", slug: "choosing-steel-grade-bending" },
                { title: "Sheet Metal Fabrication Cost Factors in 2024", cat: "Industry", slug: "sheet-metal-fabrication-costs" }
              ].map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} className="group">
                  <div className="aspect-video bg-[#EDEAE4] rounded-xl overflow-hidden mb-6 md:mb-8 border border-black/8">
                    <div className="w-full h-full group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                      <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-black/20 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest">{post.cat}</span>
                  <h4 className="text-xl md:text-2xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mt-3 md:mt-4 group-hover:text-primary transition-colors">{post.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 10: CTA */}
        <section className="py-20 md:py-40 bg-[#1C1C1C] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-6 md:mb-8">
                Start Your<br />Project Today
              </h2>
              <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed">
                Connect with our engineering team for precision fabrication solutions.
              </p>
              <div className="flex flex-col items-center gap-6 md:gap-8">
                <Button size="lg" className="h-14 sm:h-20 px-10 sm:px-16 text-base sm:text-xl font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_50px_rgba(172,60,60,0.5)] border-none w-full sm:w-auto" asChild>
                  <Link href="/contact">Get A Quote Now</Link>
                </Button>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mt-6 md:mt-12">
                  <a href="tel:+917942957640" className="hover:text-primary transition-colors">+91-7942957640</a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
