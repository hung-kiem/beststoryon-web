import {
  Box,
  Container,
  Stack,
  Card,
  CardMedia,
  Typography,
  Button,
  Divider,
  Pagination,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { ChapterTitle } from "./ChapterTitle";
import { NovelCard } from "./NovelCard";

export function NovelDetail() {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Box>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  width: "100%",
                  maxHeight: { xs: "300px", sm: "300px", lg: "460px" },
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
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
              <Stack direction="column" spacing={1}>
                <Typography fontWeight="bold" variant="h4">
                  Solo Leveling
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <VisibilityIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="small"
                      fontWeight="bold"
                    >
                      2.42M Views
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ThumbUpIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="small"
                      fontWeight="bold"
                    >
                      2.412 Likes
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ImportContactsIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="small"
                      fontWeight="bold"
                    >
                      42 Chapter
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontSize="medium"
                    fontWeight="bold"
                  >
                    Status:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="medium"
                  >
                    On Going
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontSize="medium"
                    fontWeight="bold"
                  >
                    Author:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="medium"
                  >
                    Nguyễn Hữu Đại
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontSize="medium"
                    fontWeight="bold"
                  >
                    Genre:
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
                    Fantasy
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
                    Adventure
                  </Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: showFullDescription ? "none" : 3,
                      maxHeight: showFullDescription ? "none" : "4.5em",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Typography>
                  <Button
                    onClick={toggleDescription}
                    sx={{ color: "background.paper" }}
                  >
                    {showFullDescription ? "Show Less" : "Watch More"}
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      height: "fit-content",
                      width: "fit-content",
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                      mt: 2,
                    }}
                  >
                    Start Reading
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      height: "fit-content",
                      width: "fit-content",
                      borderRadius: 2,
                      borderColor: "background.paper",
                      color: "background.paper",
                      mt: 2,
                    }}
                  >
                    Latest Chapter
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Stack direction="column" spacing={2} my={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="background.paper"
          >
            Chapter List
          </Typography>
          <Stack direction="column" spacing={0}>
            <Typography variant="body1" fontWeight="bold">
              904 Chapter
            </Typography>
            <Typography variant="body2" fontWeight="regular">
              Truyện phát hành từ thứ Hai đến thứ Năm hàng tuần!
            </Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            sx={{
              maxHeight: "1600px",
              overflow: "auto",
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Typography variant="body2" fontWeight="bold">
                Chapter
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                Date
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <ChapterTitle />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <ChapterTitle />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <ChapterTitle />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <ChapterTitle />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <ChapterTitle />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <ChapterTitle />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <ChapterTitle />
            </Stack>
            <Divider />
          </Stack>
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
        <Stack direction="column" spacing={2} my={4}>
          <Stack
            direction="row"
            mb={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <VisibilityIcon />
              <Typography variant="h4" fontWeight="bold">
                Recommend
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
        </Stack>
      </Container>
    </Box>
  );
}
