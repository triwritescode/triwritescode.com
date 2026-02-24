"use client";

import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/react";

type CallToActionBlockProps = {
  enable?: boolean | null;
  title?: string | null;
  description?: TinaMarkdownContent;
};

const CallToActionBlock = (props: CallToActionBlockProps) => {
  if (props.enable === false) return null;

  return (
    <section className="container sm:px-12! mb-12">
      <div
        data-tina-field={tinaField(props, "enable")}
        className="rounded-2xl border border-accent/20 bg-secondary px-6 py-8 sm:px-8 sm:py-10 text-center"
      >
        {props.title && (
          <h2
            data-tina-field={tinaField(props, "title")}
            className="mb-3 text-2xl font-bold text-white"
          >
            {props.title}
          </h2>
        )}
        {props.description && (
          <div
            data-tina-field={tinaField(props, "description")}
            className="text-lg text-gray-400 [&_a]:text-accent [&_a]:underline [&_a:hover]:text-white"
          >
            <TinaMarkdown content={props.description} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CallToActionBlock;
