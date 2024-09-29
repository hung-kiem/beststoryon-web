import {
  Stack,
  Card,
  CardMedia,
  Grid2,
  Container,
  Box,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import * as React from "react";
import Link from "next/link";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { RecommendCardMain } from "./RecommendCardMain";
import { RecommendCardSecondary } from "./RecommendCardSecondary";

export function RecommendForYou() {
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
              Recommend
            </Typography>
          </Stack>
          <Link passHref href="/recommend" legacyBehavior>
            <MuiLink color="background.paper">View all</MuiLink>
          </Link>
        </Stack>
        <Stack direction={{ md: "column", lg: "row" }} spacing={2} my={2}>
          <RecommendCardMain />
          <Grid2
            container
            spacing={2}
            sx={{
              height: "400px",
              width: "100%",
              mt: { xs: 2, lg: 0 },
            }}
          >
            <Grid2 size={6}>
              <RecommendCardSecondary />
            </Grid2>
            <Grid2 size={6}>
              <RecommendCardSecondary />
            </Grid2>
            <Grid2 size={6}>
              <RecommendCardSecondary />
            </Grid2>
            <Grid2 size={6}>
              <RecommendCardSecondary />
            </Grid2>
          </Grid2>
        </Stack>
      </Container>
    </Box>
  );
}
