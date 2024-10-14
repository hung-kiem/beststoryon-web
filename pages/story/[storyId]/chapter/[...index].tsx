import { ChapterPage } from "@/components/chapter";
import { Seo } from "@/components/common";
import { MainLayout } from "@/components/layout";
import { Box } from "@mui/material";
import React from "react";

export function Chapter() {
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
      <ChapterPage />
    </Box>
  );
}
Chapter.Layout = MainLayout;

export default Chapter;
