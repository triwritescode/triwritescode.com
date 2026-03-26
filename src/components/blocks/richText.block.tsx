import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksRichText } from "@tina/__generated__/types";

import TinaMarkdwonComponents, { proseClasses } from "../shortcodes/tinaMarkdownComponents.shortchode";

type RichTextBlockProps = PageBlocksRichText;

const RichTextBlock = (props: RichTextBlockProps) => {
  const { enable, sectionId, body } = props;

  if (enable === false) return null;

  return (
    <section id={sectionId || undefined} className="py-12 md:py-16">
      <div className="container mx-auto">
        <article
          data-tina-field={tinaField(props, "body")}
          className={proseClasses}
        >
          <TinaMarkdown content={body} components={TinaMarkdwonComponents} />
        </article>
      </div>
    </section>
  );
};

export default RichTextBlock;
