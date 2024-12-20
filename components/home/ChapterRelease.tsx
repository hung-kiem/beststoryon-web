import { Stack, Typography, Card, CardMedia } from "@mui/material";
import React, { useState, useEffect } from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { StoryHome } from "@/models";

interface ChapterReleaseProps {
  story: StoryHome;
}

export function ChapterRelease({ story }: ChapterReleaseProps) {
  const [imageSrc, setImageSrc] = useState("/images/no-image.jpg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (story.urlAvatar) {
      if (story.urlAvatar.startsWith("https")) {
        setImageSrc(story.urlAvatar);
      } else {
        setImageSrc(
          `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN || ""}${story.urlAvatar}`
        );
      }
    } else {
      setImageSrc("/images/no-image.jpg");
    }
  }, [story.urlAvatar]);

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
        flexDirection: { xs: "row", md: "row" },
        maxWidth: { xs: "100%", md: "100%" },
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          my: 1,
          height: "64px",
          width: "52px",
          minWidth: "52px",
        }}
      >
        <CardMedia
          component="img"
          height="64px"
          width="52px"
          image="/images/no-image.jpg"
          alt={story?.storyName}
          sx={{ display: isImageLoaded ? "none" : "block" }}
        />
        <CardMedia
          component="img"
          height="64px"
          width="52px"
          image={imageSrc}
          title={story?.storyName}
          alt={story?.storyName || "Novel image"}
          onError={handleImageError}
          onLoad={handleImageLoad}
          sx={{ display: isImageLoaded ? "block" : "none" }}
        />
      </Card>
      <Stack
        direction="column"
        sx={{
          maxWidth: { xs: "calc(100% - 72px)", md: "none" },
        }}
      >
        <Typography
          fontWeight="bold"
          variant="subtitle1"
          color="text.default"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            lineClamp: 1,
          }}
        >
          {story?.storyName}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight="regular"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineClamp: 2,
          }}
        >
          {(story?.lastAddNewChapterLabel || "").replace("update", "")}
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <ImportContactsIcon
              sx={{
                color: "text.secondary",
              }}
            />
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight="bold"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                lineClamp: 1,
              }}
            >
              {"Chapter " + story.chapterNumber}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
