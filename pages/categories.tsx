import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { CategoryPage } from "@/components/category";

const Category: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: "Discover Hot, New Release, and Trending Novels Online",
          description:
            "Explore the latest and most popular novels with daily updates. From hot releases to trending stories, find your next great read across all genres!",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <CategoryPage />
    </Box>
  );
};

Category.Layout = MainLayout;

export default Category;
