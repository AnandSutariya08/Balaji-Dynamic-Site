import { getPublicBlogs, getPublicServices } from "@/lib/public-data";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export async function GET() {
  const [services, posts] = await Promise.all([
    getPublicServices(),
    getPublicBlogs(),
  ]);

  const serviceBlocks = services
    .map((service) => {
      const features = service.features.map((feature) => `  - ${feature}`).join("\n");
      const specs = service.specs
        .map((spec) => `  - ${spec.label}: ${spec.value}`)
        .join("\n");

      return `### ${service.title}
URL: ${absoluteUrl("/services")}#${service.id}
Tagline: ${service.tagline}
Description: ${service.description}
Features:
${features}
Specifications:
${specs}`;
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
- Address: ${siteConfig.address.streetAddress}, ${siteConfig.address.locality}, ${siteConfig.address.region}, ${siteConfig.address.postalCode}, ${siteConfig.address.country}
- Service areas: ${siteConfig.serviceAreas.join(", ")}
- Industries: ${siteConfig.industries.join(", ")}

## Services

${serviceBlocks}

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
