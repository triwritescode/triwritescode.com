import { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@tina/__generated__/client";

import PostLayout from "@/components/layouts/post.layout";
import { buildMetadata } from "@/components/shortcodes/seoMeta.shortcode";

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  try {
    const postsRes = await client.queries.postConnection({
      filter: { draft: { eq: false } },
    });
    const posts = postsRes.data.postConnection.edges || [];

    for (const edge of posts) {
      if (!edge?.node) continue;
      const filename = edge.node._sys.filename;
      params.push({ slug: filename });
    }
  } catch {
    // Return empty params if TinaCMS fails - pages will be generated on-demand
  }

  return params;
}

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const postRes = await client.queries.post({
      relativePath: `${slug}.mdx`,
    });

    const post = postRes.data.post;

    if (!post) {
      return {
        title: "Page Not Found",
        description: "The requested content could not be found.",
      };
    }

    return buildMetadata({
      title: post.title || "",
      seo: post.seo,
      routePattern: "/posts/[slug]",
      ogType: "article",
    });
  } catch {
    return {
      title: "Page Not Found",
      description: "The requested content could not be found.",
    };
  }
}

const PostPage = async (props: PostPageProps) => {
  const { slug } = await props.params;

  try {
    const [postRes, globalRes] = await Promise.all([
      client.queries.post({
        relativePath: `${slug}.mdx`,
      }),
      client.queries.global({
        relativePath: `_index.mdx`,
      }),
    ]);

    if (!postRes.data.post) {
      return notFound();
    }

    return (
      <PostLayout initialPostData={postRes} initialGlobalData={globalRes} />
    );
  } catch {
    return notFound();
  }
};

export default PostPage;
