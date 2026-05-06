import { PageTransition } from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, Factory, FileText, Target, Users } from "lucide-react";

export default function About() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-32 pb-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/service-fabrication.png')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
              About <span className="text-primary">Balaji Engineering</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Established in 2001, we have grown from a modest workshop into a premier sheet metal fabrication facility in Navagam, Surat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Facts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold uppercase tracking-wide">Our Story</h2>
              <div className="prose dark:prose-invert prose-lg text-muted-foreground">
                <p>
                  For over two decades, Balaji Engineering Works has been at the forefront of industrial fabrication in Gujarat. We built our reputation on a simple premise: uncompromising precision and absolute reliability.
                </p>
                <p>
                  Today, our facility houses state-of-the-art CNC machinery, heavy-duty press brakes, and rolling equipment capable of handling massive industrial requirements. Our team of 25+ skilled engineers and technicians bring decades of collective expertise to every project.
                </p>
                <p>
                  With an annual turnover between 5-25 Cr, we serve diverse industrial sectors across India, providing them with critical structural components, precisely cut profiles, and heavy machinery parts.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-50 dark:bg-zinc-900 border-none shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-wide mb-6 border-b border-border pb-4">Key Facts</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <Factory className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <span className="block text-sm text-muted-foreground uppercase tracking-wider font-semibold">Nature of Business</span>
                        <span className="text-lg font-medium">Manufacturer & Service Provider</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <FileText className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <span className="block text-sm text-muted-foreground uppercase tracking-wider font-semibold">GST Registration</span>
                        <span className="text-lg font-medium uppercase font-mono">24BCUPS8314Q1ZK</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Users className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <span className="block text-sm text-muted-foreground uppercase tracking-wider font-semibold">Workforce</span>
                        <span className="text-lg font-medium">Upto 25 Skilled Professionals</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Target className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <span className="block text-sm text-muted-foreground uppercase tracking-wider font-semibold">Year of Establishment</span>
                        <span className="text-lg font-medium">2001</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-zinc-800 bg-zinc-900/50 rounded-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <h3 className="text-3xl font-display font-bold uppercase tracking-wide mb-4">Mission</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                To deliver precision-engineered fabrication solutions that empower industrial growth, maintaining the highest standards of quality, safety, and operational excellence in every project we undertake.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 border border-zinc-800 bg-zinc-900/50 rounded-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <h3 className="text-3xl font-display font-bold uppercase tracking-wide mb-4">Vision</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                To be the most trusted and technologically advanced metal fabrication partner in India, known for resolving complex engineering challenges through innovation and craftsmanship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
