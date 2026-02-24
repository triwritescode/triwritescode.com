import type { Template } from "tinacms";

const experienceBlock: Template = {
  name: "experience",
  label: "Experience",
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
      description:
        "The heading for the experience section (e.g., Work experience).",
    },
    {
      name: "description",
      label: "Section Description",
      type: "rich-text",
      description: "Introductory text displayed below the section title.",
    },
    {
      name: "experiences",
      label: "Experience List",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => {
          return {
            label: item.role
              ? `${item.role}${item.company ? ` at ${item.company}` : ""}`
              : "New Experience",
          };
        },
      },
      fields: [
        {
          name: "role",
          label: "Role",
          type: "string",
          required: true,
          description: "Job title (e.g., Software Engineer).",
        },
        {
          name: "company",
          label: "Company",
          type: "string",
          required: true,
          description: "Company name.",
        },
        {
          name: "location",
          label: "Location",
          type: "string",
          description: "Location (e.g., Jakarta, ID).",
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "string",
          description: "Start date as text (e.g., Aug 2022).",
        },
        {
          name: "endDate",
          label: "End Date",
          type: "string",
          description: "End date as text (e.g., Present).",
        },
        {
          name: "description",
          label: "Description",
          type: "rich-text",
          description: "Role description and company context.",
        },
        {
          name: "techStacks",
          label: "Tech Stacks",
          type: "string",
          list: true,
          description: "Technologies used in this role.",
        },
        {
          name: "contributions",
          label: "Contributions",
          type: "string",
          list: true,
          description: "Key contributions and achievements.",
        },
      ],
    },
  ],
};

export default experienceBlock;
