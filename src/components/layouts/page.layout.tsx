"use client";

import { useTina } from "tinacms/dist/react";
import type {
  Exact,
  GlobalQuery,
  PageBlocks,
  PageQuery,
} from "@tina/__generated__/types";

import Header from "@/components/global/header.global";
import Footer from "@/components/global/footer.global";
import BlockRenderer from "@/components/layouts/blockRenderer.layout";

type PageLayoutClientProps = {
  initialPageData: {
    data: PageQuery;
    variables: Exact<{ relativePath: string }>;
    query: string;
  };
  initialGlobalData: {
    data: GlobalQuery;
    variables: Exact<{ relativePath: string }>;
    query: string;
  };
};

const PageLayout = (props: PageLayoutClientProps) => {
  const { data: pageData } = useTina(props.initialPageData);
  const { data: globalData } = useTina(props.initialGlobalData);

  return (
    <>
      <Header header={globalData.global.header} />

      <main className="min-h-[calc(100vh-119px)]">
        {pageData.page.blocks?.filter(Boolean).map((block, i) => (
          <BlockRenderer key={i} block={block as PageBlocks} />
        ))}
      </main>

      <Footer footer={globalData.global.footer} />
    </>
  );
};

export default PageLayout;
