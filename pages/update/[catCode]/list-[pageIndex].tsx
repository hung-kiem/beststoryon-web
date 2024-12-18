import React, { ReactNode } from "react";
import { MainLayout } from "@/components/layout";
import { Category } from "@/models";
import { UpdatePage } from "@/components/update";
import { Story } from "@/models/story";
import { NextPage } from "next";

type LayoutProps = {
  children: ReactNode;
};

type UpdatePageProps = {
  categories: any[];
  stories: any;
};

const Update: NextPage<UpdatePageProps> & {
  Layout?: React.FC<LayoutProps>;
} = ({ categories, stories }) => {
  return (
    <UpdatePage
      categories={categories}
      stories={stories.data}
      totalPage={stories.totalPage}
    />
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
  const storiesResponse = await fetch(`${process.env.CORE_API}/api/updates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      catCode: typeof catCode === "string" ? catCode : "",
      storyStatus: "All",
      sortCondition: "Popular",
      pageIndex: Number(pageIndex) || 1,
      pageSize: 12,
    }),
  });
  const stories = await storiesResponse.json();

  return {
    props: {
      categories,
      stories,
    },
  };
}

Update.Layout = MainLayout;

export default Update;
