import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { UpdatePage } from "@/components/update";

const Update: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: "Stay Updated with Recently Updated Novel Chapters",
          description:
            "Never miss a moment! Explore the latest updates and newly released chapters from your favorite novels. Dive back into the action with fresh content every day!",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <UpdatePage />
    </Box>
  );
};

Update.Layout = MainLayout;

export default Update;
