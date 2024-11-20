import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ChapterRelease } from "./ChapterRelease";
import { StoryHome } from "@/models";

interface NewReleaseProps {
  data: StoryHome[];
}

export function NewRelease({ data }: NewReleaseProps) {
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
          <Link passHref href="/newRelease" legacyBehavior>
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
              width: { xs: "600px", md: "1000px" },
            }}
          >
            {data?.map((story, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Link
                  passHref
                  href={`/story/${story.storyNameAlias}-${story.storyId}.html`}
                >
                  <ChapterRelease story={story} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
