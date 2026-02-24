import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@tina/__generated__/client";
import { buildMetadata } from "@/components/shortcodes/seoMeta.shortcode";
import PageLayout from "@/components/layouts/page.layout";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageRes = await client.queries.page({
      relativePath: "projects.mdx",
    });

    const page = pageRes.data.page;

    return buildMetadata({
      title: page.title || "Projects",
      seo: page.seo,
      routePattern: "/projects",
    });
  } catch {
    return {
      title: "Tri Denda — Projects",
      description:
        "Explore Tri Denda's professional journey, technical leadership roles, and contributions across diverse engineering teams.",
    };
  }
}

export default async function Projects() {
  try {
    const [pageRes, globalRes] = await Promise.all([
      client.queries.page({ relativePath: "projects.mdx" }),
      client.queries.global({ relativePath: "_index.mdx" }),
    ]);

    return (
      <PageLayout initialPageData={pageRes} initialGlobalData={globalRes} />
    );
  } catch {
    return notFound();
  }
}
