import { Collection } from "tinacms";

import { slugify } from "@/src/lib/slugify";
import heroBlock from "@/tina/schema/blocks/hero.block";
import featureBlock from "@/tina/schema/blocks/feature.block";
import seoFields from "@/tina/schema/fields/seo.field";
import caseStudyListBlock from "@/tina/schema/blocks/caseStudyList.block";
import recentCaseStudiesBlock from "@/tina/schema/blocks/recentCaseStudies.block";
import notFoundBlock from "@/tina/schema/blocks/notFound.block";
import trustedByBlock from "@/tina/schema/blocks/trustedBy.block";
import mediaWithTextBlock from "@/tina/schema/blocks/mediaWithText.block";
import spacerBlock from "@/tina/schema/blocks/spacer.block";
import testimonialsBlock from "@/tina/schema/blocks/testimonials.block";
import ourProcessBlock from "@/tina/schema/blocks/ourProcess.block";
import ctaBlock from "@/tina/schema/blocks/cta.block";
import faqBlock from "@/tina/schema/blocks/faq.block";
import pricingBlock from "@/tina/schema/blocks/pricing.block";
import richTextBlock from "@/tina/schema/blocks/richText.block";
import contactFormBlock from "@/tina/schema/blocks/contactForm.block";

const pageSchema: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/pages",
  format: "mdx",
  ui: {
    router: (props) => {
      const locale = props.document._sys.breadcrumbs[0];

      // Handle the homepage, which has a slug of "home".
      if (props.document._sys.filename === "_index") {
        return `/${locale}`;
      }

      return `/${props.document._sys.breadcrumbs[0]}/${props.document._sys.filename}`;
    },
    filename: {
      readonly: true,
      slugify: (values) => {
        return slugify(values.title || "");
      },
    },
  },
  fields: [
    {
      name: "draft",
      label: "Draft Mode",
      type: "boolean",
      description:
        "Enable draft mode for this page to preview unpublished changes.",
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "locale",
      label: "Locale",
      required: true,
      description: "This field specifies the language for this page.",
      options: [
        { label: "English", value: "en" },
        { label: "Bahasa Indonesia", value: "id" },
      ],
    },
    {
      type: "string",
      name: "translationKey",
      label: "Translation Key",
      required: true,
    },
    {
      type: "string",
      name: "headerVariant",
      label: "Header Style",
      description:
        "Choose the header style. Transparent overlays the hero with light text; Solid uses a white background with dark text.",
      options: [
        { label: "Transparent (over hero)", value: "transparent" },
        { label: "Solid (white background)", value: "solid" },
      ],
    },
    {
      type: "object",
      name: "seo",
      label: "SEO Settings",
      fields: seoFields,
    },
    {
      name: "blocks",
      label: "Page Sections",
      type: "object",
      list: true,
      templates: [
        // Add all your available blocks here
        heroBlock,
        trustedByBlock,
        mediaWithTextBlock,
        featureBlock,
        spacerBlock,
        testimonialsBlock,
        caseStudyListBlock,
        recentCaseStudiesBlock,
        notFoundBlock,
        ourProcessBlock,
        ctaBlock,
        faqBlock,
        pricingBlock,
        richTextBlock,
        contactFormBlock,
      ],
    },
  ],
};

export default pageSchema;
