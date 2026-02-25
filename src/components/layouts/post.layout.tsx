"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/react";
import type { Exact, GlobalQuery, PostQuery } from "@tina/__generated__/types";

import Header from "@/components/global/header.global";
import Footer from "@/components/global/footer.global";

type PostLayoutClientProps = {
  initialPostData: {
    data: PostQuery;
    variables: Exact<{ relativePath: string }>;
    query: string;
  };
  initialGlobalData: {
    data: GlobalQuery;
    variables: Exact<{ relativePath: string }>;
    query: string;
  };
};

const PostLayout = (props: PostLayoutClientProps) => {
  const { data: postData } = useTina(props.initialPostData);
  const { data: globalData } = useTina(props.initialGlobalData);

  const post = postData.post;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <Header header={globalData.global.header} />

      <main className="min-h-[calc(100vh-119px)]">
        <article className="container my-12 sm:px-12!">
          {/* Post Header */}
          <header className="mb-8">
            {post.title && (
              <h1
                data-tina-field={tinaField(post, "title")}
                className="text-2xl font-bold text-accent md:text-3xl"
              >
                {post.title}
              </h1>
            )}

            {post.publishedDate && (
              <time
                data-tina-field={tinaField(post, "publishedDate")}
                className="mt-2 block text-sm text-gray-500 font-mono"
              >
                {formatDate(post.publishedDate)}
              </time>
            )}
          </header>

          {/* Post Body */}
          {post.body && (
            <div
              data-tina-field={tinaField(post, "body")}
              className="prose prose-invert prose-sm max-w-none text-gray-300 prose-headings:text-white prose-headings:font-bold prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:my-4 prose-ul:pl-5 prose-li:my-1 prose-li:marker:text-gray-600 prose-blockquote:border-l-accent prose-blockquote:text-gray-400 prose-blockquote:not-italic"
            >
              <TinaMarkdown content={post.body} />
            </div>
          )}
        </article>
      </main>

      <Footer footer={globalData.global.footer} />
    </>
  );
};

export default PostLayout;
