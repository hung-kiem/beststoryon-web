import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { TagPage } from "@/components/tags";

const Tag: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: "Explore Novels by Tags: Find Your Perfect Read",
          description:
            "Browse novels by popular tags and uncover stories tailored to your interests. From action-packed adventures to heartfelt romances, discover the perfect light novel for you!",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <TagPage />
    </Box>
  );
};

Tag.Layout = MainLayout;

export default Tag;
