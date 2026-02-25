import dynamic from "next/dynamic";
import type { PageBlocks } from "@tina/__generated__/types";

const DynamicSummary = dynamic(() =>
  import("@/components/blocks/summary.block").then((mod) => mod.default),
);
const DynamicCallToAction = dynamic(() =>
  import("@/components/blocks/callToAction.block").then((mod) => mod.default),
);
const DynamicRichText = dynamic(() =>
  import("@/components/blocks/richText.block").then((mod) => mod.default),
);
const DynamicNotFound = dynamic(() =>
  import("@/components/blocks/notFound.block").then((mod) => mod.default),
);
const DynamicExperience = dynamic(() =>
  import("@/components/blocks/experience.block").then((mod) => mod.default),
);
const DynamicProjects = dynamic(() =>
  import("@/components/blocks/projects.block").then((mod) => mod.default),
);
const DynamicPostList = dynamic(() =>
  import("@/components/blocks/postList.block").then((mod) => mod.default),
);

type PostEdge = {
  node?: {
    _sys: { filename: string };
    title?: string | null;
    publishedDate?: string | null;
  } | null;
};

type BlockRendererProps = {
  block: PageBlocks;
  posts?: PostEdge[] | null;
};

const BlockRenderer = ({ block, posts }: BlockRendererProps) => {
  switch (block.__typename) {
    case "PageBlocksSummary":
      return <DynamicSummary {...block} />;

    case "PageBlocksCta":
      return <DynamicCallToAction {...block} />;

    case "PageBlocksRichText":
      return <DynamicRichText {...block} />;

    case "PageBlocksNotFound":
      return <DynamicNotFound {...block} />;

    case "PageBlocksExperience":
      return <DynamicExperience {...block} />;

    case "PageBlocksProjects":
      return <DynamicProjects {...block} />;

    case "PageBlocksPostList":
      return <DynamicPostList {...block} posts={posts} />;

    default:
      console.warn(`No component found for block type: ${block.__typename}`);
      return null;
  }
};

export default BlockRenderer;
