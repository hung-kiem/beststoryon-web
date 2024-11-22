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
          url: "https://novelsnook.com/",
          title:
            "NovelsNook - Explore Fan-Fiction Novels Online – Completely Free!",
          description:
            "NovelsNook - Dive into a world of captivating novels with thousands of stories, fast updates, and a seamless reading experience.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <TagDetail />
    </Box>
  );
};

Tag.Layout = MainLayout;

export default Tag;
