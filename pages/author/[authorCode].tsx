import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import AuthorPage from "@/components/author/Author";

const Author: NextPageWithLayout = () => {
  return <AuthorPage />;
};

Author.Layout = MainLayout;

export default Author;
