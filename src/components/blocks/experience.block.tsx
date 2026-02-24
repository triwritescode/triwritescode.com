"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/react";

type ExperienceItem = {
  role?: string | null;
  company?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: TinaMarkdownContent;
  techStacks?: (string | null)[] | null;
  contributions?: (string | null)[] | null;
};

type ExperienceBlockProps = {
  enable?: boolean | null;
  title?: string | null;
  description?: TinaMarkdownContent;
  experiences?: (ExperienceItem | null)[] | null;
};

const ExperienceCard = ({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) => {
  const [showContributions, setShowContributions] = useState(false);

  const techStacks = item.techStacks?.filter(Boolean) as string[] | undefined;
  const contributions = item.contributions?.filter(Boolean) as
    | string[]
    | undefined;

  return (
    <article className="rounded-2xl border border-gray-900 bg-secondary/30 px-5 py-5 sm:px-6 sm:py-6">
      {/* Meta row: location + date range */}
      <div className="mb-2 flex items-center justify-between text-[14px] text-gray-700">
        {item.location && (
          <span data-tina-field={tinaField(item, "location")}>
            {item.location}
          </span>
        )}
        {(item.startDate || item.endDate) && (
          <span
            data-tina-field={tinaField(item, "startDate")}
            className="ml-auto"
          >
            {item.startDate}
            {item.endDate ? ` — ${item.endDate}` : ""}
          </span>
        )}
      </div>

      {/* Role at Company */}
      <h3 className="text-base font-bold text-white sm:text-xl">
        <span data-tina-field={tinaField(item, "role")}>{item.role}</span>
        {item.company && (
          <span className="text-gray-500 font-normal"> at </span>
        )}
        <span data-tina-field={tinaField(item, "company")}>{item.company}</span>
      </h3>

      {/* Description */}
      {item.description && (
        <div className="prose-sm text-gray-400 [&_a]:text-accent [&_a]:underline [&_p]:mb-0 [&_strong]:text-white mt-4">
          <TinaMarkdown content={item.description} />
        </div>
      )}

      {/* Tech Stacks */}
      {techStacks && techStacks.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {techStacks.map((tech, i) => (
            <span
              key={i}
              className="rounded-md border border-gray-900 bg-primary/50 px-2 py-0.5 text-[11px] text-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Contributions */}
      {contributions && contributions.length > 0 && (
        <div className="mt-4">
          {showContributions && (
            <ul className="mb-3 space-y-1.5 text-sm leading-relaxed text-gray-500">
              {contributions.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-gray-700">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center">
            <button
              onClick={() => setShowContributions((prev) => !prev)}
              className={cn(
                "w-full rounded-md px-2 py-2 text-[11px] text-accent bg-linear-to-r from-accent/20 to-secondary/80",
                "hover:cursor-pointer hover:text-accent/80 hover:from-accent/10 hover:to-secondary/70",
                "transition-colors",
              )}
            >
              {showContributions ? "Hide" : "Show"} Detail Contributions
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

const ExperienceBlock = (props: ExperienceBlockProps) => {
  if (props.enable === false) return null;

  const experiences = props.experiences?.filter(Boolean) as
    | ExperienceItem[]
    | undefined;

  return (
    <section className="container my-12 sm:px-12!">
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        {props.title && (
          <h1
            data-tina-field={tinaField(props, "title")}
            className="text-2xl font-bold text-accent md:text-2xl"
          >
            {props.title}
          </h1>
        )}

        {props.description && (
          <div
            data-tina-field={tinaField(props, "description")}
            className="mt-2 prose prose-base text-lg text-accent/90 [&_a]:text-info [&_a]:underline [&_p]:mb-0 [&_strong]:text-white"
          >
            <TinaMarkdown content={props.description} />
          </div>
        )}
      </div>

      {/* Experience Cards */}
      {experiences && experiences.length > 0 && (
        <div className="mt-8 space-y-5">
          {experiences.map((item, i) => (
            // @ts-ignore
            <div data-tina-field={tinaField(props, "experiences." + i)} key={i}>
              <ExperienceCard item={item} index={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExperienceBlock;
