import React from "react";
import { Box, Typography } from "@mui/material";

import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Header } from "@/components/common";

const AboutPage: NextPageWithLayout = () => {
  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About page
      </Typography>
      <Header />
    </Box>
  );
};

AboutPage.Layout = MainLayout;

export default AboutPage;
