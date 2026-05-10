import AboutPage from "@/components/site/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "About Balaji Engineering Works";
const description =
  "Learn about Balaji Engineering Works, our fabrication experience since 2001, industrial capabilities, and Surat manufacturing heritage.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/about",
  keywords: [
    "about Balaji Engineering Works",
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
