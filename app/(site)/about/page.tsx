import AboutPage from "@/components/site/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "About Balaji Engineering Works | Sheet Metal Bending Works Manufacturer Since 2001, Surat";
const description =
  "Balaji Engineering Works is a Surat-based sheet metal bending works manufacturer established in 2001 — providing CNC laser cutting, plasma cutting, press brake bending, plate rolling, and industrial steel fabrication for industries across Gujarat and India.";

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
