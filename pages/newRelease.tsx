import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { NewReleasePage } from "@/components/newRelease";

const NewRelease: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: "Discover Exciting New Release Novels Every Day",
          description:
            "Be the first to explore fresh stories and updates. Dive into the latest releases across genres and find your next favorite novel today!",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <NewReleasePage />
    </Box>
  );
};

NewRelease.Layout = MainLayout;

export default NewRelease;
