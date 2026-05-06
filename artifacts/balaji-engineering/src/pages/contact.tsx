import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Contact() {
  const { toast } = useToast();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultService = searchParams.get("service") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Inquiry Sent Successfully",
        description: "Our engineering team will contact you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/service-cnc.png')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-zinc-950/80 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
              Request a <span className="text-primary">Quote</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Connect with our technical team to discuss your fabrication requirements. We typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-bold uppercase tracking-wide mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wider mb-1">Factory Address</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Navagam,<br />
                        Surat, Gujarat<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wider mb-1">Phone</h4>
                      <a href="tel:+917942957640" className="text-lg font-medium hover:text-primary transition-colors">+91-7942957640</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wider mb-1">Email</h4>
                      <a href="mailto:info@balajiengineering.in" className="text-lg font-medium hover:text-primary transition-colors">info@balajiengineering.in</a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-border">
                  <h4 className="font-bold uppercase tracking-wider mb-2">Legal Information</h4>
                  <p className="text-muted-foreground font-mono">GST: 24BCUPS8314Q1ZK</p>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-border/50 shadow-xl bg-zinc-50 dark:bg-zinc-900/50">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name / Company</Label>
                          <Input id="name" required placeholder="Enter your name" className="bg-background" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" required type="tel" placeholder="+91" className="bg-background" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" required type="email" placeholder="email@company.com" className="bg-background" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Required</Label>
                        <Select defaultValue={defaultService}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bending-services">Bending Services</SelectItem>
                            <SelectItem value="sheet-bending">Sheet Bending Service</SelectItem>
                            <SelectItem value="steel-cutting">Steel Cutting Services</SelectItem>
                            <SelectItem value="plate-bending">Plate Bending Services</SelectItem>
                            <SelectItem value="laser-cutting">Laser Cutting Services</SelectItem>
                            <SelectItem value="base-plate">Base Plate & Fasteners</SelectItem>
                            <SelectItem value="profile-cutting">Plate Profile Cutting</SelectItem>
                            <SelectItem value="sheet-cutting">Sheet Metal Cutting</SelectItem>
                            <SelectItem value="other">Other / Custom Fabrication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Details</Label>
                        <Textarea 
                          id="message" 
                          required 
                          placeholder="Describe your requirements, dimensions, material, and quantity..." 
                          className="min-h-[150px] bg-background" 
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full font-bold tracking-widest uppercase h-14"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-zinc-200 dark:bg-zinc-800 relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-muted-foreground">
          <MapPin className="w-12 h-12 mb-4 opacity-50" />
          <p className="font-display font-bold uppercase tracking-wider">Interactive Map Loading...</p>
          <p className="text-sm">Navagam, Surat, Gujarat</p>
        </div>
      </section>
    </PageTransition>
  );
}
