import type { Template } from "tinacms";

const richTextBlock: Template = {
  name: "richText",
  label: "Rich Text Content",
  fields: [
    {
      name: "enable",
      label: "Enable",
      type: "boolean",
      description: "Toggle this section on or off.",
    },
    {
      name: "sectionId",
      label: "Section ID",
      type: "string",
      description:
        "Optional anchor ID for this section. Used for in-page links.",
    },
    {
      name: "body",
      label: "Content",
      type: "rich-text",
      description: "Rich text content for the page section.",
    },
  ],
};

export default richTextBlock;
