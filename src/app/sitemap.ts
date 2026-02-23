import type { MetadataRoute } from "next";
import client from "@/tina/__generated__/client";
import config from "@/config/config.json";

const BASE_URL = config.site.base_url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPages = ["/", "/work-experience"];

  for (const locale of ["en"]) {
    for (const page of staticPages) {
      // Get localized path from routing config
      const pathnames = {
        "/": "/",
        "/work-experience": "/work-experience",
      } as Record<string, string | Record<string, string>>;
      const pathConfig = pathnames[page];
      let localizedPath: string;

      if (typeof pathConfig === "string") {
        localizedPath = pathConfig;
      } else if (pathConfig && typeof pathConfig === "object") {
        localizedPath = pathConfig[locale] || page;
      } else {
        localizedPath = page;
      }

      entries.push({
        url: `${BASE_URL}/${locale}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1 : 0.8,
      });
    }
  }

  // Dynamic pages from TinaCMS
  try {
    const pagesRes = await client.queries.pageConnection();
    const pages = pagesRes.data.pageConnection.edges || [];

    for (const edge of pages) {
      if (!edge?.node) continue;

      const path = edge.node._sys.relativePath;
      // Skip index and special pages (prefixed with _)
      if (path.includes("_index") || path.includes("/_")) continue;

      // Extract locale and slug from path like "en/about.mdx"
      const match = path.match(/^([^/]+)\/(.+)\.mdx$/);
      if (!match) continue;

      const [, locale, slug] = match;

      entries.push({
        url: `${BASE_URL}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {
    // Continue without dynamic pages if TinaCMS fails
  }

  // Case studies from TinaCMS
  try {
    const caseStudiesRes = await client.queries.caseStudyConnection({
      filter: { draft: { eq: false } },
    });
    const caseStudies = caseStudiesRes.data.caseStudyConnection.edges || [];

    for (const edge of caseStudies) {
      if (!edge?.node) continue;

      const path = edge.node._sys.relativePath;
      // Extract locale and slug from path like "en/project-name.mdx"
      const match = path.match(/^([^/]+)\/(.+)\.mdx$/);
      if (!match) continue;

      const [, locale, slug] = match;

      // Get localized case studies path
      const pathnames = {
        "/work-experience/[slug]": "/work-experience/[slug]",
      } as Record<string, string | Record<string, string>>;
      const caseStudyPath = pathnames["/work-experience/[slug]"];
      let localizedPath: string;

      if (typeof caseStudyPath === "object") {
        localizedPath = (
          caseStudyPath[locale] || "/work-experience/[slug]"
        ).replace("[slug]", slug);
      } else {
        localizedPath = `/work-experience/${slug}`;
      }

      entries.push({
        url: `${BASE_URL}/${locale}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // Continue without case studies if TinaCMS fails
  }

  return entries;
}
