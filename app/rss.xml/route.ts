import { getPublicBlogs } from "@/lib/public-data";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRssDate(value?: string) {
  if (!value) {
    return new Date().toUTCString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? new Date().toUTCString()
    : parsed.toUTCString();
}

export async function GET() {
  const posts = await getPublicBlogs();

  const items = posts
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.createdAt ?? b.date).getTime() -
        new Date(a.updatedAt ?? a.createdAt ?? a.date).getTime(),
    )
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <description>${escapeXml(post.excerpt)}</description>
          <pubDate>${toRssDate(post.updatedAt ?? post.createdAt ?? post.date)}</pubDate>
          <category>${escapeXml(post.category)}</category>
        </item>
      `.trim();
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
