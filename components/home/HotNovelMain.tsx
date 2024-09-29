import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function ChapterHot() {
  return (
    <Stack direction="row" spacing={2} mt={2}>
      <Card
        sx={{
          borderRadius: 2,
          my: 1,
          height: "64px",
          width: "64px",
        }}
      >
        <CardMedia
          component="img"
          height="64px"
          width="64px"
          image="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Novel image"
        />
      </Card>
      <Stack direction="column">
        <Typography
          fontWeight="bold"
          variant="subtitle1"
          color="secondary.contrastText"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            lineClamp: 1,
          }}
        >
          Whispers of the Ancients Whispers
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <ImportContactsIcon
              sx={{
                color: "secondary.contrastText",
              }}
            />
            <Typography
              variant="subtitle2"
              color="secondary.contrastText"
              fontWeight="bold"
            >
              42 Chapter
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export function HotNovelMain() {
  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  width: "100%",
                  maxHeight: { xs: "300px", sm: "300px", lg: "400px" },
                  display: "absolute",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  width="100%"
                  image="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Novel image"
                />
                <Stack
                  direction="row"
                  display="flex"
                  alignItems="center"
                  width="fit-content"
                  height="fit-content"
                  p="4px"
                  sx={{
                    borderRadius: 2,
                    position: "absolute",
                    left: 10,
                    top: 10,
                    backgroundColor: "#F23030",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="secondary.contrastText"
                    fontWeight="medium"
                  >
                    Hot
                  </Typography>
                  <LocalFireDepartmentIcon fontSize="small" />
                </Stack>
                <Stack
                  direction="column"
                  display="flex"
                  spacing={1}
                  alignItems="left"
                  width="fit-content"
                  height="fit-content"
                  p="4px"
                  sx={{
                    borderRadius: 2,
                    position: "absolute",
                    left: 10,
                    bottom: 10,
                    maxWidth: { xs: "100%", sm: "300px", lg: "400px" },
                  }}
                >
                  <Typography
                    variant="h4"
                    color="secondary.contrastText"
                    fontWeight="bold"
                    sx={{
                      textShadow: "1px 1px 1px #000",
                    }}
                  >
                    Solo Leveling
                  </Typography>
                  <Typography
                    variant="body2"
                    color="secondary.contrastText"
                    fontWeight="regular"
                    sx={{
                      textShadow: "1px 1px 1px #000",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: { xs: 1, sm: 2, lg: 3 },
                      lineClamp: { xs: 1, sm: 2, lg: 3 },
                    }}
                  >
                    The story is about Sung Jin-Woo, the weakest hunter in
                    Korea, who accidentally receives a special power that allows
                    him to become a strong hunter and evolve through each
                    battle.
                  </Typography>
                  <Stack direction={{ xs: "row", sm: "column" }} spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Typography
                        variant="body2"
                        color="secondary.contrastText"
                        fontWeight="regular"
                        sx={{
                          backgroundColor: "background.paper",
                          borderRadius: 2,
                          p: 1,
                        }}
                      >
                        Action
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary.contrastText"
                        fontWeight="regular"
                        sx={{
                          backgroundColor: "background.paper",
                          borderRadius: 2,
                          p: 1,
                        }}
                      >
                        On going
                      </Typography>
                    </Stack>
                    <Button
                      variant="text"
                      endIcon={<ArrowRightIcon />}
                      sx={{
                        height: "fit-content",
                        width: "fit-content",
                        borderRadius: 2,
                        backgroundColor: "background.paper",
                        color: "secondary.contrastText",
                        mt: 2,
                      }}
                    >
                      Read
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "background.paper",
                  maxHeight: { xs: "400px", sm: "300px", lg: "400px" },
                  p: 2,
                  overflowY: "auto",
                }}
              >
                <ChapterHot />
                <ChapterHot />
                <ChapterHot />
                <ChapterHot />
                <ChapterHot />
                <ChapterHot />
                <ChapterHot />
                <ChapterHot />
                <ChapterHot />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
