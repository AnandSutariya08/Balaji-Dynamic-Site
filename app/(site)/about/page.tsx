import AboutPage from "@/components/site/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "About Balaji Engineering Works in Surat";
const description =
  "Learn about Balaji Engineering Works, the Surat-based manufacturing company behind SheetMetalBendingWorks.com, established in 2001 for bending, cutting, fabrication, and heavy engineering work.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/about",
  keywords: [
    "about Balaji Engineering Works",
    "about sheetmetalbendingworks.com",
    "Balaji Engineering Works manufacturer Surat",
    "steel fabrication company Surat history",
    "metal fabrication manufacturer Gujarat",
  ],
});

export default function Page() {
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/about",
      type: "AboutPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <AboutPage />
    </>
  );
}
