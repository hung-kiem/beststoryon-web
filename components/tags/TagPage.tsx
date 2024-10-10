import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import { tagApi } from "@/api-client";

const fetcher = (firstLetter: string) =>
  tagApi.getTagByFirstLetter(firstLetter);

export function TagPage() {
  const [selectedLetter, setSelectedLetter] = useState("A");

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const { data: tags, error } = useSWR(selectedLetter, fetcher);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
  };

  return (
    <Box>
      <Container>
        <Stack direction="column" my={2} spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {alphabet.map((letter) => (
              <Typography
                key={letter}
                variant="h6"
                sx={{ cursor: "pointer" }}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </Typography>
            ))}
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
              {tags?.data?.map((tag) => (
                <Grid
                  item
                  key={tag.storyTagId}
                  xs={6}
                  sm={4}
                  md={3}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Link href={`/tag/${tag.storyTagId}`}>
                    <Typography variant="body2" alignSelf="center">
                      {tag.storyTagName}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
