import { Collection } from "tinacms";

import seoFields from "./fields/seo.field";
import summaryBlock from "./blocks/summary.block";
import ctaBlock from "./blocks/cta.block";
import richTextBlock from "./blocks/richText.block";
import notFoundBlock from "./blocks/notFound.block";

const pageSchema: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/pages",
  format: "mdx",
  ui: {
    router: (props) => {
      if (props.document._sys.filename === "home") {
        return `/`;
      }

      return `/${props.document._sys.filename}`;
    },
  },
  fields: [
    {
      name: "draft",
      label: "Draft Mode",
      type: "boolean",
      description:
        "Enable draft mode for this page to preview unpublished changes.",
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      name: "seo",
      label: "SEO Settings",
      fields: seoFields,
    },
    {
      name: "blocks",
      label: "Page Sections",
      type: "object",
      list: true,
      templates: [summaryBlock, ctaBlock, richTextBlock, notFoundBlock],
    },
  ],
};

export default pageSchema;
