import { MainLayout } from "@/components/layout";
import { TagDetail } from "@/components/tags/TagDetail";
import { NextPageWithLayout } from "@/models";
import { Story } from "@/models/story";
import { NextPage } from "next";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

type TagPageProps = {
  stories: any;
};

const Tag: NextPage<TagPageProps> & {
  Layout?: React.FC<LayoutProps>;
} = ({ stories }) => {
  return <TagDetail stories={stories.data} totalPage={stories.totalPage} />;
};

interface GetServerSidePropsContext {
  query: {
    pageIndex?: string;
    status?: string;
    sort?: string;
  };
}

interface GetServerSidePropsResult {
  props: {
    stories: {
      data: Story[];
      totalPage: number;
    };
  };
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult> {
  const { status = "ALL", sort = "Popular" } = context.query;
  let pageIndex = context.query.pageIndex || "list-1";
  pageIndex = pageIndex.replaceAll("list-", "");
  pageIndex = pageIndex.replaceAll(".html", "");

  console.log("pageIndex", pageIndex);
  console.log("status", status);
  console.log("sort", sort);

  const storiesResponse = await fetch(
    `${process.env.CORE_API}/api/tag/getStoryByTag`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        sortCondition: sort,
        pageIndex: pageIndex,
        pageSize: 12,
      }),
    }
  );
  const stories = await storiesResponse.json();

  return {
    props: {
      stories,
    },
  };
}

Tag.Layout = MainLayout;

export default Tag;
