import { Components } from "tinacms/dist/rich-text";

import DynamicIcon from "./dynamicIcon.shortcode";
import Youtube from "./youtube.shortcode";
import { cn } from "@/lib/utils";

/**
 * Prose utility classes for the post body,
 * matching the site's dark theme palette.
 */
export const proseClasses = cn(
  "prose prose-invert max-w-none",
  // Body text
  "text-gray-300",
  // Headings
  "prose-headings:text-white prose-headings:font-bold",
  "prose-h1:text-2xl prose-h1:mt-10 prose-h1:mb-4",
  "prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4",
  "prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3",
  "prose-h4:text-base prose-h4:mt-4 prose-h4:mb-2",
  // Paragraphs
  "prose-p:mb-4 prose-p:leading-relaxed",
  // Strong / emphasis
  "prose-strong:text-white",
  // Lists
  "prose-ul:my-4 prose-ul:pl-5",
  "prose-ol:my-4 prose-ol:pl-5",
  "prose-li:my-1 prose-li:marker:text-gray-600",
  // Blockquote (fallback)
  "prose-blockquote:border-l-warning prose-blockquote:text-gray-400 prose-blockquote:not-italic",
  // Inline code
  "prose-code:text-warning prose-code:bg-secondary/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
  // Pre / code blocks (fallback)
  "prose-pre:bg-secondary prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl",
  // Horizontal rule
  "prose-hr:border-gray-800",
  // Images
  "prose-img:rounded-xl",
  // Tables
  "prose-th:text-white prose-td:text-gray-300 prose-th:border-gray-700 prose-td:border-gray-800",
);

/**
 * Custom TinaMarkdown component overrides for premium article rendering.
 */
const TinaMarkdwonComponents: Components<Record<string, never>> = {
  // — Blockquote —
  blockquote: (props) => {
    if (!props) return <></>;
    return (
      <blockquote className="relative my-6 border-l-4 border-warning bg-secondary/40 rounded-r-xl py-4 px-5 text-gray-400 not-italic [&>p]:mb-0">
        {props.children}
      </blockquote>
    );
  },

  // — Code Block —
  code_block: (props) => {
    if (!props) return <></>;
    const { value, lang } = props;
    return (
      <div className="relative my-6">
        {lang && (
          <span className="absolute top-0 right-0 rounded-bl-lg rounded-tr-xl bg-gray-800 px-3 py-1 text-xs font-mono text-gray-400 select-none">
            {lang}
          </span>
        )}
        <pre className="overflow-x-auto rounded-xl border border-gray-800 bg-secondary p-4 text-sm leading-relaxed">
          <code className="font-mono text-gray-300">{value}</code>
        </pre>
      </div>
    );
  },

  // — Image —
  img: (props) => {
    if (!props) return <></>;
    const { url, alt, caption } = props;
    return (
      <figure className="my-8">
        <img
          src={url}
          alt={alt || ""}
          className="w-full rounded-xl"
          loading="lazy"
        />
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },

  // — Link —
  a: (props) => {
    if (!props) return <></>;
    const { url, children } = props;
    const isExternal = url?.startsWith("http");
    return (
      <a
        href={url}
        className="text-warning/70 no-underline transition-colors duration-200 hover:underline hover:text-warning"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {isExternal && (
          <span className="ml-0.5 inline-block text-[0.65em] align-super opacity-60">
            <DynamicIcon icon="FaExternalLinkAlt" />
          </span>
        )}
      </a>
    );
  },

  // — YouTube shortcode —
  youtube: ({ id, title }: { id: string; title: string }) => (
    <div className="my-12">
      <Youtube id={id} title={title} />
    </div>
  ),
};

export default TinaMarkdwonComponents;