import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@tina/__generated__/client";
import { buildMetadata } from "@/components/shortcodes/seoMeta.shortcode";
import PageLayout from "@/components/layouts/page.layout";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

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
      params.push({ locale, slug });
    }
  } catch {
    // Return empty params if TinaCMS fails - pages will be generated on-demand
    return [];
  }

  return params;
}

type RegularPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const RegularPage = async ({ params }: RegularPageProps) => {
  try {
    const { locale, slug } = await params;
    const [pageRes, globalRes] = await Promise.all([
      client.queries.page({ relativePath: `${locale}/${slug}.mdx` }),
      client.queries.global({ relativePath: "_index.mdx" }),
    ]);

    return (
      <PageLayout initialPageData={pageRes} initialGlobalData={globalRes} />
    );
  } catch {
    return notFound();
  }
};

export default RegularPage;
