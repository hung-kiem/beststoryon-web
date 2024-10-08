import React from "react";
import { LayoutProps } from "@/models/index";
import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";

import { Footer, Header } from "../common";

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
      <Footer />
    </Stack>
  );
}
