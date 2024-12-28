import React, { ReactNode } from "react";
import { MainLayout } from "@/components/layout";
import { Category, NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import TrendingPage from "@/components/trending/TrendingPage";
import { Story } from "@/models/story";
import { NextPage } from "next";
type LayoutProps = {
  children: ReactNode;
};

type TrendingPageProps = {
  categories: any[];
  stories: any;
};
const Trending: NextPage<TrendingPageProps> & {
  Layout?: React.FC<LayoutProps>;
} = ({ categories, stories }) => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: "Top Trending Novels Everyone Is Reading Right Now",
          description:
            "Stay ahead with the most-talked-about novels in the community. Explore trending tales that captivate readers worldwide and join the buzz!",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <TrendingPage
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
    status?: string;
    sort?: string;
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
  const { catCode = "ALL", status = "ALL", sort = "Popular" } = context.query;
  let pageIndex = context.query.pageIndex || "list-1";
  pageIndex = pageIndex.replaceAll("list-", "");
  pageIndex = pageIndex.replaceAll(".html", "");

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
    `${process.env.CORE_API}/api/story/getTrendingList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        catCode: typeof catCode === "string" ? catCode : "",
        storyStatus: status,
        sortCondition: sort,
        pageIndex: Number(pageIndex) || 1,
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

Trending.Layout = MainLayout;

export default Trending;
