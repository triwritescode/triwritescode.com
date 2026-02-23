"use client";

import Image from "next/image";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import DynamicIcon from "@/components/shortcodes/dynamicIcon.shortcode";

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
    <section className="mx-auto max-w-2xl px-4 py-12">
      {/* Profile header */}
      <div className="mb-8 flex items-center gap-4">
        {props.avatar && (
          <Image
            src={props.avatar}
            alt={props.name || "Avatar"}
            width={64}
            height={64}
            className="rounded-full"
            priority
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">{props.name}</h1>
          {props.subtitle && (
            <p className="text-sm text-gray-500">{props.subtitle}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      {props.bio && (
        <div className="prose-invert mb-8 space-y-4 text-sm leading-relaxed text-gray-400 [&_a]:text-accent [&_a]:underline [&_p]:mb-0 [&_strong]:text-white">
          <TinaMarkdown content={props.bio} />
        </div>
      )}

      {/* Social links */}
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url || "#"}
              target={link.url?.startsWith("http") ? "_blank" : undefined}
              rel={link.url?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 text-sm text-gray-400 underline transition-colors hover:text-white"
            >
              {link.icon && <DynamicIcon icon={link.icon} className="size-3.5" />}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default SummaryBlock;
