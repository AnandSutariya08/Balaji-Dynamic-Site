import ProductsPage from "@/components/site/ProductsPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductsData } from "@/lib/productsData";
import {
  buildMetadata,
  createBreadcrumbJsonLd,
  createProductJsonLd,
  createProductsItemListJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo";

const title = "Industrial Steel Products Manufacturer in Surat";
const description =
  "Explore industrial steel products from Balaji Engineering Works including gutters, foundation bolts, base plates, Z/C purlins, perforated sheets, decking sheets, corrugated sheets, walkway planks, conveyor stringers, and steel pallets.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/products",
  keywords: [
    "industrial products manufacturer surat",
    "base plates manufacturer surat",
    "foundation bolt manufacturer surat",
    "foundation bolts manufacturers surat",
    "c and z purlin manufacturer surat",
    "perforated sheet manufacturer gujarat",
    "perforated sheet manufacturer surat",
    "decking sheet supplier surat",
    "corrugated roofing sheets surat",
    "steel pallets manufacturer surat",
    "steel pallets manufacturer india",
    "z c purlins supplier surat",
  ],
  image: "/product-base-plates.png",
});

export default async function Page() {
  const products = await getProductsData();
  const schemas = [
    createWebPageJsonLd({
      title,
      description,
      path: "/products",
      type: "CollectionPage",
    }),
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]),
    createProductsItemListJsonLd(products),
    ...products.map((product) => createProductJsonLd(product)),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <ProductsPage initialProducts={products} />
    </>
  );
}
