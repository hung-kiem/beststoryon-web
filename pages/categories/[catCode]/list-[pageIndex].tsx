import React, { ReactNode } from "react";
import { MainLayout } from "@/components/layout";
import { Category } from "@/models";
import { CategoryPage } from "@/components/category";
import { Story } from "@/models/story";
import { NextPage } from "next";

type LayoutProps = {
  children: ReactNode;
};

type CategoryPageProps = {
  categories: any[];
  stories: any;
};

const CategoryParent: NextPage<CategoryPageProps> & {
  Layout?: React.FC<LayoutProps>;
} = ({ categories, stories }) => {
  console.log("categories", categories);
  console.log("stories", stories);
  return (
    <CategoryPage
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
  pageIndex = pageIndex.replaceAll("list-", "");
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
      storyStatus: "ALL",
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

CategoryParent.Layout = MainLayout;

export default CategoryParent;
