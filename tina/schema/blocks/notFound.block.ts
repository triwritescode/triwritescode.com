import type { Template } from "tinacms";

const notFoundBlock: Template = {
  name: "notFound",
  label: "Not Found",
  fields: [
    // All content will be stored in the MDX frontmatter
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
      type: "string",
      name: "title",
      label: "Title",
      description: "The main headline (e.g., 'Page Not Found').",
    },
    {
      type: "rich-text",
      name: "description",
      label: "Description",
      description: "The helpful text explaining what happened.",
    },
    {
      type: "string",
      name: "buttonText",
      label: "Button Text",
      description:
        "The text for the button that links back to the homepage (e.g., 'Return Home').",
    },
    {
      type: "image",
      name: "image",
      label: "Optional Image",
      description: "An optional image to display on the page.",
    },
  ],
};

export default notFoundBlock;
