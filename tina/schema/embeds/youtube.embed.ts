import type { Template } from "tinacms";

/**
 * Rich-text embed template for YouTube videos.
 *
 * Renders in MDX as `<youtube id="..." title="..." />` and is matched by the
 * `youtube` key in the TinaMarkdown component overrides.
 */
const youtubeEmbed: Template = {
  name: "youtube",
  label: "YouTube",
  fields: [
    {
      name: "id",
      label: "Video ID",
      type: "string",
      required: true,
      description:
        "The YouTube video ID, i.e. the part after v= in the URL (https://www.youtube.com/watch?v=VIDEO_ID).",
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      description: "Accessible title for the embedded player.",
    },
  ],
};

export default youtubeEmbed;
