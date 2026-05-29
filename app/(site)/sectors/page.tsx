import SectorsPage from "@/components/site/SectorsPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Industries Served by Sheet Metal Bending Works Surat | Automotive, Construction, Energy & More | Balaji Engineering Works";
const description =
  "Balaji Engineering Works provides sheet metal bending works services for automotive, aviation, construction, energy, defense, marine, railway, mining, chemical, and general manufacturing industries across Surat and Gujarat.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/sectors",
  keywords: [
    "industries we serve sheet metal",
    "sheet metal sectors india",
    "automotive fabrication supplier",
    "construction metal fabrication",
    "defense metal components",
    "railway sheet metal parts",
  ],
});

export default function Page() {
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/sectors",
      type: "CollectionPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Sectors", path: "/sectors" },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <SectorsPage />
    </>
  );
}

