import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { HotPage } from "@/components/hot";

const Hot: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: "NovelsNook",
          description:
            "NovelsNook - Dive into a world of captivating novels with thousands of stories, fast updates, and a seamless reading experience.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <HotPage />
    </Box>
  );
};

Hot.Layout = MainLayout;

export default Hot;
