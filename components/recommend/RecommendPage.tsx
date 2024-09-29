import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";

export function RecommendPage() {
  return (
    <Box>
      <Container>
        <Stack direction="column" my={2} spacing={2}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Genre / Category
            </Typography>
            <Stack direction="row" spacing={1}>
              <Grid container spacing={1}>
                <Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                    }}
                  >
                    All
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                    }}
                  >
                    All
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                    }}
                  >
                    All
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                    }}
                  >
                    All
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                    }}
                  >
                    All
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                    }}
                  >
                    All
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                    }}
                  >
                    All
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Status
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "background.paper",
                  color: "secondary.contrastText",
                }}
              >
                All
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "background.paper",
                  color: "background.paper",
                }}
              >
                Ongoing
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "background.paper",
                  color: "background.paper",
                }}
              >
                Completed
              </Button>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Sort By
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "background.paper",
                  color: "secondary.contrastText",
                }}
              >
                Name
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "background.paper",
                  color: "background.paper",
                }}
              >
                Views
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "background.paper",
                  color: "background.paper",
                }}
              >
                Rating
              </Button>
            </Stack>
          </Stack>
          <Typography variant="h4" fontWeight="bold" alignSelf="center">
            Recommend for you
          </Typography>
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
          <Pagination
            count={20}
            variant="outlined"
            shape="rounded"
            boundaryCount={1}
            siblingCount={1}
            sx={{
              alignSelf: "center",
              mt: 2,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
