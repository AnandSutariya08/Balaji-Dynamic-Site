import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${siteConfig.shortName}</ShortName>
  <Description>Search ${siteConfig.name} — Sheet Metal Bending Works, CNC Fabrication &amp; Laser Cutting services in Surat</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <OutputEncoding>UTF-8</OutputEncoding>
  <Language>en-IN</Language>
  <Image width="16" height="16" type="image/svg+xml">${siteConfig.url}/favicon.svg</Image>
  <Image width="64" height="64" type="image/png">${siteConfig.url}/logo.png</Image>
  <Url type="text/html" method="get" template="${siteConfig.url}/search?q={searchTerms}"/>
  <Url type="application/opensearchdescription+xml" rel="self" template="${siteConfig.url}/opensearch.xml"/>
  <Url type="application/rss+xml" rel="results" template="${siteConfig.url}/rss.xml"/>
  <Query role="example" searchTerms="sheet metal bending works"/>
  <Developer>${siteConfig.legalName}</Developer>
  <Contact>${siteConfig.email}</Contact>
  <Tags>sheet metal bending works CNC fabrication laser cutting Surat Gujarat India</Tags>
  <LongName>${siteConfig.name}</LongName>
  <Attribution>Search powered by ${siteConfig.name} — ${siteConfig.url}</Attribution>
  <SyndicationRight>open</SyndicationRight>
  <AdultContent>false</AdultContent>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
