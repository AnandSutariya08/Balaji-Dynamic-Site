import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import { Link } from "wouter";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function FloatingCTA() {
  return (
    <>
      {/* Desktop floating button */}
      <Link href="/contact" className="fixed bottom-6 right-6 z-50 group hidden md:block">
        <div className="relative">
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-60"></div>
          <div className="relative bg-primary text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </Link>
      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex gap-3">
        <a href="tel:+917942957640" className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-white/8 border border-white/15 text-white text-xs font-black uppercase tracking-widest">
          <Phone className="w-4 h-4 text-primary" />
          Call Now
        </a>
        <Link href="/contact" className="flex-2 flex-grow flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(172,60,60,0.4)]">
          <MessageSquare className="w-4 h-4" />
          Get a Quote
        </Link>
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/30">
            <Navbar />
            <main className="flex-grow pb-[68px] md:pb-0">
              <Router />
            </main>
            <Footer />
            <FloatingCTA />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
