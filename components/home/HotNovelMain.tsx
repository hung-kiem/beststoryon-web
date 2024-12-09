import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
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
  urlAvatar?: string;
};

function ChapterHot({
  storyName,
  numberOfChapter,
  urlAvatar,
}: ChapterHotProps) {
  const [imageSrc, setImageSrc] = useState("/images/no-image.jpg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (urlAvatar) {
      if (urlAvatar.startsWith("https")) {
        setImageSrc(urlAvatar);
      } else {
        setImageSrc(
          `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN || ""}${urlAvatar}`
        );
      }
    } else {
      setImageSrc("/images/no-image.jpg");
    }
  }, [urlAvatar]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageSrc("/images/no-image.jpg");
  };

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
          image="/images/no-image.jpg"
          alt={storyName}
          title={storyName}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: isImageLoaded ? "none" : "block",
          }}
        />
        <CardMedia
          component="img"
          image={imageSrc}
          alt={storyName}
          title={storyName}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: isImageLoaded ? "block" : "none",
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
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
  const [imageSrc, setImageSrc] = useState("/images/no-image.jpg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (firstStory.urlAvatar) {
      if (firstStory.urlAvatar.startsWith("https")) {
        setImageSrc(firstStory.urlAvatar);
      } else {
        setImageSrc(
          `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN || ""}${firstStory.urlAvatar}`
        );
      }
    } else {
      setImageSrc("/images/no-image.jpg");
    }
  }, [firstStory.urlAvatar]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageSrc("/images/no-image.jpg");
  };

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
                    image="/images/no-image.jpg"
                    title={firstStory.storyName}
                    alt={firstStory.storyName}
                    sx={{ display: isImageLoaded ? "none" : "block" }}
                  />
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={imageSrc}
                    title={firstStory.storyName}
                    alt={firstStory.storyName}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    sx={{ display: isImageLoaded ? "block" : "none" }}
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
                            backgroundColor:
                              firstStory.status === "Ongoing"
                                ? "#c14646"
                                : "#377f49",
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
                  backgroundColor: "#0F172A",
                  maxHeight: "400px",
                  p: 2,
                  overflowY: "auto",
                }}
              >
                {data?.slice(1, 5).map((story, id) => (
                  <Link
                    key={id}
                    href={`/story/${story.storyNameAlias}-${story.storyId}.html`}
                    passHref
                  >
                    <ChapterHot
                      key={id}
                      storyName={story.storyName}
                      numberOfChapter={story.chapterNumber}
                      urlAvatar={story.urlAvatar}
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
