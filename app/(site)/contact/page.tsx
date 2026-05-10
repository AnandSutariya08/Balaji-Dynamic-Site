import ContactPage from "@/components/site/ContactPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Contact Balaji Engineering Works";
const description =
  "Contact Balaji Engineering Works in Navagam, Surat for sheet metal bending, CNC laser cutting, plasma cutting, fabrication, and industrial quote requests.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/contact",
  keywords: [
    "contact Balaji Engineering Works Surat",
    "request fabrication quote Surat",
    "contact laser cutting company Gujarat",
  ],
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/contact",
      type: "ContactPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
    createFaqJsonLd(),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <ContactPage defaultService={params.service ?? ""} />
    </>
  );
}
