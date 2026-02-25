import { notFound } from "next/navigation";
import type { Metadata } from "next";
import client from "@tina/__generated__/client";

import type { PostConnection } from "@tina/__generated__/types";
import PageLayout from "@/components/layouts/page.layout";
import { buildMetadata } from "@/components/shortcodes/seoMeta.shortcode";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageRes = await client.queries.page({
      relativePath: `posts.mdx`,
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
      routePattern: "/posts",
    });
  } catch {
    return {
      title: "Page Not Found",
      description: "The requested content could not be found.",
    };
  }
}

const PostsPage = async () => {
  try {
    const [pageRes, globalRes] = await Promise.all([
      client.queries.page({
        relativePath: `posts.mdx`,
      }),
      client.queries.global({
        relativePath: `_index.mdx`,
      }),
    ]);

    const hasPostList = pageRes.data.page.blocks?.some(
      (block) => block?.__typename === "PageBlocksPostList",
    );

    const postsRes = hasPostList
      ? await client.queries.postConnection({
          filter: {
            draft: {
              eq: false,
            },
          },
        })
      : null;

    return (
      <PageLayout
        initialPageData={pageRes}
        initialGlobalData={globalRes}
        initialPostsData={{
          data: postsRes?.data?.postConnection as PostConnection | null,
        }}
      />
    );
  } catch {
    return notFound();
  }
};

export default PostsPage;
