import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Factory Address",
    lines: ["Navagam, Surat", "Gujarat – 395009", "India"],
    action: null,
  },
  {
    icon: Phone,
    title: "Direct Line",
    lines: ["+91-7942957640"],
    action: { href: "tel:+917942957640", label: "Call Now" },
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@balajiengineering.in"],
    action: { href: "mailto:info@balajiengineering.in", label: "Send Email" },
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: Closed"],
    action: null,
  },
];

const faqs = [
  { q: "How fast can you deliver a quote?", a: "We aim to provide quotes within 4–8 business hours for standard jobs. Send us your DXF/DWG files and material specs for the fastest response." },
  { q: "What file formats do you accept?", a: "We accept DXF, DWG, STEP, IGES, PDF drawings, and sketched dimensions. Our engineers will review every submission for manufacturability." },
  { q: "What is your minimum order quantity?", a: "We accept orders from 1 piece to full production runs. No minimum order restriction — we serve both prototypes and large batch contracts." },
  { q: "Do you offer on-site pickup?", a: "Yes. You can arrange collection directly from our Navagam facility. We also provide logistics coordination for delivery across Gujarat and pan-India." },
];

export default function Contact() {
  const { toast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultService = searchParams.get("service") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Inquiry Sent Successfully",
        description: "Our engineering team will contact you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="bg-black">

        {/* HERO */}
        <section className="relative min-h-[75vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/service-cnc.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4 pt-32 pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary mb-10">
                <Zap className="w-3 h-3" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Response within 24 Hours</span>
              </div>
              <h1 className="text-7xl md:text-[9rem] font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                Let's<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC3C3C] to-[#e05555]">
                  Talk Steel.
                </span>
              </h1>
              <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
                Tell us about your project — dimensions, material, quantity, timeline. Our engineering team will come back to you with a precise quote and a production plan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTACT CARDS ROW */}
        <section className="py-16 bg-[#050505] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#050505] p-10 group hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <info.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-4">{info.title}</h4>
                  <div className="space-y-1 mb-5">
                    {info.lines.map((line, j) => (
                      <p key={j} className="text-white font-bold text-sm">{line}</p>
                    ))}
                  </div>
                  {info.action && (
                    <a
                      href={info.action.href}
                      className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all"
                    >
                      {info.action.label} <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN CONTACT SECTION */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-16 xl:gap-24">

              {/* LEFT — Info + Guarantees */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Our Promise</span>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter mt-4 mb-8 leading-[0.9]">
                    What to Expect
                  </h2>
                  <div className="space-y-6">
                    {[
                      { title: "4–8 Hour Quote", desc: "Send files now — get a detailed quote today." },
                      { title: "Free DFM Review", desc: "We check your design for manufacturability at no cost." },
                      { title: "No Hidden Costs", desc: "Material, machine time, and delivery — all itemized." },
                      { title: "Flexible MOQ", desc: "From single prototypes to 10,000-piece runs." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <h5 className="text-white font-bold uppercase tracking-wider text-sm mb-1">{item.title}</h5>
                          <p className="text-zinc-500 text-sm font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal Block */}
                <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                  <h4 className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-6">Legal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase mb-1">GST Registration</div>
                      <div className="text-white font-mono font-bold text-sm">24BCUPS8314Q1ZK</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase mb-1">Business Type</div>
                      <div className="text-white font-bold text-sm">Manufacturer & Service Provider</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase mb-1">Established</div>
                      <div className="text-white font-bold text-sm">2001 · Navagam, Surat</div>
                    </div>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="p-8 bg-primary/10 border border-primary/20 rounded-2xl">
                  <h4 className="text-lg font-display font-black text-white uppercase tracking-tight mb-2">Prefer to call directly?</h4>
                  <p className="text-zinc-400 text-sm mb-6 font-light">Speak to our engineering team right now.</p>
                  <a
                    href="tel:+917942957640"
                    className="flex items-center gap-3 text-2xl font-display font-black text-primary hover:text-white transition-colors"
                  >
                    <Phone className="w-6 h-6" />
                    +91-7942957640
                  </a>
                </div>
              </div>

              {/* RIGHT — Form */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-zinc-900/30 border border-white/5 rounded-2xl p-10 xl:p-12"
                >
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-2">Submit Your Inquiry</h3>
                  <p className="text-zinc-500 font-light text-sm mb-10">All fields marked * are required. We'll respond within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Full Name / Company *</Label>
                        <Input
                          id="name"
                          required
                          placeholder="Your Name or Company"
                          className="bg-black/60 border-white/10 text-white placeholder:text-zinc-600 h-12 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Phone Number *</Label>
                        <Input
                          id="phone"
                          required
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          className="bg-black/60 border-white/10 text-white placeholder:text-zinc-600 h-12 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Email Address *</Label>
                      <Input
                        id="email"
                        required
                        type="email"
                        placeholder="email@company.com"
                        className="bg-black/60 border-white/10 text-white placeholder:text-zinc-600 h-12 focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Service Required *</Label>
                        <Select defaultValue={defaultService}>
                          <SelectTrigger className="bg-black/60 border-white/10 text-white h-12 focus:border-primary">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            <SelectItem value="bending-services">Bending Services</SelectItem>
                            <SelectItem value="sheet-bending">Sheet Bending Service</SelectItem>
                            <SelectItem value="steel-cutting">Steel Cutting Services</SelectItem>
                            <SelectItem value="plate-bending">Plate Bending & Rolling</SelectItem>
                            <SelectItem value="laser-cutting">CNC Laser Cutting</SelectItem>
                            <SelectItem value="base-plate">Base Plates & Fasteners</SelectItem>
                            <SelectItem value="profile-cutting">Plate Profile Cutting</SelectItem>
                            <SelectItem value="sheet-cutting">Sheet Metal Cutting</SelectItem>
                            <SelectItem value="other">Other / Custom Fabrication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Approximate Quantity</Label>
                        <Input
                          id="quantity"
                          placeholder="e.g. 50 pieces, 500kg"
                          className="bg-black/60 border-white/10 text-white placeholder:text-zinc-600 h-12 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="material" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Material & Thickness</Label>
                      <Input
                        id="material"
                        placeholder="e.g. MS IS 2062, 10mm thick"
                        className="bg-black/60 border-white/10 text-white placeholder:text-zinc-600 h-12 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Project Details *</Label>
                      <Textarea
                        id="message"
                        required
                        placeholder="Describe your requirements — dimensions, tolerances, finish, timeline, and any special considerations..."
                        className="min-h-[140px] bg-black/60 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-16 font-bold tracking-widest uppercase text-base bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(172,60,60,0.4)] border-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Inquiry...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          Submit Inquiry <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="relative overflow-hidden border-y border-white/5">
          <div className="h-[500px] w-full bg-zinc-950 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.999999!2d72.85!3d21.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNavagam%2C+Surat%2C+Gujarat!5e0!3m2!1sen!2sin!4v1000000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Balaji Engineering Works Location"
            />
            <div className="absolute inset-0 pointer-events-none border-y border-white/5" />
            {/* Overlay info card */}
            <div className="absolute top-8 left-8 bg-black/90 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Location</div>
                  <div className="text-white font-bold text-sm">Navagam, Surat</div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Navagam+Surat+Gujarat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all"
              >
                Get Directions <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 bg-[#040404]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Common Questions</span>
                <h2 className="text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mt-4">
                  FAQ
                </h2>
              </div>

              <div className="space-y-px">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-white/5 bg-zinc-900/20 overflow-hidden rounded-xl mb-3">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-8 text-left group"
                    >
                      <span className="text-lg font-display font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 ml-4 transition-all ${expandedFaq === i ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary'}`}>
                        <span className="text-white text-lg leading-none">+</span>
                      </div>
                    </button>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-8 pb-8"
                      >
                        <p className="text-zinc-400 font-light leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-32 bg-black border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-[0.9]">
                Still Have<br />Questions?
              </h2>
              <p className="text-zinc-400 font-light text-lg max-w-lg mx-auto mb-12">
                Our team is available 6 days a week. Pick up the phone — we love talking shop.
              </p>
              <a
                href="tel:+917942957640"
                className="inline-flex items-center gap-4 text-4xl md:text-5xl font-display font-black text-white hover:text-primary transition-colors"
              >
                <Phone className="w-10 h-10 text-primary" />
                +91-7942957640
              </a>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
