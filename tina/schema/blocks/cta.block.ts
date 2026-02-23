import type { Template } from "tinacms";

const ctaBlock: Template = {
  name: "cta",
  label: "Call to Action",
  fields: [
    {
      name: "enable",
      label: "Enable",
      type: "boolean",
      description: "Toggle this section on or off.",
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      description: "The headline for the CTA section.",
    },
    {
      name: "description",
      label: "Description",
      type: "rich-text",
      description:
        "The body text for the CTA. Supports inline links and formatting.",
    },
  ],
};

export default ctaBlock;
