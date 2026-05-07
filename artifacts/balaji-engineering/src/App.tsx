import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Link } from "wouter";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import AdminLogin from "@/pages/admin/Login";
import AdminInquiries from "@/pages/admin/Inquiries";
import AdminBlogs from "@/pages/admin/Blogs";
import AdminServices from "@/pages/admin/Services";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminAuthProvider } from "@/lib/adminAuth";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const queryClient = new QueryClient();

function PublicRouter() {
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
    <Link href="/contact" className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-60"></div>
        <div className="relative bg-primary text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-colors">
          <MessageSquare className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
}

function AdminApp() {
  return (
    <AdminAuthProvider>
      <Switch>
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/inquiries" component={AdminInquiries} />
        <Route path="/admin/blogs" component={AdminBlogs} />
        <Route path="/admin/services" component={AdminServices} />
      </Switch>
    </AdminAuthProvider>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, [isAdmin]);

  if (isAdmin) {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow">
        <PublicRouter />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppShell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
