import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@tina/__generated__/client";
import { buildMetadata } from "@/components/shortcodes/seoMeta.shortcode";
import PageLayout from "@/components/layouts/page.layout";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageRes = await client.queries.page({
      relativePath: "home.mdx",
    });

    const page = pageRes.data.page;

    return buildMetadata({
      title: page.title || "Home",
      seo: page.seo,
      routePattern: "/",
    });
  } catch {
    return {
      title: "Tri Denda — Software Engineer",
      description:
        "Personal portfolio of Tri Denda, a software engineer and technical lead based in Indonesia.",
    };
  }
}

export default async function Home() {
  try {
    const [pageRes, globalRes] = await Promise.all([
      client.queries.page({ relativePath: "home.mdx" }),
      client.queries.global({ relativePath: "_index.mdx" }),
    ]);

    return (
      <PageLayout initialPageData={pageRes} initialGlobalData={globalRes} />
    );
  } catch {
    return notFound();
  }
}
