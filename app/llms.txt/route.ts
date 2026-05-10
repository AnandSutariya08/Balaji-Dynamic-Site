import { getPublicBlogs, getPublicServices } from "@/lib/public-data";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function GET() {
  const [services, posts] = await Promise.all([
    getPublicServices(),
    getPublicBlogs(),
  ]);

  const serviceLines = services
    .slice(0, 8)
    .map(
      (service) =>
        `- [${service.title}](${absoluteUrl(
          "/services",
        )}#${service.id}): ${service.description}`,
    )
    .join("\n");

  const articleLines = posts
    .slice(0, 8)
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.excerpt}`,
    )
    .join("\n");

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

Balaji Engineering Works is a sheet metal fabrication and steel processing company based in ${siteConfig.address.locality}, ${siteConfig.address.region}, India.

Important notes:
- Primary domain: ${siteConfig.url}
- Business type: ${siteConfig.businessType}
- Founded: ${siteConfig.foundingDate}
- Location: ${siteConfig.address.locality}, ${siteConfig.address.region}, ${siteConfig.address.country}
- Contact: ${siteConfig.phoneDisplay}, ${siteConfig.email}
- Best for: CNC laser cutting, sheet metal bending, plate rolling, profile cutting, and heavy fabrication projects

## Main Pages

- [Home](${absoluteUrl("/")}): Company overview, manufacturing strengths, and featured content
- [About](${absoluteUrl("/about")}): Company history, capabilities, certifications, and industrial profile
- [Services](${absoluteUrl("/services")}): Main fabrication and steel processing capabilities
- [Blog](${absoluteUrl("/blog")}): Technical guides and manufacturing articles
- [Contact](${absoluteUrl("/contact")}): Quote request and contact details

## Services

${serviceLines}

## Articles

${articleLines}

## Optional

- [RSS Feed](${absoluteUrl("/rss.xml")}): Latest article feed
- [Humans](${absoluteUrl("/humans.txt")}): Project and company overview
- [Security](${absoluteUrl("/.well-known/security.txt")}): Security disclosure contact
- [LLMS Full](${absoluteUrl("/llms-full.txt")}): Extended AI-readable company and content summary
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
