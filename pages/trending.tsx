import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { TrendingPage } from "@/components/trending";

const Trending: NextPageWithLayout = () => {
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
      <TrendingPage />
    </Box>
  );
};

Trending.Layout = MainLayout;

export default Trending;
