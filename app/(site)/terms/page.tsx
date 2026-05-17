import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "Terms And Conditions";
const description =
  "Terms and conditions for Balaji Engineering Works including quotation basis, payment terms, delivery terms, confidentiality, and customer responsibilities.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/terms",
});

const sections = [
  {
    title: "Quotation Basis",
    body: "All quotations are based on the drawings, specifications, quantities, materials, tolerances, and commercial information shared by the customer at the time of inquiry.",
  },
  {
    title: "Payment Terms",
    body: "50% advance payment is required to confirm an order and begin processing. 100% payment must be completed before delivery or dispatch unless otherwise agreed in writing.",
  },
  {
    title: "Delivery And Dispatch",
    body: "Delivery timelines depend on drawing approval, material availability, machine scheduling, and payment compliance. Dispatch timing may change if technical or commercial details are revised.",
  },
  {
    title: "Confidentiality",
    body: "Customer drawings, files, and business communication are treated as confidential and are used only for quotation, production review, and order execution.",
  },
  {
    title: "Safety And End Use",
    body: "Final design approval, fitment checks, installation safety, load suitability, and end-use compliance remain the responsibility of the customer, consultant, installer, or end user.",
  },
  {
    title: "Jurisdiction",
    body: `Unless otherwise agreed in writing, business dealings with ${siteConfig.legalName} are subject to jurisdiction in Surat, Gujarat, India.`,
  },
];

export default function Page() {
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/terms",
      type: "WebPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Terms And Conditions", path: "/terms" },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <section className="bg-[#F7F5F1] px-4 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Legal
          </span>
          <h1 className="mt-4 font-display text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] md:text-6xl">
            Terms And Conditions
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-slate-600 md:text-base">
            These terms apply to website inquiries, quotations, fabrication
            discussions, and commercial supply by {siteConfig.legalName}.
          </p>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">
              Key Commercial Terms
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              50% advance payment is required to confirm an order.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
              100% payment must be completed before delivery or dispatch.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-black/8 bg-white p-6 md:p-8"
              >
                <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
