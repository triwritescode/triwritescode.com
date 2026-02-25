"use client";

import { useState, useEffect, useCallback } from "react";
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

const ImageModal = ({
  image,
  onClose,
  onPrev,
  onNext,
  hasMultiple,
}: {
  image: ImageItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasMultiple: boolean;
}) => {
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
    };
    node.addEventListener("wheel", onWheel, { passive: false });
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  useEffect(() => {
    setIsLoading(true);
    setZoom(1);
  }, [image.src]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) onPrev();
      if (e.key === "ArrowRight" && hasMultiple) onNext();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasMultiple]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/80 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white hover:cursor-pointer"
        aria-label="Close modal"
      >
        <DynamicIcon icon="FaTimes" className="w-5 h-5" />
      </button>

      {/* Zoom Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-gray-900/80 px-3 py-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          disabled={zoom <= 0.5}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            zoom <= 0.5
              ? "text-gray-600 cursor-not-allowed"
              : "text-gray-400 hover:bg-gray-800 hover:text-white hover:cursor-pointer",
          )}
          aria-label="Zoom out"
        >
          <DynamicIcon icon="FaMinus" className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleResetZoom();
          }}
          className="px-2 text-sm text-gray-400 hover:text-white hover:cursor-pointer"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          disabled={zoom >= 3}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            zoom >= 3
              ? "text-gray-600 cursor-not-allowed"
              : "text-gray-400 hover:bg-gray-800 hover:text-white hover:cursor-pointer",
          )}
          aria-label="Zoom in"
        >
          <DynamicIcon icon="FaPlus" className="w-3 h-3" />
        </button>
      </div>

      {/* Navigation Arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/80 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white hover:cursor-pointer"
            aria-label="Previous image"
          >
            <DynamicIcon icon="FaChevronLeft" className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/80 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white hover:cursor-pointer"
            aria-label="Next image"
          >
            <DynamicIcon icon="FaChevronRight" className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-accent" />
          </div>
        )}
        {image.src && (
          <Image
            src={image.src}
            alt={image.alt || "Project highlight"}
            width={1920}
            height={1080}
            className={cn(
              "min-w-[50vw] min-h-[40vh] max-h-[90vh] w-auto object-contain transition-transform duration-150",
              isLoading ? "opacity-0" : "opacity-100",
            )}
            style={{ transform: `scale(${zoom})` }}
            onLoad={() => setIsLoading(false)}
            priority
          />
        )}
      </div>

      {/* Alt Text */}
      {image.alt && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-gray-900/80 px-4 py-2 text-sm text-gray-400">
          {image.alt}
        </div>
      )}
    </div>
  );
};

const ImageGallery = ({ images }: { images: ImageItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPrev = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const currentImage = images[currentIndex];

  return (
    <>
      <div className="mt-4 rounded-xl border border-gray-900 bg-primary/80 overflow-hidden">
        {/* Image Display */}
        <div
          className="relative aspect-video w-full bg-black/20 cursor-zoom-in"
          onClick={handleImageClick}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-accent" />
            </div>
          )}
          {currentImage?.src && (
            <Image
              src={currentImage.src}
              alt={currentImage.alt || "Project highlight"}
              fill
              className={cn(
                "object-contain transition-opacity duration-300",
                isLoading ? "opacity-0" : "opacity-100",
              )}
              onLoad={() => setIsLoading(false)}
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
                  onClick={() => {
                    if (i !== currentIndex) {
                      setIsLoading(true);
                      setCurrentIndex(i);
                    }
                  }}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors hover:cursor-pointer",
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

      {/* Modal */}
      {isModalOpen && currentImage && (
        <ImageModal
          image={currentImage}
          onClose={() => setIsModalOpen(false)}
          onPrev={goToPrev}
          onNext={goToNext}
          hasMultiple={images.length > 1}
        />
      )}
    </>
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
