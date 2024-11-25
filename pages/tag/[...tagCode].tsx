import { Seo } from "@/components/common";
import { MainLayout } from "@/components/layout";
import { TagDetail } from "@/components/tags/TagDetail";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import * as React from "react";

const Tag: NextPageWithLayout = () => {
  return (
    <Box>
      <TagDetail />
    </Box>
  );
};

Tag.Layout = MainLayout;

export default Tag;
