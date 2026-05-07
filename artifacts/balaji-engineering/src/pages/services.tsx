import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Shield, Clock, Layers, Settings } from "lucide-react";

const services = [
  {
    title: "Bending Services",
    id: "bending-services",
    image: "/service-bending.png",
    tagline: "Shaping Heavy Metal with Surgical Accuracy",
    description: "Our heavy-capacity bending operations handle everything from thin sheet profiles to 60mm-thick structural plate. Using servo-electric CNC press brakes with real-time angle feedback, we achieve repeatable precision on every bend — even on complex multi-stage jobs.",
    features: ["Mild Steel Plate Bending", "Industrial SS Plate Bending", "Heavy Plate Bending", "Multi-Radius Profiles", "Back-Gauge CNC Control", "Tonnage up to 800T"],
    specs: [{ label: "Max Tonnage", value: "800T" }, { label: "Max Length", value: "6000mm" }, { label: "Accuracy", value: "±0.5°" }, { label: "Min Radius", value: "0.5T" }],
  },
  {
    title: "Sheet Bending Service",
    id: "sheet-bending",
    image: "/service-bending.png",
    tagline: "Commercial Precision, Industrial Scale",
    description: "Precision sheet metal bending for automotive frames, HVAC enclosures, and commercial structures. Our fleet of press brakes handles both thin gauge sheets and medium-thickness plate, ensuring consistent geometry across high-volume production runs.",
    features: ["Sheet Metal Bending", "Tipper Truck Components", "Laser Cutting & Bending", "Box & Pan Forming", "Automated Back Gauge", "Springback Compensation"],
    specs: [{ label: "Min Thickness", value: "0.5mm" }, { label: "Max Thickness", value: "25mm" }, { label: "Batch Size", value: "1–10,000+" }, { label: "Lead Time", value: "24–72 hrs" }],
  },
  {
    title: "Steel Cutting Services",
    id: "steel-cutting",
    image: "/service-steel-cutting.png",
    tagline: "Clean Edges. Zero Compromise.",
    description: "High-speed shearing and cutting operations for thick industrial steel plates and sheets. From straight-line cuts on structural plate to complex profiling on CNC plasma, we deliver burr-free edges with minimal heat-affected zones.",
    features: ["Stainless Steel Sheet Cutting", "Industrial Steel Plate Cutting", "Heavy Steel Cutting", "Plasma & Gas Cutting", "CNC Profiling", "Nesting Optimization"],
    specs: [{ label: "Max Thickness", value: "60mm MS" }, { label: "Max Sheet Size", value: "3000×12000mm" }, { label: "Squareness", value: "±0.3mm" }, { label: "Surface", value: "Burr-Free" }],
  },
  {
    title: "Plate Bending & Rolling",
    id: "plate-bending",
    image: "/service-plate-bending.png",
    tagline: "Cylinders, Cones & Curved Steel — Any Geometry",
    description: "Specialized plate rolling for tanks, pressure vessels, columns, and structural arches. Our 3-roll and 4-roll machines handle massive plate with exceptional roundness control, while our skilled operators manage the complex challenge of conical rolling.",
    features: ["Heavy Plate Rolling", "Cylinder Forming", "Cone Rolling", "Plate Pre-bending", "Structural Arches", "Vessel Shells"],
    specs: [{ label: "Max Plate Width", value: "3000mm" }, { label: "Max Thickness", value: "60mm" }, { label: "Min Diameter", value: "300mm" }, { label: "Ovality", value: "<1%" }],
  },
  {
    title: "CNC Laser Cutting",
    id: "laser-cutting",
    image: "/service-cnc.png",
    tagline: "±0.1mm Accuracy. Every. Single. Time.",
    description: "State-of-the-art fiber laser cutting systems delivering unmatched accuracy on intricate 2D profiles. With real-time kerf compensation, automatic nesting, and high-speed cutting heads, we process both simple blanks and highly complex geometries at production scale.",
    features: ["Mild Steel Laser Cutting", "Stainless Steel Cutting", "CNC Laser Profiles", "High-Speed Processing", "Complex Geometries", "Auto-Nesting for Savings"],
    specs: [{ label: "Tolerance", value: "±0.1mm" }, { label: "Max Thickness", value: "25mm MS" }, { label: "Bed Size", value: "3000×6000mm" }, { label: "Edge Quality", value: "Ra 3.2μm" }],
  },
  {
    title: "Base Plates & Fasteners",
    id: "base-plate",
    image: "/service-base-plates.png",
    tagline: "The Foundation That Everything Else Stands On",
    description: "Heavy-duty base plates, anchor plates, and foundation bolts for structural and industrial installations. Machined to exact tolerances with precision drill patterns, our base plate systems ensure column bases, machinery mounts, and equipment foundations are rock-solid.",
    features: ["MS Base Plates", "SS Base Plates", "Foundation Bolts", "Custom Structural Mounts", "Precision Drilled Holes", "Machined Bearing Surfaces"],
    specs: [{ label: "Max Size", value: "2000×2000mm" }, { label: "Max Thickness", value: "100mm" }, { label: "Hole Tolerance", value: "H7" }, { label: "Flatness", value: "±0.3mm/m" }],
  },
  {
    title: "Plate Profile Cutting",
    id: "profile-cutting",
    image: "/service-profile.png",
    tagline: "Intricate Shapes from Thick Solid Plate",
    description: "Complex profile cutting from thick metal plate using CNC oxy-fuel and plasma systems. Whether you need flanges, frames, brackets, or custom structural shapes — our profiling machines handle thick plate with high edge quality and tight dimensional control.",
    features: ["CNC Oxy-Fuel Profiling", "Plasma Profile Cutting", "Custom Shapes", "Thick Plate Processing", "High Edge Quality", "Batch Production"],
    specs: [{ label: "Max Thickness", value: "150mm (Oxy)" }, { label: "Plasma Thickness", value: "60mm" }, { label: "Positional Acc.", value: "±0.5mm" }, { label: "Min Feature", value: "5mm" }],
  },
  {
    title: "Sheet Metal Cutting",
    id: "sheet-cutting",
    image: "/service-steel-cutting.png",
    tagline: "High Volume. Rapid Turnaround. Zero Waste.",
    description: "High-volume sheet metal shearing services for blanks, strips, and custom-size cuts. Our hydraulic guillotine shears deliver consistent squareness across large production batches, while advanced nesting software minimizes material waste.",
    features: ["Precision Shearing", "High-Volume Production", "Minimal Material Waste", "Custom Blank Sizes", "Strip Cutting", "Rapid Delivery"],
    specs: [{ label: "Max Length", value: "4000mm" }, { label: "Max Thickness", value: "16mm" }, { label: "Squareness", value: "±0.2mm" }, { label: "Min Batch", value: "1 piece" }],
  }
];

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
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">8 Core Capabilities · Heavy Fabrication · Gujarat</span>
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
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 border-b border-black/8 group`}
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
          ))}
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
