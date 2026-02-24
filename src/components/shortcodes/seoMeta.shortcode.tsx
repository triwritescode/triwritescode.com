import type { Metadata } from "next";

import config from "@/config/config.json";

const BASE_URL = config.site.base_url;

type SeoInput = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonical?: string | null;
  noindex?: boolean | null;
  keywords?: (string | null)[] | null;
};

type BuildMetadataOptions = {
  title: string;
  description?: string;
  seo?: SeoInput | null;
  routePattern: string;
  ogType?: "website" | "article";
  appendSiteName?: boolean;
};

/**
 * Builds a complete Next.js Metadata object with:
 * - Title, description, keywords
 * - Open Graph (og:title, og:description, og:image, og:url, og:type, og:site_name)
 * - Twitter Card
 * - Canonical URL
 * - Robots directives
 */
export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const {
    title,
    description = "",
    seo,
    ogType = "website",
    appendSiteName = false,
  } = options;

  const siteName = config.site.title;

  const pageTitle = seo?.metaTitle || title;
  const pageDescription = seo?.metaDescription || description;
  const pageImage = seo?.ogImage || null;

  const keywords =
    seo?.keywords?.filter((k): k is string => typeof k === "string") || [];

  // Build canonical — prefer CMS value, fallback to computed URL
  const canonical = seo?.canonical || BASE_URL;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords,
    openGraph: {
      type: ogType,
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName,
      images: pageImage ? [pageImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: pageImage ? [pageImage] : [],
    },
    alternates: {
      canonical,
    },
    robots: {
      index: !seo?.noindex,
      follow: !seo?.noindex,
    },
  };
}
