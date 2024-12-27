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
    `${process.env.CORE_API}/api/category/getStoryByCatCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        catCode: typeof catCode === "string" ? catCode : "",
        storyStatus: status,
        sortCondition: sort,
        pageIndex: pageIndex,
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

CategoryParent.Layout = MainLayout;

export default CategoryParent;
