import ContactPage from "@/components/site/ContactPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Contact Balaji Engineering Works, Surat";
const description =
  "Contact Balaji Engineering Works in Surat through SheetMetalBendingWorks.com for fabrication service quotes and product requirements including base plates, foundation bolts, purlins, perforated sheets, and steel pallets.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/contact",
  keywords: [
    "contact Balaji Engineering Works Surat",
    "contact sheetmetalbendingworks.com",
    "contact sheet metal bending works",
    "sheet metal shearing cutting surat",
    "cnc press brake bending surat",
    "request fabrication quote Surat",
    "product inquiry Surat",
    "contact steel fabrication company Gujarat",
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
