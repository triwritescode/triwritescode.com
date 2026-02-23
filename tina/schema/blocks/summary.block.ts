import type { Template } from "tinacms";

const summaryBlock: Template = {
  name: "summary",
  label: "Summary",
  fields: [
    {
      name: "enable",
      label: "Enable",
      type: "boolean",
      description: "Toggle this section on or off.",
    },
    {
      name: "avatar",
      label: "Avatar",
      type: "image",
      description: "Profile photo displayed next to the name.",
    },
    {
      name: "name",
      label: "Name",
      type: "string",
      description: "Your full name.",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "string",
      description: "Your role and company (e.g., Software Engineer at Company).",
    },
    {
      name: "bio",
      label: "Bio",
      type: "rich-text",
      description: "Your bio / about section. Supports bold text and links.",
    },
    {
      name: "socialLinks",
      label: "Social Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => {
          return { label: item.label };
        },
      },
      fields: [
        {
          name: "label",
          label: "Label",
          type: "string",
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          description:
            "Icon name from react-icons (e.g., FaGithub, FaLinkedin).",
        },
        {
          name: "url",
          label: "URL",
          type: "string",
        },
      ],
    },
  ],
};

export default summaryBlock;
