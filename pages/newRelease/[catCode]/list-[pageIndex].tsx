import React, { ReactNode } from "react";
import { MainLayout } from "@/components/layout";
import { Category, NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { NewReleasePage } from "@/components/newRelease";
import { Story } from "@/models/story";
import { NextPage } from "next";

type LayoutProps = {
  children: ReactNode;
};

type TrendingPageProps = {
  categories: any[];
  stories: any;
};

const NewRelease: NextPage<TrendingPageProps> & {
  Layout?: React.FC<LayoutProps>;
} = ({ categories, stories }) => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: "Discover Exciting New Release Novels Every Day",
          description:
            "Be the first to explore fresh stories and updates. Dive into the latest releases across genres and find your next favorite novel today!",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <NewReleasePage
        categories={categories}
        stories={stories.data}
        totalPage={stories.totalPage}
      />
    </Box>
  );
};

interface GetServerSidePropsContext {
  query: {
    catCode?: string;
    pageIndex?: string;
  };
}

interface GetServerSidePropsResult {
  props: {
    categories: Category[];
    stories: {
      data: Story[];
      totalPage: number;
    };
  };
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult> {
  const { catCode = "ALL" } = context.query;
  let pageIndex = context.query.pageIndex || "list-1";
  pageIndex = pageIndex.replace("list-", "");
  const categoriesResponse = await fetch(
    `${process.env.CORE_API}/api/category/getList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const categories = await categoriesResponse.json();
  const storiesResponse = await fetch(
    `${process.env.CORE_API}/api/story/getNewReleaseList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        catCode: typeof catCode === "string" ? catCode : "",
        storyStatus: "All",
        sortCondition: "Popular",
        pageIndex: Number(pageIndex),
        pageSize: 12,
      }),
    }
  );
  const stories = await storiesResponse.json();

  return {
    props: {
      categories,
      stories,
    },
  };
}

NewRelease.Layout = MainLayout;

export default NewRelease;
