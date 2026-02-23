"use client";

import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

type CallToActionBlockProps = {
  enable?: boolean | null;
  title?: string | null;
  description?: TinaMarkdownContent;
};

const CallToActionBlock = (props: CallToActionBlockProps) => {
  if (props.enable === false) return null;

  return (
    <section className="container px-12! mb-12">
      <div className="rounded-2xl border border-accent/20 bg-secondary px-8 py-10 text-center">
        {props.title && (
          <h2 className="mb-3 text-2xl font-bold text-white">{props.title}</h2>
        )}
        {props.description && (
          <div className="text-lg text-gray-400 [&_a]:text-accent [&_a]:underline [&_a:hover]:text-white">
            <TinaMarkdown content={props.description} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CallToActionBlock;
