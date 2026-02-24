import type { MetadataRoute } from "next";
import client from "@tina/__generated__/client";

import config from "@/config/config.json";

const BASE_URL = config.site.base_url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/work", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/projects", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/posts", changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Dynamic pages from TinaCMS
  try {
    const pagesRes = await client.queries.pageConnection();
    const pages = pagesRes.data.pageConnection.edges || [];

    for (const edge of pages) {
      if (!edge?.node) continue;

      const path = edge.node._sys.relativePath;
      // Skip home page (already added) and special pages (prefixed with _)
      if (path === "home.mdx" || path.startsWith("_")) continue;

      // Convert "about.mdx" to "/about"
      const slug = path.replace(/\.mdx$/, "");

      entries.push({
        url: `${BASE_URL}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {
    // Continue without dynamic pages if TinaCMS fails
  }

  return entries;
}
