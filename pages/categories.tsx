import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { CategoryPage } from "@/components/category";
import useSWR from "swr";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const Category: NextPageWithLayout = () => {
  // const { data } = useSWR(`/category/getList`, {
  //   revalidateOnFocus: false,
  //   dedupingInterval: MILLISECOND_PER_HOUR,
  // });
  // console.log("Category data:", data);

  return (
    <Box>
      <Seo
        data={{
          url: "https://beststoryon.com/",
          title: "BestStoryOn",
          description:
            "BestStoryOn is a blog website that provides quality content on various topics.",
          thumbnailUrl: "https://beststoryon.com/thumbnail.png",
        }}
      />
      <CategoryPage />
    </Box>
  );
};

Category.Layout = MainLayout;

export default Category;
