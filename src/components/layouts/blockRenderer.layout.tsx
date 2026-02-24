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

type BlockRendererProps = {
  block: PageBlocks;
};

const BlockRenderer = ({ block }: BlockRendererProps) => {
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

    default:
      console.warn(`No component found for block type: ${block.__typename}`);
      return null;
  }
};

export default BlockRenderer;
