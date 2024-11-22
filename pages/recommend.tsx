import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { RecommendPage } from "@/components/recommend";

const Recommend: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title:
            "NovelsNook - Explore Fan-Fiction Novels Online – Completely Free!",
          description:
            "NovelsNook - Dive into a world of captivating novels with thousands of stories, fast updates, and a seamless reading experience.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <RecommendPage />
    </Box>
  );
};

Recommend.Layout = MainLayout;

export default Recommend;
