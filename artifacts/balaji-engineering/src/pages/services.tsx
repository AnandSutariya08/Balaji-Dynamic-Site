import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";

const services = [
  {
    title: "Bending Services",
    id: "bending-services",
    image: "/service-bending.png",
    description: "High-capacity bending for heavy industrial applications.",
    features: ["Mild Steel Plate Bending", "Industrial SS Plate Bending", "Heavy Plate Bending"]
  },
  {
    title: "Sheet Bending Service",
    id: "sheet-bending",
    image: "/service-bending.png",
    description: "Precision sheet metal bending for commercial and automotive parts.",
    features: ["Sheet Metal Bending", "Mild Steel Long Member Tipper Truck Components", "Laser Cutting & Bending"]
  },
  {
    title: "Steel Cutting Services",
    id: "steel-cutting",
    image: "/service-steel-cutting.png",
    description: "Clean, precise cuts for thick industrial steel plates and sheets.",
    features: ["Stainless Steel Sheet Cutting", "Industrial Steel Plate Cutting", "Heavy Steel Cutting"]
  },
  {
    title: "Plate Bending Services",
    id: "plate-bending",
    image: "/service-plate-bending.png",
    description: "Specialized rolling and bending for massive metal plates.",
    features: ["Heavy Plate Bending", "Plate Rolling Bending", "Cylinder Forming"]
  },
  {
    title: "Laser Cutting Services",
    id: "laser-cutting",
    image: "/service-cnc.png",
    description: "State-of-the-art CNC laser cutting for intricate patterns and tight tolerances.",
    features: ["Mild Steel Laser Cutting", "CNC Laser Cutting", "High-Speed Processing"]
  },
  {
    title: "Base Plate & Fasteners",
    id: "base-plate",
    image: "/service-base-plates.png",
    description: "Heavy duty base plates and foundation bolts for structural integrity.",
    features: ["MS Base Plates", "Foundation Bolts", "Custom Structural Mounts"]
  },
  {
    title: "Plate Profile Cutting",
    id: "profile-cutting",
    image: "/service-profile.png",
    description: "Complex profile cutting from thick metal plates utilizing CNC machinery.",
    features: ["Custom Profiles", "Thick Plate Processing", "High Edge Quality"]
  },
  {
    title: "Sheet Metal Cutting",
    id: "sheet-cutting",
    image: "/service-steel-cutting.png",
    description: "High-volume sheet metal shearing and cutting services.",
    features: ["Precision Shearing", "High Volume Runs", "Minimal Material Waste"]
  }
];

export default function Services() {
  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-zinc-950/80 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
              Our <span className="text-primary">Capabilities</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              We leverage advanced machinery and decades of expertise to provide end-to-end metal fabrication solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
              >
                <Card className="overflow-hidden border-border/50 bg-zinc-50 dark:bg-zinc-900/50 shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-display font-bold uppercase tracking-wide mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>
                    
                    <div className="space-y-2 mb-8">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full font-bold uppercase tracking-widest mt-auto group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors" asChild>
                      <Link href={`/contact?service=${service.id}`}>Inquire Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
