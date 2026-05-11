import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
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
  const posts = await getPublicBlogsFromFirestore();
  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime(),
  );
  const latestPostDate = sortedPosts[0]?.date;

  const items = sortedPosts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <description>${escapeXml(post.excerpt)}</description>
          <pubDate>${toRssDate(post.date)}</pubDate>
          <category>${escapeXml(post.category)}</category>
        </item>
      `.trim();
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-IN</language>
    <lastBuildDate>${toRssDate(latestPostDate)}</lastBuildDate>
    <managingEditor>${siteConfig.email} (${escapeXml(siteConfig.legalName)})</managingEditor>
    <image>
      <url>${absoluteUrl(siteConfig.ogImage)}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${siteConfig.url}</link>
    </image>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
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
