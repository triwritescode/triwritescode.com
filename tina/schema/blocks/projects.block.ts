import type { Template } from "tinacms";

const projectsBlock: Template = {
  name: "projects",
  label: "Projects",
  fields: [
    {
      name: "enable",
      label: "Enable",
      type: "boolean",
      description: "Toggle this section on or off.",
    },
    {
      name: "title",
      label: "Section Title",
      type: "string",
      description: "The heading for the projects section (e.g., Projects).",
    },
    {
      name: "description",
      label: "Section Description",
      type: "rich-text",
      description: "Introductory text displayed below the section title.",
    },
    {
      name: "projects",
      label: "Project List",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => {
          return {
            label: item.title || "New Project",
          };
        },
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          required: true,
          description: "Project name.",
        },
        {
          name: "description",
          label: "Description",
          type: "rich-text",
          description: "Project description and context.",
        },
        {
          name: "logo",
          label: "Logo",
          type: "image",
          description: "Project logo image.",
        },
        {
          name: "achievements",
          label: "Achievements",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: Record<string, string>) => {
              return {
                label: item.label
                  ? `${item.label}: ${item.value || ""}`
                  : "New Achievement",
              };
            },
          },
          fields: [
            {
              name: "label",
              label: "Label",
              type: "string",
              description: "Achievement label (e.g., Active Users).",
            },
            {
              name: "value",
              label: "Value",
              type: "string",
              description: "Achievement value (e.g., 144+).",
            },
          ],
        },
        {
          name: "images",
          label: "Highlight Images",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: Record<string, string>) => {
              return {
                label: item.alt || "Image",
              };
            },
          },
          fields: [
            {
              name: "src",
              label: "Image",
              type: "image",
              description: "Screenshot or highlight image.",
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string",
              description: "Image description for accessibility.",
            },
          ],
        },
        {
          name: "links",
          label: "Links",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: Record<string, string>) => {
              return {
                label: item.label || "New Link",
              };
            },
          },
          fields: [
            {
              name: "icon",
              label: "Icon",
              type: "string",
              description:
                "Icon name from react-icons (e.g., FiGlobe, FiGithub).",
            },
            {
              name: "label",
              label: "Label",
              type: "string",
              description: "Link text (e.g., Visit Website).",
            },
            {
              name: "url",
              label: "URL",
              type: "string",
              description: "Link destination.",
            },
          ],
        },
      ],
    },
  ],
};

export default projectsBlock;
