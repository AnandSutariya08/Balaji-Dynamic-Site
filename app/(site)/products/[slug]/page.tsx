import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { getProductDataById, getProductsData } from "@/lib/productsData";
import { staticServices } from "@/lib/servicesData";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createProductJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

export async function generateStaticParams() {
  const products = await getProductsData();
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDataById(slug);

  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      description: "The requested product page could not be found.",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: `/products/${product.id}`,
    image: product.image,
    keywords: [...product.keywords, product.title, "Balaji Engineering Works"],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProductsData();
  const product = products.find((item) => item.id === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);
  const relatedServices = staticServices.slice(0, 4);
  const path = `/products/${product.id}`;
  const schemas = [
    createWebPageJsonLd({
      title: product.metaTitle,
      description: product.metaDescription,
      path,
      type: "ItemPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.title, path },
    ]),
    createProductJsonLd(product),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <div className="bg-[#F7F5F1]">
        <PageHero
          imageSrc={product.image}
          imageAlt={`${product.title} manufactured by Balaji Engineering Works in Surat`}
          pill={(
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-primary">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] sm:text-[10px]">
                Surat Product Manufacturing
              </span>
            </div>
          )}
          title={<span className="text-white">{product.title}</span>}
          description={<>{product.metaDescription}</>}
          stats={[
            { v: "25+", l: "Years" },
            { v: "Custom", l: "Build" },
            { v: "Surat", l: "Plant" },
          ]}
        >
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-12 bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/90" asChild>
              <Link href={`/contact?service=${product.id}`}>Request Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-white/20 px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10" asChild>
              <Link href="/contact">Talk to Engineering Team</Link>
            </Button>
          </div>
        </PageHero>

        <section className="border-y border-black/8 bg-[#EDEAE4] py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Product Overview
                </span>
                <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
                  {product.metaTitle}
                </h2>
                <p className="mt-6 text-base font-light leading-relaxed text-slate-600 md:text-lg">
                  {product.description}
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-6 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
                  Quick Specs
                </h3>
                <div className="mt-6 grid gap-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="rounded-xl border border-black/8 bg-white px-4 py-3">
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
                  {product.applications.map((application) => (
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
                  {product.process.map((step, index) => (
                    <div key={step} className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-5">
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
              Product Capabilities
            </span>
            <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
              What We Can Customize for {product.title}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-5">
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
              Product FAQs
            </span>
            <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
              Questions Buyers Ask
            </h2>
            <div className="mt-8 space-y-4">
              {product.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-black/8 bg-[#EDEAE4] p-6 md:p-8">
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

        <section className="border-y border-black/8 bg-[#EDEAE4] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Related Products
                </span>
                <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
                  Explore More Products
                </h2>
              </div>
              <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A] transition-colors hover:text-primary">
                View All Products
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group rounded-2xl border border-black/8 bg-[#F7F5F1] p-5 transition-all hover:border-primary/40 hover:bg-white"
                >
                  <h3 className="text-lg font-display font-black uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-slate-500">
                    {item.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    View Product <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#F7F5F1] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Related Services
                </span>
                <h2 className="mt-4 text-3xl font-display font-black uppercase tracking-tighter text-[#1A1A1A] md:text-5xl">
                  Supporting Manufacturing Services
                </h2>
              </div>
              <Link href="/services" className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A] transition-colors hover:text-primary">
                View All Services
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group rounded-2xl border border-black/8 bg-[#EDEAE4] p-5 transition-all hover:border-primary/40 hover:bg-white"
                >
                  <h3 className="text-lg font-display font-black uppercase tracking-tight text-[#1A1A1A] transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-slate-500">
                    {service.tagline}
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
              Need This Product
              <br />
              for Your Project?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-zinc-400 md:text-xl">
              Send your drawing, quantity, material, and application details. Our team will review the requirement and share a practical quote.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/90" asChild>
                <Link href={`/contact?service=${product.id}`}>Request Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 border-white/20 px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Balaji Engineering Works</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
