import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import * as React from "react";
import Link from "next/link";
import { NovelCard } from "./NovelCard";
import Grid from "@mui/material/Grid2";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ChapterRelease } from "./ChapterRelease";

export function NewRelease() {
  return (
    <Box component="section" bgcolor={"background.default"} py={4}>
      <Container>
        <Stack
          direction="row"
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <VerifiedIcon />
            <Typography variant="h4" fontWeight="bold">
              New Releases
            </Typography>
          </Stack>
          <Link passHref href="/categories" legacyBehavior>
            <MuiLink color="background.paper">View all</MuiLink>
          </Link>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              width: "600px",
            }}
          >
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ChapterRelease />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
