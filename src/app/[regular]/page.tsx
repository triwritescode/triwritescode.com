import { notFound } from "next/navigation";
import client from "@tina/__generated__/client";

import PageLayout from "@/components/layouts/page.layout";
import { buildMetadata } from "@/components/shortcodes/seoMeta.shortcode";
import { Metadata } from "next";

export async function generateStaticParams() {
  const params: { regular: string }[] = [];

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

      const [regular] = match;
      params.push({ regular });
    }
  } catch {
    // Return empty params if TinaCMS fails - pages will be generated on-demand
    return [];
  }

  return params;
}

export async function generateMetadata(
  props: RegularPageProps,
): Promise<Metadata> {
  const { regular } = await props.params;

  try {
    const pageRes = await client.queries.page({
      relativePath: `${regular}.mdx`,
    });

    const page = pageRes.data.page;

    if (!page) {
      return {
        title: "Page Not Found",
        description: "The requested content could not be found.",
      };
    }

    return buildMetadata({
      title: page.title || "",
      seo: page.seo,
      routePattern: "/[regular]",
    });
  } catch {
    return {
      title: "Page Not Found",
      description: "The requested content could not be found.",
    };
  }
}

type RegularPageProps = {
  params: Promise<{ regular: string }>;
};

const RegularPage = async ({ params }: RegularPageProps) => {
  try {
    const { regular } = await params;
    const [pageRes, globalRes] = await Promise.all([
      client.queries.page({ relativePath: `${regular}.mdx` }),
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
