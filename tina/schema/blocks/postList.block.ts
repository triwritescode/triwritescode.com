import type { Template } from "tinacms";

const postListBlock: Template = {
  name: "postList",
  label: "Post List",
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
      description: "The heading for the blog section (e.g., Blog).",
    },
    {
      name: "description",
      label: "Section Description",
      type: "rich-text",
      description: "Introductory text displayed below the section title.",
    },
    {
      name: "postsPerPage",
      label: "Posts Per Page",
      type: "number",
      description: "Number of posts to display per page.",
    },
  ],
};

export default postListBlock;
