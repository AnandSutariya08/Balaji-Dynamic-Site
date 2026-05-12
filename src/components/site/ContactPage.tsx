"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { addInquiry } from "@/lib/firestore/inquiries";
import { isFirebaseConfigured } from "@/lib/firebase";

const contactInfo = [
  { icon: Phone, title: "Managing Director", lines: ["Nikunj Sakariya", "+91 99787 53398"], action: { href: "tel:+919978753398", label: "Call Now" } },
  { icon: Mail, title: "Email Us", lines: ["info@balajiengineering.in", "nikunj.balajiengineeringworks@gmail.com"], action: { href: "mailto:nikunj.balajiengineeringworks@gmail.com", label: "Send Email" } },
  { icon: Clock, title: "Response Support", lines: ["Mon - Sat project assistance", "Share drawings for faster quotes"], action: null },
  { icon: MapPin, title: "Unit 1 Address", lines: ["Block no. 334/3, Vav-Jokha Road", "Village Jokha, Kamrej, Surat", "Gujarat - 394180"], action: null },
  { icon: MapPin, title: "Unit 2 Address", lines: ["Plot no. 11,12, Soham Industrial Estate", "Opp. Hero Showroom, NH-8", "Kamrej, Surat, Gujarat - 394185"], action: null },
];

const faqs = [
  { q: "How fast can you deliver a quote?", a: "We aim to provide quotes within 4–8 business hours for standard jobs. Send us your DXF/DWG files and material specs for the fastest response." },
  { q: "What file formats do you accept?", a: "We accept DXF, DWG, STEP, IGES, PDF drawings, and sketched dimensions. Our engineers will review every submission for manufacturability." },
  { q: "What is your minimum order quantity?", a: "We accept orders from 1 piece to full production runs. No minimum order restriction — we serve both prototypes and large batch contracts." },
  { q: "Do you offer on-site pickup?", a: "Yes. You can arrange collection directly from our Kamrej, Navagam facility in Surat. We also provide logistics coordination for delivery across Gujarat and pan-India." },
];

export default function ContactPage({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const get = (id: string) => (form.querySelector(`#${id}`) as HTMLInputElement)?.value || "";
    const getSelect = () => (form.querySelector("[data-radix-select-value]") as HTMLElement)?.textContent || get("service") || defaultService;

    setIsSubmitting(true);
    try {
      const data = {
        name: get("name"),
        phone: get("phone"),
        email: get("email"),
        service: getSelect(),
        quantity: get("quantity"),
        material: get("material"),
        message: get("message"),
      };
      if (isFirebaseConfigured()) {
        await addInquiry(data);
      }
      toast.success("Inquiry Sent Successfully", {
        description: "Our engineering team will contact you within 24 hours.",
      });
      form.reset();
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="bg-[#F7F5F1]">

        {/* HERO */}
        <section className="relative min-h-[75vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/service-cnc.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/70 to-[#1A1A1A]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
          </div>
          <div className="container relative z-10 mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary mb-8 md:mb-10">
                <Zap className="w-3 h-3" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">Response within 24 Hours</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 md:mb-8">
                Contact<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">Balaji.</span>
              </h1>
              <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">Tell us about your bending, laser cutting, rolling, fabrication, or steel processing requirement. Our Surat team will respond with a clear quote and production guidance.</p>
            </motion.div>
          </div>
        </section>

        {/* CONTACT CARDS ROW */}
        <section className="py-10 md:py-16 bg-[#EDEAE4] border-y border-black/8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-black/8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`bg-[#EDEAE4] p-6 md:p-8 group hover:bg-[#F7F5F1] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)] transition-all duration-200 rounded-none xl:col-span-2 ${i === 3 ? "xl:col-start-2" : ""} ${i === 4 ? "xl:col-start-4" : ""}`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <info.icon className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-slate-500 uppercase mb-3 md:mb-4">{info.title}</h4>
                  <div className="space-y-1 mb-4 md:mb-5">
                    {info.lines.map((line, j) => (
                      <p key={j} className="text-[#1A1A1A] font-bold text-xs sm:text-sm">{line}</p>
                    ))}
                  </div>
                  {info.action && (
                    <a href={info.action.href} className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
                      {info.action.label} <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN CONTACT SECTION */}
        <section className="py-16 md:py-32 bg-[#F7F5F1]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 xl:gap-24">

              {/* LEFT */}
              <div className="lg:col-span-2 space-y-8 md:space-y-12">
                <div>
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Our Promise</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4 mb-6 md:mb-8 leading-[0.9]">What to Expect</h2>
                  <div className="space-y-5 md:space-y-6">
                    {[
                      { title: "4–8 Hour Quote", desc: "Send files now — get a detailed quote today." },
                      { title: "Free DFM Review", desc: "We check your design for manufacturability at no cost." },
                      { title: "No Hidden Costs", desc: "Material, machine time, and delivery — all itemized." },
                      { title: "Flexible MOQ", desc: "From single prototypes to 10,000-piece runs." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <h5 className="text-[#1A1A1A] font-bold uppercase tracking-wider text-sm mb-1">{item.title}</h5>
                          <p className="text-slate-500 text-sm font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal Block */}
                <div className="p-6 md:p-8 bg-[#EDEAE4] border border-black/8 rounded-2xl">
                  <h4 className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase mb-5 md:mb-6">Legal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">GST Registration</div>
                      <div className="text-[#1A1A1A] font-mono font-bold text-sm">24BCUPS8314Q1ZK</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Business Type</div>
                      <div className="text-[#1A1A1A] font-bold text-sm">Manufacturer & Service Provider</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Established</div>
                      <div className="text-[#1A1A1A] font-bold text-sm">2001 · Kamrej, Navagam, Surat</div>
                    </div>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="p-6 md:p-8 bg-primary/8 border border-primary/20 rounded-2xl">
                  <h4 className="text-base md:text-lg font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-2">Prefer to call directly?</h4>
                  <p className="text-slate-500 text-sm mb-5 md:mb-6 font-light">Speak to our engineering team right now.</p>
                  <a href="tel:+919978753398" className="flex items-center gap-3 text-xl md:text-2xl font-display font-black text-primary hover:text-[#1A1A1A] transition-colors">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />+91 99787 53398
                  </a>
                </div>
              </div>

              {/* RIGHT — Form */}
              <div className="lg:col-span-3">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-[#EDEAE4] border border-black/8 rounded-2xl p-6 sm:p-10 xl:p-12">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-[#1A1A1A] uppercase tracking-tight mb-2">Submit Your Inquiry</h3>
                  <p className="text-slate-500 font-light text-sm mb-8 md:mb-10">All fields marked * are required. We'll respond within 24 hours.</p>
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold tracking-widest text-slate-500 uppercase">Full Name / Company *</Label>
                        <Input id="name" required placeholder="Your Name or Company" className="bg-[#F7F5F1] border-black/10 text-[#1A1A1A] placeholder:text-slate-400 h-12 focus:border-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold tracking-widest text-slate-500 uppercase">Phone Number *</Label>
                        <Input id="phone" required type="tel" placeholder="+91 XXXXX XXXXX" className="bg-[#F7F5F1] border-black/10 text-[#1A1A1A] placeholder:text-slate-400 h-12 focus:border-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold tracking-widest text-slate-500 uppercase">Email Address *</Label>
                      <Input id="email" required type="email" placeholder="email@company.com" className="bg-[#F7F5F1] border-black/10 text-[#1A1A1A] placeholder:text-slate-400 h-12 focus:border-primary" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-xs font-bold tracking-widest text-slate-500 uppercase">Service Required *</Label>
                        <Select defaultValue={defaultService}>
                          <SelectTrigger className="bg-[#F7F5F1] border-black/10 text-[#1A1A1A] h-12 focus:border-primary">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cnc-plate-bending">CNC Plate Bending</SelectItem>
                            <SelectItem value="cnc-laser-cutting">CNC Laser Cutting</SelectItem>
                            <SelectItem value="plate-rolling">Plate Rolling</SelectItem>
                            <SelectItem value="assembly">Assembly</SelectItem>
                            <SelectItem value="welding">Welding</SelectItem>
                            <SelectItem value="deep-drawing">Deep Drawing</SelectItem>
                            <SelectItem value="finishing">Finishing</SelectItem>
                            <SelectItem value="stamping">Stamping</SelectItem>
                            <SelectItem value="punching">Punching</SelectItem>
                            <SelectItem value="other">Other / Custom Fabrication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-xs font-bold tracking-widest text-slate-500 uppercase">Approximate Quantity</Label>
                        <Input id="quantity" placeholder="e.g. 50 pieces, 500kg" className="bg-[#F7F5F1] border-black/10 text-[#1A1A1A] placeholder:text-slate-400 h-12 focus:border-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material" className="text-xs font-bold tracking-widest text-slate-500 uppercase">Material & Thickness</Label>
                      <Input id="material" placeholder="e.g. MS IS 2062, 10mm thick" className="bg-[#F7F5F1] border-black/10 text-[#1A1A1A] placeholder:text-slate-400 h-12 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-bold tracking-widest text-slate-500 uppercase">Project Details *</Label>
                      <Textarea id="message" required placeholder="Describe your requirements — dimensions, tolerances, finish, timeline, and any special considerations..." className="min-h-[120px] md:min-h-[140px] bg-[#F7F5F1] border-black/10 text-[#1A1A1A] placeholder:text-slate-400 focus:border-primary resize-none" />
                    </div>
                    <Button type="submit" size="lg" className="w-full h-14 md:h-16 font-bold tracking-widest uppercase text-sm md:text-base bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(172,60,60,0.3)] border-none" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-3"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending Inquiry...</span>
                      ) : (
                        <span className="flex items-center gap-3">Submit Inquiry <ArrowRight className="w-5 h-5" /></span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="relative overflow-hidden border-y border-black/8">
          <div className="h-[350px] sm:h-[500px] w-full bg-[#EDEAE4] relative">
            <iframe
              src="https://www.google.com/maps?q=Balaji+Engineering+Works+Plot+No.+11+12+Soham+Industrial+Estate+NH+8+Kamrej+Navagam+Surat+394185&output=embed"
              width="100%" height="100%"
              style={{ border: 0, filter: "saturate(0.4) contrast(0.9) brightness(1.05)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Balaji Engineering Works Location"
            />
            <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-[#F7F5F1]/95 border border-black/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Location</div>
                  <div className="text-[#1A1A1A] font-bold text-sm">Kamrej, Navagam, Surat</div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Balaji+Engineering+Works+Plot+No.+11+12+Soham+Industrial+Estate+NH+8+Kamrej+Navagam+Surat+394185" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
                Get Directions <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-32 bg-[#EDEAE4]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14 md:mb-20">
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Common Questions</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">FAQ</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-black/8 bg-[#F7F5F1] overflow-hidden rounded-xl">
                    <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 md:p-8 text-left group">
                      <span className="text-base md:text-lg font-display font-black text-[#1A1A1A] uppercase tracking-tight group-hover:text-primary transition-colors pr-4">{faq.q}</span>
                      <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border border-black/15 flex items-center justify-center shrink-0 transition-all ${expandedFaq === i ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary'}`}>
                        <span className={`text-base md:text-lg leading-none ${expandedFaq === i ? 'text-white' : 'text-[#1A1A1A]'}`}>+</span>
                      </div>
                    </button>
                    {expandedFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-5 pb-5 md:px-8 md:pb-8">
                        <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#F7F5F1] border-t border-black/8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Popular Inquiries</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter mt-4">
                Choose a Service Before You Contact Us
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "CNC Plate Bending", href: "/services/cnc-plate-bending" },
                { title: "CNC Laser Cutting", href: "/services/cnc-laser-cutting" },
                { title: "Plate Rolling", href: "/services/plate-rolling" },
                { title: "Punching", href: "/services/punching" },
              ].map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-5 transition-colors hover:border-primary/40 hover:bg-white"
                >
                  <h3 className="text-lg font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    {service.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    View Service <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-16 md:py-32 bg-[#1C1C1C]">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-5 md:mb-6 leading-[0.9]">Still Have<br />Questions?</h2>
              <p className="text-zinc-400 font-light text-base md:text-lg max-w-lg mx-auto mb-10 md:mb-12">Our team is available 6 days a week. Pick up the phone — we love talking shop.</p>
              <a href="tel:+917942957640" className="inline-flex items-center gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl font-display font-black text-white hover:text-primary transition-colors">
                <Phone className="w-8 h-8 md:w-10 md:h-10 text-primary" />+91-7942957640
              </a>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
