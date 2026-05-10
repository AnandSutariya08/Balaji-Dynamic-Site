import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { getPublicServices } from "@/lib/public-data";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createServiceJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

function keywordPhrases(serviceTitle: string) {
  return [
    `${serviceTitle} Surat`,
    `${serviceTitle} Gujarat`,
    `${serviceTitle} India`,
    `industrial ${serviceTitle.toLowerCase()}`,
  ];
}

export async function generateStaticParams() {
  const services = await getPublicServices();
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await getPublicServices();
  const service = services.find((item) => item.id === slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${service.title} in Surat`,
    description: service.description,
    path: `/services/${service.id}`,
    image: service.image,
    keywords: keywordPhrases(service.title),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await getPublicServices();
  const service = services.find((item) => item.id === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  const title = `${service.title} in Surat`;
  const description = service.description;

  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: `/services/${service.id}`,
      type: "Service",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path: `/services/${service.id}` },
    ]),
    createServiceJsonLd(service),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <div className="bg-[#F7F5F1]">
        <section className="relative overflow-hidden bg-[#151515] text-white">
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/45" />
          </div>
          <div className="container relative z-10 mx-auto px-4 pb-20 pt-32 md:pb-24 md:pt-36">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
              Service Detail
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href={`/contact?service=${service.id}`}>
                  Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <a href={`tel:${siteConfig.phone}`}>
                  Call Now <Phone className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#EDEAE4] py-10 md:py-14">
          <div className="container mx-auto grid gap-4 px-4 sm:grid-cols-2 xl:grid-cols-4">
            {service.specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-black/8 bg-[#F7F5F1] p-6"
              >
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                  {spec.label}
                </div>
                <div className="mt-3 text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Why This Service
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#1A1A1A] md:text-5xl">
                Precision, Capacity, and Industrial Reliability
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                {service.tagline}. We support fabrication buyers, project teams, and
                industrial procurement teams looking for dependable turnaround,
                dimensional consistency, and strong production support from a Surat-based
                manufacturer.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-xl bg-[#EDEAE4] p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-black/8 bg-[#EDEAE4] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                Best For
              </p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
                <p>Custom industrial fabrication requirements</p>
                <p>Repeat production jobs with dimensional consistency</p>
                <p>Projects needing CNC accuracy and fast turnaround</p>
                <p>Steel, stainless steel, and structural fabrication requirements</p>
              </div>
              <div className="mt-8 rounded-2xl bg-[#F7F5F1] p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                  Service Area
                </div>
                <div className="mt-2 text-sm font-bold text-[#1A1A1A]">
                  {siteConfig.serviceAreas.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="border-t border-black/8 bg-[#EDEAE4] py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                    Related Services
                  </p>
                  <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#1A1A1A] md:text-5xl">
                    Explore More Capabilities
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="hidden text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-primary md:inline-flex"
                >
                  View All
                </Link>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {relatedServices.map((item) => (
                  <Link
                    key={item.id}
                    href={`/services/${item.id}`}
                    className="group overflow-hidden rounded-2xl border border-black/8 bg-[#F7F5F1]"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                        {item.tagline}
                      </div>
                      <h3 className="mt-3 text-xl font-black uppercase tracking-tight text-[#1A1A1A] group-hover:text-primary">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
