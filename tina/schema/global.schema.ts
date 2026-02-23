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
      name: "siteInfo",
      label: "Site Information",
      type: "object",
      fields: [
        {
          type: "string",
          name: "siteName",
          label: "Site Name",
          description: "The official name of the brand (e.g., Siliwacore).",
          required: true,
        },
        {
          type: "string",
          name: "siteTagline",
          label: "Site Tagline",
          description: "A short, catchy phrase for SEO and branding.",
        },
        {
          type: "string",
          name: "companyEmail",
          label: "Contact Email",
        },
        {
          type: "string",
          name: "companyPhone",
          label: "Contact Phone",
        },
      ],
    },
    {
      name: "header",
      label: "Header Settings",
      type: "object",
      fields: [
        {
          name: "logoDark",
          label: "Logo (Dark Mode / Transparent Header)",
          type: "image",
          description:
            "Used on transparent headers over dark backgrounds. Should have light/white text.",
        },
        {
          name: "logoLight",
          label: "Logo (Light Mode / Solid Header)",
          type: "image",
          description: "Used on solid white headers. Should have dark text.",
        },
        {
          name: "navLinks",
          label: "Navigation Links",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => {
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
          name: "logo",
          label: "Footer Logo",
          type: "image",
          description: "Logo displayed in footer (dark background version)",
        },
        {
          name: "tagline",
          label: "Tagline",
          type: "string",
          ui: {
            component: "textarea",
          },
          description: "Description text below the logo",
        },
        {
          name: "slogan",
          label: "Slogan",
          type: "string",
          description:
            "Short slogan text (e.g., Your Best Digital Solutions, Always)",
        },
        {
          name: "contactUs",
          label: "Contact Us",
          type: "object",
          fields: [
            {
              name: "phone",
              label: "Phone Number",
              type: "string",
            },
            {
              name: "instagram",
              label: "Instagram Handle",
              type: "string",
              description: "Instagram username without @",
            },
            {
              name: "instagramUrl",
              label: "Instagram URL",
              type: "string",
            },
            {
              name: "email",
              label: "Email Address",
              type: "string",
            },
          ],
        },
        {
          name: "usefulLinks",
          label: "Useful Links",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => {
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
              name: "link",
              label: "Link",
              type: "string",
            },
          ],
        },
        {
          name: "services",
          label: "Services",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => {
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
              name: "link",
              label: "Link",
              type: "string",
            },
          ],
        },
        {
          name: "copyright",
          label: "Copyright Text",
          type: "string",
        },
        {
          name: "legalLinks",
          label: "Legal Links",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => {
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
              name: "link",
              label: "Link",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "cookieBanner",
      label: "Cookie Banner",
      type: "object",
      description: "GDPR cookie consent banner settings",
      fields: [
        {
          name: "enable",
          label: "Enable Cookie Banner",
          type: "boolean",
          description: "Show the cookie consent banner to visitors",
        },
        {
          name: "title",
          label: "Title",
          type: "string",
          description: "Banner heading (e.g., We value your privacy)",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          ui: {
            component: "textarea",
          },
          description: "Explanation of how cookies are used on the site",
        },
        {
          name: "privacyPolicyLabel",
          label: "Privacy Policy Link Label",
          type: "string",
          description: "Text for the privacy policy link",
        },
        {
          name: "privacyPolicyUrl",
          label: "Privacy Policy URL",
          type: "string",
          description: "URL to the privacy policy page",
        },
        {
          name: "suffix",
          label: "Suffix Text",
          type: "string",
          description:
            'Text after the privacy policy link (e.g., Click "Accept" and this banner will disappear.)',
        },
        {
          name: "acceptLabel",
          label: "Accept Button Label",
          type: "string",
          description: "Text for the accept button (e.g., Accept)",
        },
      ],
    },
  ],
};

export default globalSchema;
