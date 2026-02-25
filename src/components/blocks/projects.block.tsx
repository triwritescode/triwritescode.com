"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/react";
import DynamicIcon from "@/components/shortcodes/dynamicIcon.shortcode";

type AchievementItem = {
  label?: string | null;
  value?: string | null;
};

type ImageItem = {
  src?: string | null;
  alt?: string | null;
};

type LinkItem = {
  icon?: string | null;
  label?: string | null;
  url?: string | null;
};

type ProjectItem = {
  title?: string | null;
  description?: TinaMarkdownContent;
  logo?: string | null;
  achievements?: (AchievementItem | null)[] | null;
  images?: (ImageItem | null)[] | null;
  links?: (LinkItem | null)[] | null;
};

type ProjectsBlockProps = {
  enable?: boolean | null;
  title?: string | null;
  description?: TinaMarkdownContent;
  projects?: (ProjectItem | null)[] | null;
};

const ImageGallery = ({ images }: { images: ImageItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="mt-4 rounded-xl border border-gray-900 bg-primary/80 overflow-hidden">
      {/* Image Display */}
      <div className="relative aspect-video w-full bg-black/20">
        {currentImage?.src && (
          <Image
            src={currentImage.src}
            alt={currentImage.alt || "Project highlight"}
            fill
            className="object-contain"
          />
        )}
      </div>

      {/* Pagination Controls */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-4 py-3 border-t border-gray-900">
          <button
            onClick={goToPrev}
            className="flex h-6 w-6 hover:cursor-pointer items-center justify-center rounded border border-gray-800 text-gray-500 transition-colors hover:border-gray-700 hover:text-white"
            aria-label="Previous image"
          >
            <DynamicIcon icon="FaChevronLeft" className="w-2.5 h-2.5" />
          </button>

          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  i === currentIndex
                    ? "bg-accent"
                    : "bg-gray-700 hover:bg-gray-600",
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex h-6 w-6 hover:cursor-pointer items-center justify-center rounded border border-gray-800 text-gray-500 transition-colors hover:border-gray-700 hover:text-white"
            aria-label="Next image"
          >
            <DynamicIcon icon="FaChevronRight" className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const [showHighlights, setShowHighlights] = useState(false);

  const achievements = project.achievements?.filter(Boolean) as
    | AchievementItem[]
    | undefined;
  const images = project.images?.filter((img) => img?.src) as
    | ImageItem[]
    | undefined;
  const links = project.links?.filter(Boolean) as LinkItem[] | undefined;

  return (
    <article className="rounded-2xl border border-gray-900 bg-secondary/30 px-5 py-5 sm:px-6 sm:py-6">
      {/* Header: Title + Logo */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {project.title && (
            <h3
              data-tina-field={tinaField(project, "title")}
              className="text-base font-bold text-white sm:text-lg"
            >
              {project.title}
            </h3>
          )}

          {project.description && (
            <div
              data-tina-field={tinaField(project, "description")}
              className="mt-2 prose-sm text-gray-400 [&_a]:text-accent [&_a]:underline [&_p]:mb-0 [&_strong]:text-white"
            >
              <TinaMarkdown content={project.description} />
            </div>
          )}
        </div>

        {project.logo && (
          <div
            data-tina-field={tinaField(project, "logo")}
            className="relative h-12 w-12 shrink-0 overflow-hidden"
          >
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className="rounded-md border border-gray-900 bg-primary/50 px-3 py-2 text-center"
            >
              <div className="text-[10px] text-gray-600 uppercase tracking-wide">
                {achievement.label}
              </div>
              <div className="text-sm font-semibold text-white">
                {achievement.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Highlights & Links Row */}
      <div className="mt-4 flex items-center justify-between">
        {/* Highlights Toggle */}
        {images && images.length > 0 && (
          <button
            onClick={() => setShowHighlights((prev) => !prev)}
            className={cn(
              "flex items-center gap-1.5 hover:cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              "bg-accent/20 text-accent hover:bg-accent/30",
            )}
          >
            <DynamicIcon
              icon="FaChevronDown"
              className={cn(
                "transition-transform w-2 h-2",
                showHighlights ? "rotate-180" : "",
              )}
            />
            Highlights
          </button>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <div className="flex items-center gap-3 ml-auto">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-white"
              >
                {link.icon && (
                  <DynamicIcon icon={link.icon} className="h-3.5 w-3.5" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Image Gallery */}
      {showHighlights && images && images.length > 0 && (
        <ImageGallery images={images} />
      )}
    </article>
  );
};

const ProjectsBlock = (props: ProjectsBlockProps) => {
  if (props.enable === false) return null;

  const projects = props.projects?.filter(Boolean) as ProjectItem[] | undefined;

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

      {/* Project Cards */}
      {projects && projects.length > 0 && (
        <div className="mt-8 space-y-5">
          {projects.map((project, i) => (
            // @ts-ignore - dynamic field path
            <div data-tina-field={tinaField(props, `projects.${i}`)} key={i}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsBlock;
