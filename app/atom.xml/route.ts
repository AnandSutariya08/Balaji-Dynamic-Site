import { getPublicBlogsFromFirestore } from "@/lib/firestore/publicBlogsServer";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toAtomDate(value?: string) {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export async function GET() {
  const posts = await getPublicBlogsFromFirestore();
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latestPost = sortedPosts[0];
  const feedUpdated = toAtomDate(latestPost?.date);

  const entries = sortedPosts
    .filter((post) => post.slug && post.title)
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);
      const updated = toAtomDate(post.date);
      return `  <entry>
    <title type="html">${escapeXml(post.title)}</title>
    <link href="${link}" rel="alternate" type="text/html"/>
    <id>${link}</id>
    <updated>${updated}</updated>
    <published>${updated}</published>
    <summary type="html">${escapeXml(post.excerpt ?? "")}</summary>
    <category term="${escapeXml(post.category ?? "Sheet Metal Bending Works")}"/>
    <author>
      <name>${escapeXml(siteConfig.legalName)}</name>
      <email>${siteConfig.email}</email>
      <uri>${siteConfig.url}</uri>
    </author>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-IN">
  <title type="html">${escapeXml(siteConfig.name)}</title>
  <subtitle type="html">${escapeXml(siteConfig.description)}</subtitle>
  <link href="${siteConfig.url}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${siteConfig.url}" rel="alternate" type="text/html"/>
  <id>${siteConfig.url}/atom.xml</id>
  <updated>${feedUpdated}</updated>
  <rights>Copyright ${new Date().getFullYear()} ${escapeXml(siteConfig.legalName)}. All rights reserved.</rights>
  <generator uri="https://nextjs.org/" version="15">Next.js</generator>
  <icon>${absoluteUrl("/favicon.svg")}</icon>
  <logo>${absoluteUrl("/logo.png")}</logo>
  <author>
    <name>${escapeXml(siteConfig.legalName)}</name>
    <email>${siteConfig.email}</email>
    <uri>${siteConfig.url}</uri>
  </author>
${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
