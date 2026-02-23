import { Collection } from "tinacms";

const globalSchema: Collection = {
  name: "global",
  label: "Globals",
  path: "src/content/global",
  format: "mdx",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    global: true,
  },
  fields: [
    {
      name: "header",
      label: "Header Settings",
      type: "object",
      fields: [
        {
          name: "navLinks",
          label: "Navigation Links",
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
                "Icon name from react-icons (e.g., FaHome, FaBriefcase).",
            },
            {
              name: "link",
              label: "Link",
              type: "string",
            },
          ],
        },
        {
          name: "ctaButton",
          label: "Call-to-Action Button",
          type: "object",
          fields: [
            {
              name: "label",
              label: "Button Label",
              type: "string",
            },
            {
              name: "icon",
              label: "Icon",
              type: "string",
              description: "Icon name from react-icons.",
            },
            {
              name: "link",
              label: "Button Link",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "footer",
      label: "Footer Settings",
      type: "object",
      fields: [
        {
          name: "copyright",
          label: "Copyright Text",
          type: "string",
        },
      ],
    },
  ],
};

export default globalSchema;
