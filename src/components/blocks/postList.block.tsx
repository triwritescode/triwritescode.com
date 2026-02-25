"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/react";
import DynamicIcon from "../shortcodes/dynamicIcon.shortcode";

type PostEdge = {
  node?: {
    _sys: {
      filename: string;
    };
    title?: string | null;
    publishedDate?: string | null;
  } | null;
};

type PostListBlockProps = {
  enable?: boolean | null;
  title?: string | null;
  description?: TinaMarkdownContent;
  postsPerPage?: number | null;
  posts?: PostEdge[] | null;
};

const PostListBlock = (props: PostListBlockProps) => {
  const postsPerPage = props.postsPerPage || 20;
  const [currentPage, setCurrentPage] = useState(1);

  if (props.enable === false) return null;

  const allPosts = props.posts?.filter((edge) => edge?.node) || [];

  // Sort posts by date (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = a.node?.publishedDate
      ? new Date(a.node.publishedDate).getTime()
      : 0;
    const dateB = b.node?.publishedDate
      ? new Date(b.node.publishedDate).getTime()
      : 0;
    return dateB - dateA;
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const goToPrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

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

      {/* Post List */}
      {paginatedPosts.length > 0 && (
        <div className="flex flex-col gap-2 mt-8 space-y-0">
          {paginatedPosts.map((edge, i) => {
            const post = edge.node;
            if (!post) return null;

            return (
              <Link
                key={i}
                href={`/posts/${post._sys.filename}`}
                className={cn(
                  "group flex flex-col sm:flex-row sm:items-center sm:gap-4 py-2.5 rounded-lg px-4",
                  "transition-colors bg-linear-to-r from-secondary to-primary hover:from-secondary/70",
                )}
              >
                <time className="text-sm text-gray-600 font-mono shrink-0 w-24">
                  {formatDate(post.publishedDate)}
                </time>
                <span className="text-sm text-gray-300 transition-colors group-hover:text-accent/70">
                  {post.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded border transition-colors",
              currentPage === 1
                ? "border-gray-900 text-gray-700 cursor-not-allowed"
                : "border-gray-800 text-gray-500 hover:border-gray-700 hover:text-white",
            )}
            aria-label="Previous page"
          >
            <DynamicIcon icon="FaChevronLeft" className="w-2.5 h-2.5" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i + 1 === currentPage
                    ? "bg-accent"
                    : "bg-gray-700 hover:bg-gray-600 hover:cursor-pointer",
                )}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded border transition-colors",
              currentPage === totalPages
                ? "border-gray-900 text-gray-700 cursor-not-allowed"
                : "border-gray-800 text-gray-500 hover:border-gray-700 hover:text-white hover:cursor-pointer",
            )}
            aria-label="Next page"
          >
            <DynamicIcon icon="FaChevronRight" className="w-2.5 h-2.5" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {sortedPosts.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          No posts available yet.
        </div>
      )}
    </section>
  );
};

export default PostListBlock;
