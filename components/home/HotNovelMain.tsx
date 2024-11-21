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
import DOMPurify from "dompurify";
import Link from "next/link";
import { StoryHome } from "@/models";

function sanitizeHTML(content: string) {
  return {
    __html: DOMPurify.sanitize(content),
  };
}

export function StorySummary({ summaryContent }: { summaryContent: string }) {
  return <div dangerouslySetInnerHTML={sanitizeHTML(summaryContent)} />;
}

type ChapterHotProps = {
  storyName: string;
  numberOfChapter: number;
};

function ChapterHot({ storyName, numberOfChapter }: ChapterHotProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      mt={2}
      sx={{
        height: "64px",
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          my: 1,
          height: "64px",
          width: "64px",
          overflow: "hidden",
          minWidth: "64px",
        }}
      >
        <CardMedia
          component="img"
          image="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Novel image"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover", // Đảm bảo hình ảnh được cắt để lấp đầy khung hình mà không bị biến dạng
            objectPosition: "center", // Căn giữa hình ảnh
          }}
        />
      </Card>
      <Stack
        direction="column"
        sx={{
          maxWidth: "calc(100% - 64px)",
        }}
      >
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
          {storyName}
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
              {numberOfChapter} Chapter
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

interface HotTopListProps {
  data: StoryHome[];
}

export function HotNovelMain({ data }: HotTopListProps) {
  const firstStory = data?.[0];

  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
              {firstStory && (
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
                    image={firstStory?.urlAvatar || ""}
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
                    <LocalFireDepartmentIcon
                      fontSize="small"
                      sx={{
                        color: "secondary.contrastText",
                      }}
                    />
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
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: { xs: 1, sm: 2, lg: 3 },
                        lineClamp: { xs: 1, sm: 2, lg: 3 },
                      }}
                    >
                      {firstStory.storyName}
                    </Typography>
                    <Stack
                      color="secondary.contrastText"
                      sx={{
                        textShadow: "1px 1px 1px #000",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: { xs: 1, sm: 2, lg: 3 },
                        lineClamp: { xs: 1, sm: 2, lg: 3 },
                      }}
                    >
                      <StorySummary
                        summaryContent={firstStory.summaryContent}
                      />
                    </Stack>
                    <Stack direction={{ xs: "row", sm: "column" }} spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Typography
                          variant="body2"
                          color="secondary.contrastText"
                          fontWeight="regular"
                          sx={{
                            height: "fit-content",
                            width: "fit-content",
                            backgroundColor: "background.paper",
                            borderRadius: 2,
                            p: 1,
                          }}
                        >
                          {(firstStory.catList && firstStory.catList[0]) || ""}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="secondary.contrastText"
                          fontWeight="regular"
                          sx={{
                            height: "fit-content",
                            width: "fit-content",
                            backgroundColor: "background.paper",
                            borderRadius: 2,
                            p: 1,
                          }}
                        >
                          {firstStory.status}
                        </Typography>
                      </Stack>

                      <Stack direction="row">
                        <Link
                          href={`/story/${firstStory.storyNameAlias}-${firstStory.storyId}.html`}
                          passHref
                        >
                          <Button
                            variant="text"
                            endIcon={<ArrowRightIcon />}
                            sx={{
                              height: "fit-content",
                              width: "fit-content",
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              color: "secondary.contrastText",
                              // mt: 2,
                            }}
                          >
                            Read
                          </Button>
                        </Link>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              )}
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
                {data?.slice(1).map((story, id) => (
                  <Link key={id} href={`/story/${story.storyId}`} passHref>
                    <ChapterHot
                      key={id}
                      storyName={story.storyName}
                      numberOfChapter={story.chapterNumber}
                    />
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
