import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import * as React from "react";
import Link from "next/link";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { NovelCard } from "./NovelCard";
import Grid from "@mui/material/Grid2";

export function TrendingNovel() {
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
            <TrendingUpIcon />
            <Typography variant="h4" fontWeight="bold">
              Trending
            </Typography>
          </Stack>
          <Link passHref href="/categories" legacyBehavior>
            <MuiLink>View all</MuiLink>
          </Link>
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <NovelCard />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <NovelCard />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <NovelCard />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <NovelCard />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <NovelCard />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <NovelCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
