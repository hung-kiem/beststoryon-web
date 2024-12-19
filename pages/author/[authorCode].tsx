import React, { ReactNode } from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import AuthorPage from "@/components/author/Author";
import { GetServerSideProps, NextPage } from "next";

type LayoutProps = {
  children: ReactNode;
};

type AuthorPageProps = {
  stories: any;
  totalPage: number;
};

const Author: NextPage<AuthorPageProps> & {
  Layout?: React.FC<LayoutProps>;
} = ({ stories, totalPage }) => {
  return <AuthorPage stories={stories.data} totalPage={totalPage} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { authorCode = "", pageIndex = "1" } = context.query;

  const page = parseInt(pageIndex as string, 10) || 1;

  const storiesResponse = await fetch(
    `${process.env.CORE_API}/api/story/getListByAuthor`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorCode: authorCode as string,
        pageIndex: page,
        pageSize: 20,
      }),
    }
  );

  const stories = await storiesResponse.json();
  const totalPage = stories?.totalPage || 0;

  return {
    props: {
      stories,
      totalPage,
      author: authorCode,
    },
  };
};

Author.Layout = MainLayout;

export default Author;
