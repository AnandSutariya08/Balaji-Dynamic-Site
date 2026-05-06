import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, ChevronRight, ChevronLeft, Play, CheckCircle2, Factory, Zap, ShieldCheck, Target, Award, Users, TrendingUp } from "lucide-react";
import { HeroScene } from "@/components/3d/HeroScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const scrollServices = (dir: 'left' | 'right') => {
    if (servicesScrollRef.current) {
      servicesScrollRef.current.scrollBy({ left: dir === 'right' ? 440 : -440, behavior: 'smooth' });
    }
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

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-[#F7F5F1]">
        {/* Section 1: Hero — keep dark, it has a 3D scene */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <HeroScene />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="container relative z-20 mx-auto px-4">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary mb-8">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">EST. 2001 • NAVAGAM, SURAT • GST: 24BCUPS8314Q1ZK</span>
                </div>
                <h1 className="flex flex-col text-7xl md:text-9xl font-display font-black leading-[0.9] text-white uppercase tracking-tighter mb-8">
                  <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>FORGING</motion.span>
                  <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#1a3a6a]">PRECISION</motion.span>
                  <motion.span initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-2xl font-bold tracking-[0.5em] mt-4 opacity-70">SINCE 2001</motion.span>
                </h1>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-6 mt-12">
                  <Button size="lg" className="h-16 px-10 text-base font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(172,60,60,0.5)] border-none" asChild>
                    <Link href="/services">Explore Services</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-base font-bold uppercase tracking-widest border-white/20 text-white hover:bg-white/10" asChild>
                    <Link href="/contact">Request Quote</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
              <div className="w-1 h-2 bg-primary rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Section 2: Marquee Ticker */}
        <section className="py-12 bg-[#1C1C1C] overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4 text-4xl md:text-6xl font-display font-black text-white/20 uppercase">
                <span>SHEET METAL BENDING</span>
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span>CNC LASER CUTTING</span>
                <span className="w-3 h-3 rounded-full bg-white/30" />
                <span>PLATE ROLLING</span>
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span>HEAVY FABRICATION</span>
                <span className="w-3 h-3 rounded-full bg-white/30" />
                <span>STEEL CUTTING</span>
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span>PRECISION PUNCHING</span>
                <span className="w-3 h-3 rounded-full bg-white/30" />
                <span>STRUCTURAL WELDING</span>
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span>PROFILE CUTTING</span>
                <span className="w-3 h-3 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-marquee { animation: marquee 40s linear infinite; }
          `}</style>
        </section>

        {/* Section 3: Stats */}
        <section className="py-32 bg-[#F7F5F1] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
            <span className="text-[40rem] font-display font-black text-[#1A1A1A]">25</span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
              {[
                { value: 20, label: "Years Experience", suffix: "+", icon: Target },
                { value: 500, label: "Projects Completed", suffix: "+", icon: Factory },
                { value: 25, label: "Skilled Employees", suffix: "+", icon: Users },
                { value: 25, label: "Cr. Turnover", suffix: " Cr", prefix: "₹ 5-", icon: TrendingUp }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="text-5xl md:text-7xl font-display font-black text-[#1A1A1A] mb-4">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="h-1 w-12 bg-primary mb-6" />
                  <div className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: About Teaser */}
        <section className="py-32 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <img src="/service-fabrication.png" alt="Fabrication Excellence" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>

              <div ref={aboutTextRef} className="space-y-12">
                <div className="reveal-line">
                  <span className="text-primary font-bold tracking-[0.3em] uppercase">Who We Are</span>
                  <h2 className="text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">
                    Two Decades of<br />Steel & Precision
                  </h2>
                </div>
                <div className="space-y-6 text-xl text-slate-600 font-light leading-relaxed reveal-line">
                  <p>Established in 2001, Balaji Engineering Works has evolved from a small workshop into a premier industrial power-house in Surat, Gujarat.</p>
                  <p>We specialize in heavy-duty shearing, CNC laser cutting, and complex plate fabrication. Our commitment to accuracy and turnaround time has made us the trusted partner for India's leading infrastructure and automotive firms.</p>
                </div>
                <div className="grid grid-cols-2 gap-8 reveal-line">
                  {["ISO Certified Standards", "Advanced CNC Tech", "Expert Engineering", "End-to-End Solutions"].map((fact, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">{fact}</span>
                    </div>
                  ))}
                </div>
                <div className="reveal-line pt-8">
                  <Button size="lg" variant="outline" className="h-16 px-10 border-black/20 text-[#1A1A1A] hover:bg-black/5 uppercase font-bold tracking-widest" asChild>
                    <Link href="/about">Learn Our History</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Services Showcase */}
        <section className="py-32 bg-[#F7F5F1] border-y border-black/8">
          <div className="container mx-auto px-4 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase">Capabilities</span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">Our Expertise</h2>
              </div>
              <Button variant="ghost" className="text-[#1A1A1A] hover:text-primary transition-colors font-bold uppercase tracking-widest" asChild>
                <Link href="/services">View All Capabilities <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => scrollServices('left')} data-testid="button-services-prev" className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollServices('right')} data-testid="button-services-next" className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div ref={servicesScrollRef} className="flex gap-8 overflow-x-auto pb-4 px-[5%] snap-x no-scrollbar">
            {services.map((service, i) => (
              <div key={i} className="min-w-[400px] h-[500px] relative rounded-2xl overflow-hidden snap-center group border border-black/8 flex-shrink-0">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-6">{service.title}</h3>
                  <div className="space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    {service.subs.map((sub, j) => (
                      <div key={j} className="flex items-center gap-3 text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm font-bold uppercase tracking-widest">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Process */}
        <section className="py-32 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase">Methodology</span>
              <h2 className="text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">How We Work</h2>
            </div>
            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 h-1 bg-black/8 hidden lg:block -translate-y-1/2"
              />
              <div className="grid lg:grid-cols-4 gap-12 relative z-10">
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
                    className="bg-[#F7F5F1] p-10 rounded-2xl border border-black/8 group hover:bg-[#1C1C1C] transition-colors duration-500"
                  >
                    <div className="text-5xl font-display font-black text-black/15 mb-8 group-hover:text-primary transition-colors">{step.num}</div>
                    <h4 className="text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-4 group-hover:text-white transition-colors">{step.title}</h4>
                    <p className="text-slate-500 font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Industry Sectors */}
        <section className="py-32 bg-[#F7F5F1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase">Markets</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">Industries We Serve</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="p-12 bg-[#EDEAE4] rounded-2xl border border-black/8 hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                    <Factory className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <h4 className="text-2xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-4">{sector.name}</h4>
                  <p className="text-slate-500 font-light">{sector.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Why Choose Us */}
        <section className="py-32 bg-[#EDEAE4] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase">The Advantage</span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4 mb-12">
                  Why Partners<br />Choose Balaji
                </h2>
                <div className="grid sm:grid-cols-2 gap-10">
                  {[
                    { title: "20+ Years Experience", icon: Award },
                    { title: "Advanced CNC Tech", icon: Zap },
                    { title: "End-to-End Fabrication", icon: Factory },
                    { title: "Competitive Pricing", icon: TrendingUp },
                    { title: "Fast Turnaround", icon: Target },
                    { title: "Quality Certified", icon: ShieldCheck }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <item.icon className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h5 className="text-[#1A1A1A] font-bold uppercase tracking-widest text-sm mb-2">{item.title}</h5>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">Industry-leading standards and expertise since 2001.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full" />
                <img src="/service-cnc.png" alt="CNC Precision" className="relative z-10 rounded-2xl border border-black/10 shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Blog Preview */}
        <section className="py-32 bg-[#F7F5F1]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-24">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase">Intelligence</span>
                <h2 className="text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">Insights & Knowledge</h2>
              </div>
              <Button variant="ghost" className="text-[#1A1A1A] hover:text-primary transition-colors font-bold uppercase tracking-widest" asChild>
                <Link href="/blog">View All Posts <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: "Understanding CNC Laser Cutting Tolerances", cat: "Technical", slug: "cnc-laser-cutting-tolerances" },
                { title: "How to Choose the Right Steel Grade for Bending", cat: "Guide", slug: "choosing-steel-grade-bending" },
                { title: "Sheet Metal Fabrication Cost Factors in 2024", cat: "Industry", slug: "sheet-metal-fabrication-costs" }
              ].map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} className="group">
                  <div className="aspect-video bg-[#EDEAE4] rounded-xl overflow-hidden mb-8 border border-black/8">
                    <div className="w-full h-full group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                      <Play className="w-12 h-12 text-black/20 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest">{post.cat}</span>
                  <h4 className="text-2xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mt-4 group-hover:text-primary transition-colors">{post.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 10: CTA — keep dark for visual impact */}
        <section className="py-40 bg-[#1C1C1C] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-8">
                Start Your<br />Project Today
              </h2>
              <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
                Connect with our engineering team for precision fabrication solutions.
              </p>
              <div className="flex flex-col items-center gap-8">
                <Button size="lg" className="h-20 px-16 text-xl font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_0_50px_rgba(172,60,60,0.5)] border-none" asChild>
                  <Link href="/contact">Get A Quote Now</Link>
                </Button>
                <div className="text-3xl md:text-4xl font-display font-black text-white mt-12">
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
