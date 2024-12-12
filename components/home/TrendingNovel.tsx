import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { NovelCard } from "./NovelCard";
import Grid from "@mui/material/Grid2";
import { StoryHome } from "@/models";

interface TrendingProps {
  data: StoryHome[];
}

export function TrendingNovel({ data }: TrendingProps) {
  return (
    <Box component="section" bgcolor={"background.default"} py={4}>
      <Container>
        {data?.length !== 0 && (
          <>
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
              <Link passHref href="/trending/ALL/list-1.html" legacyBehavior>
                <MuiLink color="background.paper">View all</MuiLink>
              </Link>
            </Stack>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {data?.map((story, index) => (
                  <Grid key={index} size={{ xs: 6, sm: 3, md: 2 }}>
                    <Link
                      passHref
                      href={`/story/${story.storyNameAlias}-${story.storyId}/list-1.html`}
                    >
                      <NovelCard key={index} story={story} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
