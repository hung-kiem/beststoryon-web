import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

export function TagPage() {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
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
              <Link href="">
                <Typography key={letter} variant="h6">
                  {letter}
                </Typography>
              </Link>
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
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  textAlign: "center",
                }}
              >
                <Link href="">
                  <Typography variant="body2" alignSelf="center">
                    Label
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
