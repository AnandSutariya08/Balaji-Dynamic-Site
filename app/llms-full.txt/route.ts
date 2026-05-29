import { getProductsData } from "@/lib/productsData";
import { staticServices } from "@/lib/servicesData";
import { sectorsData } from "@/lib/sectorsData";
import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export async function GET() {
  const services = staticServices;
  const products = await getProductsData();
  const posts = await getPublicBlogsFromFirestore();

  const serviceBlocks = services
    .map((service) => {
      const features = service.features.map((feature) => `  - ${feature}`).join("\n");
      const specs = service.specs
        .map((spec) => `  - ${spec.label}: ${spec.value}`)
        .join("\n");

      return `### ${service.title}
URL: ${absoluteUrl(`/services/${service.id}`)}
Tagline: ${service.tagline}
Description: ${service.description}
Features:
${features}
Specifications:
${specs}`;
    })
    .join("\n\n");

  const productBlocks = products
    .map((product) => {
      const features = product.features.map((feature) => `  - ${feature}`).join("\n");
      const specs = product.specs
        .map((spec) => `  - ${spec.label}: ${spec.value}`)
        .join("\n");

      return `### ${product.title}
URL: ${absoluteUrl(`/products/${product.id}`)}
Tagline: ${product.tagline}
Description: ${product.description}
Applications:
${product.applications.map((item) => `  - ${item}`).join("\n")}
Features:
${features}
Specifications:
${specs}`;
    })
    .join("\n\n");

  const sectorBlocks = sectorsData
    .map((sector) => {
      const sectorServices = sector.services.map((s) => `  - ${s}`).join("\n");
      const applications = sector.applications.map((a) => `  - ${a}`).join("\n");

      return `### ${sector.name}
URL: ${absoluteUrl(`/sectors/${sector.id}`)}
Description: ${sector.description}
Services provided:
${sectorServices}
Applications:
${applications}`;
    })
    .join("\n\n");

  const articleBlocks = posts
    .map((post) => {
      const body = stripHtml(post.content).slice(0, 1200);

      return `### ${post.title}
URL: ${absoluteUrl(`/blog/${post.slug}`)}
Category: ${post.category}
Published: ${post.date}
Read time: ${post.readTime}
Excerpt: ${post.excerpt}
Summary: ${body}`;
    })
    .join("\n\n");

  const content = `# ${siteConfig.name} Full Context

> Extended AI-readable business, services, and article context for ${siteConfig.url}

## Company

- Legal name: ${siteConfig.legalName}
- Alternate name: ${siteConfig.alternateName}
- Founded: ${siteConfig.foundingDate}
- Type: ${siteConfig.businessType}
- GST: ${siteConfig.gstNumber}
- Phone: ${siteConfig.phoneDisplay}
- Email: ${siteConfig.email}
- Address: ${siteConfig.address.streetAddress}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}, India
- IndiaMART profile: ${siteConfig.indiaMartProfile}
- Service areas: ${siteConfig.serviceAreas.join(", ")}
- Industries: ${siteConfig.industries.join(", ")}

## Services

${serviceBlocks}

## Products

${productBlocks}

## Sectors

${sectorBlocks}

## Articles

${articleBlocks}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
