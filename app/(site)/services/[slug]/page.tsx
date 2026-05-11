import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blogData";
import { staticServices } from "@/lib/servicesData";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createGenericFaqJsonLd,
  createServiceJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";
import { getServiceSeoContent } from "@/lib/serviceSeo";

export async function generateStaticParams() {
  return staticServices.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = staticServices.find((item) => item.id === slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  const seo = getServiceSeoContent(service);

  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: `/services/${service.id}`,
    image: service.image,
    keywords: [...seo.keywords, service.title, "Balaji Engineering Works"],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = staticServices;
  const posts = blogPosts;
  const service = staticServices.find((item) => item.id === slug);

  if (!service) {
    notFound();
  }

  const seo = getServiceSeoContent(service);
  const relatedServices = services.filter((item) => item.id !== service.id).slice(0, 4);
  const relatedPosts = posts
    .filter((post) => {
      const haystack = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
      return service.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && haystack.includes(word));
    })
    .slice(0, 3);
  const path = `/services/${service.id}`;

  const schemas = [
    createWebPageJsonLd({
      title: seo.metaTitle,
      description: seo.metaDescription,
      path,
      type: "Service",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path },
    ]),
    createServiceJsonLd(service),
    createGenericFaqJsonLd(seo.faqs),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <div className="bg-[#F7F5F1]">
        <section className="relative min-h-[72vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>

          <div className="container relative z-10 mx-auto px-4 pb-16 pt-28 md:pb-24 md:pt-32">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <div className="mt-8 max-w-4xl">
              <p className="mb-5 inline-flex rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Surat Manufacturing Service
              </p>
              <h1 className="text-4xl font-display font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-light leading-relaxed text-zinc-300 md:text-xl">
                {seo.metaDescription}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 px-8 text-sm font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90"
                  asChild
                >
                  <Link href={`/contact?service=${service.id}`}>Request Quote</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/20 px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Talk to Engineering Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#EDEAE4] py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Service Overview
                </span>
                <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
                  {seo.metaTitle}
                </h2>
                <p className="mt-6 text-base font-light leading-relaxed text-slate-600 md:text-lg">
                  {seo.intro}
                </p>
                <p className="mt-4 text-base font-light leading-relaxed text-slate-600 md:text-lg">
                  {service.description}
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-6 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
                  Quick Specs
                </h3>
                <div className="mt-6 grid gap-3">
                  {service.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl border border-black/8 bg-white px-4 py-3"
                    >
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        {spec.label}
                      </div>
                      <div className="mt-1 text-sm font-bold text-[#1A1A1A]">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Common Applications
                </span>
                <div className="mt-6 space-y-4">
                  {seo.applications.map((application) => (
                    <div key={application} className="flex gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-sm font-light leading-relaxed text-slate-600 md:text-base">
                        {application}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Production Approach
                </span>
                <div className="mt-6 grid gap-4">
                  {seo.process.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-5"
                    >
                      <div className="text-3xl font-display font-black text-black/10">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="mt-2 text-sm font-light leading-relaxed text-slate-600 md:text-base">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#EDEAE4] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Capabilities
            </span>
            <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
              What We Handle for {service.title}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Service FAQs
            </span>
            <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
              Questions Buyers Ask
            </h2>
            <div className="mt-8 space-y-4">
              {seo.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6 md:p-8"
                >
                  <h3 className="text-lg font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-slate-600 md:text-base">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="border-y border-black/8 bg-[#F7F5F1] py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                    Buyer Guides
                  </span>
                  <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
                    Articles Related to {service.title}
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A] transition-colors hover:text-primary"
                >
                  View All Articles
                </Link>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6 transition-colors hover:border-primary/40 hover:bg-white"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                      {post.category}
                    </div>
                    <h3 className="mt-3 text-xl font-display font-black uppercase tracking-tight text-[#1A1A1A]">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-slate-500">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-black/8 bg-[#EDEAE4] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Related Services
                </span>
                <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
                  Explore More Fabrication Services
                </h2>
              </div>
              <Link
                href="/services"
                className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A] transition-colors hover:text-primary"
              >
                View All Services
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedServices.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="group rounded-2xl border border-black/8 bg-[#F7F5F1] p-5 transition-all hover:border-primary/40 hover:bg-white"
                >
                  <h3 className="text-lg font-display font-black uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-slate-500">
                    {item.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    View Service <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1C1C1C] py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter text-white md:text-7xl">
              Need This Service
              <br />
              for Your Project?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-zinc-400 md:text-xl">
              Send your drawing, quantity, material, and delivery requirement.
              Our team will review the job and respond with a practical quotation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 px-8 text-sm font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90"
                asChild
              >
                <Link href={`/contact?service=${service.id}`}>Request Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/20 px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Balaji Engineering Works</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
