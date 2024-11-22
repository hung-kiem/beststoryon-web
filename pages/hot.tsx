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
          title: "Must-Read Hot Novels: Today’s Most Popular Stories",
          description:
            "Uncover the hottest novels readers can’t stop talking about. From captivating dramas to thrilling adventures, these trending hits are waiting for you!",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <HotPage />
    </Box>
  );
};

Hot.Layout = MainLayout;

export default Hot;
