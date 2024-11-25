import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { CategoryPage } from "@/components/category";

const Category: NextPageWithLayout = () => {
  return (
    <Box>
      <CategoryPage />
    </Box>
  );
};

Category.Layout = MainLayout;

export default Category;
