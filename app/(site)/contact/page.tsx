import ContactPage from "@/components/site/ContactPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Request Fabrication Quote in Surat | Balaji Engineering Works";
const description =
  "Request a fabrication quote in Surat from Balaji Engineering Works for CNC laser cutting, CNC plasma cutting, plate bending, sheet metal job work, and industrial products including base plates, foundation bolts, purlins, and perforated sheets.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/contact",
  keywords: [
    "request fabrication quote Surat",
    "fabrication quotation Surat",
    "sheet metal job work inquiry Surat",
    "contact Balaji Engineering Works Surat",
    "laser cutting quote Surat",
    "cnc plasma cutting quote surat",
    "cnc plate bending quote surat",
    "product inquiry Surat",
    "foundation bolt manufacturer inquiry surat",
    "base plate manufacturer inquiry surat",
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
