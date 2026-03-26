"use client";

import Image from "next/image";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/react";

import DynamicIcon from "@/components/shortcodes/dynamicIcon.shortcode";
import TinaMarkdwonComponents, { proseClasses } from "../shortcodes/tinaMarkdownComponents.shortchode";

type SocialLink = {
  label?: string | null;
  icon?: string | null;
  url?: string | null;
};

type SummaryBlockProps = {
  enable?: boolean | null;
  avatar?: string | null;
  name?: string | null;
  subtitle?: string | null;
  bio?: TinaMarkdownContent;
  socialLinks?: (SocialLink | null)[] | null;
};

const SummaryBlock = (props: SummaryBlockProps) => {
  if (props.enable === false) return null;

  const links = props.socialLinks?.filter(Boolean) as SocialLink[];

  return (
    <section
      data-tina-field={tinaField(props, "enable")}
      className="container my-12 sm:px-12!"
    >
      {/* Profile header */}
      <div className="mb-8 flex items-center gap-4">
        {props.avatar && (
          <div data-tina-field={tinaField(props, "avatar")}>
            <Image
              src={props.avatar}
              alt={props.name || "Avatar"}
              width={96}
              height={96}
              className="rounded-full"
              priority
            />
          </div>
        )}
        <div>
          <h1
            data-tina-field={tinaField(props, "name")}
            className="text-2xl md:text-3xl font-bold text-accent"
          >
            {props.name}
          </h1>
          {props.subtitle && (
            <p
              data-tina-field={tinaField(props, "subtitle")}
              className="md:text-lg md:text-xl text-accent/75"
            >
              {props.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      {props.bio && (
        <div
          data-tina-field={tinaField(props, "bio")}
          className={proseClasses}
        >
          <TinaMarkdown content={props.bio} components={TinaMarkdwonComponents} />
        </div>
      )}

      <div className="my-6" />

      {/* Social links */}
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-4 sm:gap-6">
          {links.map((link, i) => (
            <a
              // @ts-ignore
              data-tina-field={tinaField(props, "socialLinks." + i)}
              key={i}
              href={link.url || "#"}
              target={link.url?.startsWith("http") ? "_blank" : undefined}
              rel={
                link.url?.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="flex items-center gap-1.5 text-lg text-gray-400 underline transition-colors hover:text-white font-bold"
            >
              {link.icon && (
                <DynamicIcon icon={link.icon} className="size-3.5" />
              )}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default SummaryBlock;

