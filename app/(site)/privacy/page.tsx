import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "Privacy policy for Balaji Engineering Works covering inquiry data, communication details, submitted drawings, and confidentiality.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/privacy",
});

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect your name, company name, phone number, email address, project details, drawings, material requirements, and quotation-related communication when you contact Balaji Engineering Works.",
  },
  {
    title: "How We Use Information",
    body: "We use submitted information to prepare quotations, review drawings, discuss manufacturing feasibility, process inquiries, communicate order updates, and support delivery coordination.",
  },
  {
    title: "Confidentiality",
    body: "Customer drawings, specifications, and commercial discussions are treated as confidential and used only for quotation, production review, and order execution purposes.",
  },
  {
    title: "Data Protection",
    body: "We take reasonable operational steps to protect inquiry records and shared files from unauthorized access, misuse, or unnecessary disclosure.",
  },
  {
    title: "Contact",
    body: `For privacy-related questions, please contact ${siteConfig.legalName} at ${siteConfig.email} or ${siteConfig.phoneDisplay}.`,
  },
];

export default function Page() {
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/privacy",
      type: "WebPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy" },
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
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-slate-600 md:text-base">
            This policy explains how {siteConfig.legalName} handles inquiry
            details, contact information, drawings, and business communication
            shared through this website.
          </p>

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
