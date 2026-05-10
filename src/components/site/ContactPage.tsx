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
import type { FormEvent } from "react";
import { useState } from "react";
import { addInquiry } from "@/lib/firestore/inquiries";
import { isFirebaseConfigured } from "@/lib/firebase";
import { contactFaqs, siteConfig } from "@/lib/site";

const contactInfo = [
  {
    icon: MapPin,
    title: "Factory Address",
    lines: [
      "Plot No. 11, 12, Soham Industrial Estate",
      "NH 8 Kamrej, Navagam, Surat - 394185",
      "Gujarat, India",
    ],
    action: null,
  },
  {
    icon: Phone,
    title: "Direct Line",
    lines: [siteConfig.phoneDisplay],
    action: { href: `tel:${siteConfig.phone}`, label: "Call Now" },
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [siteConfig.email],
    action: { href: `mailto:${siteConfig.email}`, label: "Send Email" },
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"],
    action: null,
  },
] as const;

const promisePoints = [
  { title: "4-8 Hour Quote", desc: "Send files now and get a detailed quote today." },
  { title: "Free DFM Review", desc: "We check your design for manufacturability at no cost." },
  { title: "No Hidden Costs", desc: "Material, machine time, and delivery are all itemized." },
  { title: "Flexible MOQ", desc: "From single prototypes to 10,000-piece runs." },
] as const;

const serviceOptions = [
  { value: "bending-services", label: "Bending Services" },
  { value: "sheet-bending", label: "Sheet Bending Service" },
  { value: "steel-cutting", label: "Steel Cutting Services" },
  { value: "plate-bending", label: "Plate Bending & Rolling" },
  { value: "laser-cutting", label: "CNC Laser Cutting" },
  { value: "base-plate", label: "Base Plates & Fasteners" },
  { value: "profile-cutting", label: "Plate Profile Cutting" },
  { value: "sheet-cutting", label: "Sheet Metal Cutting" },
  { value: "other", label: "Other / Custom Fabrication" },
] as const;

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
    const get = (id: string) =>
      (form.querySelector(`#${id}`) as HTMLInputElement)?.value || "";
    const getSelect = () =>
      (form.querySelector("[data-radix-select-value]") as HTMLElement)?.textContent ||
      get("service") ||
      defaultService;

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
        <section className="relative flex min-h-[75vh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="h-full w-full bg-cover bg-center opacity-25"
              style={{ backgroundImage: "url('/service-cnc.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/70 to-[#1A1A1A]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
              }}
            />
          </div>
          <div className="container relative z-10 mx-auto px-4 pb-16 pt-28 md:pb-24 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-4xl"
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-primary md:mb-10">
                <Zap className="h-3 w-3" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.3em]">
                  Response within 24 Hours
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl xl:text-8xl">
                Let&apos;s
                <br />
                <span className="bg-gradient-to-r from-[#AC3C3C] to-[#e05555] bg-clip-text text-transparent">
                  Talk Steel.
                </span>
              </h1>
              <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-300 sm:text-xl">
                Tell us about your project - dimensions, material, quantity, timeline,
                and tolerances. Our engineering team will come back to you with a
                precise quote and a production plan.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#EDEAE4] py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-px bg-black/8 lg:grid-cols-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[#EDEAE4] p-6 transition-colors hover:bg-[#F7F5F1] md:p-10"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-500 group-hover:border-primary group-hover:bg-primary md:mb-6 md:h-12 md:w-12">
                    <info.icon className="h-4 w-4 text-primary transition-colors duration-500 group-hover:text-white md:h-5 md:w-5" />
                  </div>
                  <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 sm:text-xs md:mb-4">
                    {info.title}
                  </h4>
                  <div className="mb-4 space-y-1 md:mb-5">
                    {info.lines.map((line) => (
                      <p key={line} className="text-xs font-bold text-[#1A1A1A] sm:text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                  {info.action && (
                    <a
                      href={info.action.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
                    >
                      {info.action.label} <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F1] py-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 xl:gap-24">
              <div className="space-y-8 lg:col-span-2 md:space-y-12">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                    Our Promise
                  </span>
                  <h2 className="mt-4 text-3xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-4xl md:mb-8 md:text-5xl">
                    What to Expect
                  </h2>
                  <div className="space-y-5 md:space-y-6">
                    {promisePoints.map((item) => (
                      <div key={item.title} className="flex gap-4">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1 text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
                            {item.title}
                          </h5>
                          <p className="text-sm font-light text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6 md:p-8">
                  <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-slate-500 md:mb-6">
                    Legal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        GST Registration
                      </div>
                      <div className="font-mono text-sm font-bold text-[#1A1A1A]">
                        {siteConfig.gstNumber}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Business Type
                      </div>
                      <div className="text-sm font-bold text-[#1A1A1A]">
                        {siteConfig.businessType}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Established
                      </div>
                      <div className="text-sm font-bold text-[#1A1A1A]">
                        {siteConfig.foundingDate} | {siteConfig.address.locality}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/8 p-6 md:p-8">
                  <h4 className="mb-2 text-base font-black uppercase tracking-tight text-[#1A1A1A] md:text-lg">
                    Prefer to call directly?
                  </h4>
                  <p className="mb-5 text-sm font-light text-slate-500 md:mb-6">
                    Speak to our engineering team right now.
                  </p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-3 text-xl font-black text-primary transition-colors hover:text-[#1A1A1A] md:text-2xl"
                  >
                    <Phone className="h-5 w-5 md:h-6 md:w-6" />
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6 sm:p-10 xl:p-12"
                >
                  <h3 className="mb-2 text-2xl font-black uppercase tracking-tight text-[#1A1A1A] md:text-3xl">
                    Submit Your Inquiry
                  </h3>
                  <p className="mb-8 text-sm font-light text-slate-500 md:mb-10">
                    All fields marked * are required. We will respond within 24 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Full Name / Company *
                        </Label>
                        <Input
                          id="name"
                          required
                          placeholder="Your Name or Company"
                          className="h-12 border-black/10 bg-[#F7F5F1] text-[#1A1A1A] placeholder:text-slate-400 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          required
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          className="h-12 border-black/10 bg-[#F7F5F1] text-[#1A1A1A] placeholder:text-slate-400 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        required
                        type="email"
                        placeholder="email@company.com"
                        className="h-12 border-black/10 bg-[#F7F5F1] text-[#1A1A1A] placeholder:text-slate-400 focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Service Required *
                        </Label>
                        <Select defaultValue={defaultService}>
                          <SelectTrigger className="h-12 border-black/10 bg-[#F7F5F1] text-[#1A1A1A] focus:border-primary">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Approximate Quantity
                        </Label>
                        <Input
                          id="quantity"
                          placeholder="e.g. 50 pieces, 500kg"
                          className="h-12 border-black/10 bg-[#F7F5F1] text-[#1A1A1A] placeholder:text-slate-400 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Material & Thickness
                      </Label>
                      <Input
                        id="material"
                        placeholder="e.g. MS IS 2062, 10mm thick"
                        className="h-12 border-black/10 bg-[#F7F5F1] text-[#1A1A1A] placeholder:text-slate-400 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Project Details *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        placeholder="Describe your requirements - dimensions, tolerances, finish, timeline, and any special considerations..."
                        className="min-h-[120px] resize-none border-black/10 bg-[#F7F5F1] text-[#1A1A1A] placeholder:text-slate-400 focus:border-primary md:min-h-[140px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="h-14 w-full border-none bg-primary text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(172,60,60,0.3)] hover:bg-primary/90 md:h-16 md:text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending Inquiry...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          Submit Inquiry <ArrowRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-black/8">
          <div className="relative h-[350px] w-full bg-[#EDEAE4] sm:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.999999!2d72.85!3d21.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNavagam%2C+Surat%2C+Gujarat!5e0!3m2!1sen!2sin!4v1000000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "saturate(0.4) contrast(0.9) brightness(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Balaji Engineering Works Location"
            />
            <div className="absolute left-4 top-4 rounded-2xl border border-black/10 bg-[#F7F5F1]/95 p-4 shadow-lg backdrop-blur-sm md:left-8 md:top-8 md:p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary md:h-8 md:w-8">
                  <MapPin className="h-3.5 w-3.5 text-white md:h-4 md:w-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Location
                  </div>
                  <div className="text-sm font-bold text-[#1A1A1A]">
                    {siteConfig.address.locality}, {siteConfig.address.region}
                  </div>
                </div>
              </div>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
              >
                Get Directions <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#EDEAE4] py-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-14 text-center md:mb-20">
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Common Questions
                </span>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] sm:text-5xl md:text-6xl">
                  FAQ
                </h2>
              </div>
              <div className="space-y-3">
                {contactFaqs.map((faq, index) => (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-xl border border-black/8 bg-[#F7F5F1]"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="group flex w-full items-center justify-between p-5 text-left md:p-8"
                    >
                      <span className="pr-4 text-base font-black uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary md:text-lg">
                        {faq.question}
                      </span>
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15 transition-all md:h-8 md:w-8 ${
                          expandedFaq === index
                            ? "rotate-45 border-primary bg-primary"
                            : "group-hover:border-primary"
                        }`}
                      >
                        <span
                          className={`text-base leading-none md:text-lg ${
                            expandedFaq === index ? "text-white" : "text-[#1A1A1A]"
                          }`}
                        >
                          +
                        </span>
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 md:px-8 md:pb-8"
                      >
                        <p className="text-sm font-light leading-relaxed text-slate-600 md:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1C1C1C] py-16 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:mb-6 md:text-7xl">
                Still Have
                <br />
                Questions?
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-base font-light text-zinc-400 md:mb-12 md:text-lg">
                Our team is available 6 days a week. Pick up the phone and discuss
                your fabrication requirement directly with us.
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-3 text-3xl font-black text-white transition-colors hover:text-primary sm:text-4xl md:gap-4 md:text-5xl"
              >
                <Phone className="h-8 w-8 text-primary md:h-10 md:w-10" />
                {siteConfig.phoneDisplay}
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
