import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { CategoryPage } from "@/components/category";

const Category: NextPageWithLayout = () => {
  return <CategoryPage />;
};

Category.Layout = MainLayout;

export default Category;
