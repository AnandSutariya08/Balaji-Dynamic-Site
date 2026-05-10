import AboutPage from "@/components/site/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "About Balaji Engineering Works";
const description =
  "Learn about Balaji Engineering Works, established in 2001 in Surat, with capabilities in sheet metal forming, CNC laser cutting, plasma cutting, 10 meter bending, and heavy fabrication.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/about",
  keywords: [
    "about Balaji Engineering Works",
    "sheet metal forming company Surat",
    "CNC laser cutting manufacturer Gujarat",
    "metal fabrication manufacturer Surat",
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
