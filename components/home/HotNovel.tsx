import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import * as React from "react";
import Link from "next/link";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { NovelCard } from "./NovelCard";
import Grid from "@mui/material/Grid2";

export function HotNovel() {
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
            <LocalFireDepartmentIcon />
            <Typography variant="h4" fontWeight="bold">
              Hot
            </Typography>
          </Stack>
          <Link passHref href="/hot" legacyBehavior>
            <MuiLink color="background.paper">View all</MuiLink>
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
