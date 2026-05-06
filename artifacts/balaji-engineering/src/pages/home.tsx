import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Zap, Layers } from "lucide-react";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const services = [
    {
      title: "Sheet Metal Bending",
      image: "/service-bending.png",
      desc: "Precision bending for mild steel and industrial SS plates using advanced press brakes.",
    },
    {
      title: "CNC Laser Cutting",
      image: "/service-cnc.png",
      desc: "High-accuracy cutting for complex profiles with minimal tolerances.",
    },
    {
      title: "Heavy Plate Rolling",
      image: "/service-rolling.png",
      desc: "Heavy plate rolling and bending services for cylinders and structural forms.",
    },
    {
      title: "Steel Fabrication",
      image: "/service-fabrication.png",
      desc: "End-to-end heavy structural steel fabrication for industrial applications.",
    }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden bg-black">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10" />
          <img 
            src="/hero-bg.png" 
            alt="Industrial Factory" 
            className="w-full h-full object-cover object-center"
          />
          {/* Animated Particles Overlay */}
          <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
        </motion.div>

        <div className="container relative z-20 mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase">Est. 2001 • Navagam, Surat</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] mb-6 uppercase tracking-tight">
                Raw Power.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Precision</span> Engineered.
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
                Two decades of excellence in industrial sheet metal fabrication. 
                We transform heavy steel into exact specifications with state-of-the-art 
                CNC, bending, and rolling machinery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-base font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(172,60,60,0.4)]" asChild>
                  <Link href="/services">Explore Capabilities</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold uppercase tracking-wider border-white/20 text-white hover:bg-white/10" asChild>
                  <Link href="/contact">Request Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-zinc-950 relative z-30 border-b border-zinc-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 20, label: "Years Experience", suffix: "+" },
              { value: 500, label: "Projects Completed", suffix: "+" },
              { value: 25, label: "Skilled Employees", suffix: "+" },
              { value: 25, label: "Cr. Annual Turnover", prefix: "₹", suffix: "" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">Our <span className="text-primary">Capabilities</span></h2>
              <p className="text-muted-foreground text-lg">Comprehensive metal working solutions from heavy duty cutting to precision bending under one roof.</p>
            </div>
            <Button variant="ghost" className="group font-bold uppercase tracking-wider" asChild>
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6">Built on <span className="text-primary">Trust & Quality</span></h2>
              <p className="text-lg text-muted-foreground mb-8">
                As a registered manufacturer and service provider, we adhere to strict quality control processes. Our facility is equipped with advanced machinery to handle both high-volume production and complex custom fabrication.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Uncompromising Quality", desc: "Rigorous inspection at every stage of fabrication." },
                  { icon: Zap, title: "Modern Machinery", desc: "Equipped with latest CNC and automation technology." },
                  { icon: Layers, title: "End-to-End Service", desc: "From raw material cutting to final assembly." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-bold uppercase tracking-wide">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-xl overflow-hidden shadow-2xl"
            >
              <img src="/service-fabrication.png" alt="Factory Floor" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] opacity-10 mix-blend-overlay bg-cover bg-center" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">Ready to start your next project?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto font-light">
              Get in touch with our engineering team for a detailed quote. We handle requirements ranging from prototypes to full-scale production runs.
            </p>
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold uppercase tracking-widest text-primary shadow-2xl hover:scale-105 transition-transform" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
