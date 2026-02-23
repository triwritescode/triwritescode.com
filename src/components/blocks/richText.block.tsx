import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksRichText } from "@/tina/__generated__/types";
import Youtube from "../shortcodes/youtube.shortcode";

type RichTextBlockProps = PageBlocksRichText;

const RichTextBlock = (props: RichTextBlockProps) => {
  const { enable, sectionId, body } = props;

  if (enable === false) return null;

  return (
    <section id={sectionId || undefined} className="py-12 md:py-16">
      <div className="container mx-auto">
        <article
          data-tina-field={tinaField(props, "body")}
          className="prose prose-sm max-w-3xl mx-auto"
        >
          <TinaMarkdown
            content={props.body}
            components={{
              youtube: ({ id, title }: any) => (
                <div className="my-12">
                  <Youtube id={id} title={title} />
                </div>
              ),
            }}
          />
        </article>
      </div>
    </section>
  );
};

export default RichTextBlock;
