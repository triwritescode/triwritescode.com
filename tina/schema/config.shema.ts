import { Collection } from "tinacms";

const configSchema: Collection = {
  name: "config",
  label: "Config",
  path: "src/config",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    global: true,
  },
  fields: [
    {
      name: "site",
      label: "Site",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
        {
          name: "base_url",
          label: "Base URL",
          type: "string",
        },
      ],
    },
    {
      name: "google_tag_manager",
      label: "Google Tag Manager",
      type: "object",
      fields: [
        {
          name: "enable",
          label: "Enable",
          type: "boolean",
        },
        {
          name: "gtm_id",
          label: "GTM ID",
          type: "string",
        },
      ],
    },
  ],
};

export default configSchema;
