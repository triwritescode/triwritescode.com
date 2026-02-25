import { Collection } from "tinacms";
import seoFields from "./fields/seo.field";

const postSchema: Collection = {
  name: "post",
  label: "Posts",
  path: "src/content/posts",
  format: "mdx",
  ui: {
    router: (props) => {
      return `/posts/${props.document._sys.filename}`;
    },
  },
  fields: [
    {
      name: "draft",
      label: "Draft Mode",
      type: "boolean",
      description:
        "Enable draft mode for this post to preview unpublished changes.",
    },
    {
      name: "title",
      label: "Post Title",
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
      type: "datetime",
      name: "publishedDate",
      label: "Published Date",
      description: "Date when this post was published",
      ui: {
        dateFormat: "YYYY-MM-DD",
      },
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      description: "The main content of the post",
      isBody: true,
    },
  ],
};

export default postSchema;
