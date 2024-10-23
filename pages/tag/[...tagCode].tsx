import { Seo } from "@/components/common";
import { MainLayout } from "@/components/layout";
import { TagDetail } from "@/components/tags/TagDetail";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import * as React from "react";

const Tag: NextPageWithLayout = () => {
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
      <TagDetail />
    </Box>
  );
};

Tag.Layout = MainLayout;

export default Tag;
