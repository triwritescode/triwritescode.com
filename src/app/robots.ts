import type { MetadataRoute } from "next";

import config from "@/config/config.json";

const BASE_URL = config.site.base_url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
