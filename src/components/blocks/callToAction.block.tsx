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
    <section className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-2xl bg-secondary px-8 py-10 text-center">
        {props.title && (
          <h2 className="mb-3 text-lg font-bold text-white">{props.title}</h2>
        )}
        {props.description && (
          <div className="text-sm text-gray-400 [&_a]:text-accent [&_a]:underline [&_a:hover]:text-white">
            <TinaMarkdown content={props.description} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CallToActionBlock;
