import { Stack, Typography, Card, CardMedia } from "@mui/material";
import React, { useState, useEffect } from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import StarIcon from "@mui/icons-material/Star";
import { StoryHome } from "@/models";

interface NovelCardProps {
  story: StoryHome;
}

export function NovelCard({ story }: NovelCardProps) {
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
    <Stack spacing={1} direction="column" mt={2}>
      <Card
        sx={{
          maxWidth: 230,
          borderRadius: 2,
          my: 1,
          display: "absolute",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          width="230"
          image="/images/no-image.jpg"
          title={story?.storyName}
          alt={story?.storyName || "Novel image"}
          onError={handleImageError}
          sx={{ display: isImageLoaded ? "none" : "block" }}
        />
        <CardMedia
          component="img"
          height="250"
          width="230"
          image={imageSrc}
          title={story?.storyName}
          alt={story?.storyName || "Novel image"}
          onError={handleImageError}
          onLoad={handleImageLoad}
          sx={{ display: isImageLoaded ? "block" : "none" }}
        />
        <Stack
          direction="row"
          display="flex"
          spacing={1}
          alignItems="center"
          width="fit-content"
          height="fit-content"
          p="4px"
          sx={{
            backgroundColor: "#000",
            borderRadius: 2,
            position: "absolute",
            left: 10,
            top: 10,
            bottom: 0,
            right: 0,
          }}
        >
          <Typography
            variant="body2"
            color="secondary.contrastText"
            fontWeight="bold"
          >
            5.0
          </Typography>
          <StarIcon sx={{ color: "#FFF1C2" }} />
        </Stack>

        <Stack
          direction="row"
          display="flex"
          spacing={1}
          alignItems="center"
          width="fit-content"
          height="fit-content"
          p="4px"
          sx={{
            backgroundColor:
              story?.status === "Ongoing" ? "#c14646" : "#377f49",
            borderRadius: 2,
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <Typography variant="caption" color="secondary.contrastText">
            {story?.status}
          </Typography>
        </Stack>
      </Card>
      <Typography
        variant="body2"
        fontWeight="bold"
        fontSize="medium"
        sx={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          lineClamp: 2,
        }}
      >
        {story?.storyName}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <ImportContactsIcon
          sx={{
            color: "text.secondary",
          }}
        />
        <Typography variant="body2" color="text.secondary" fontSize="small">
          {story?.chapterNumber} Chapter
        </Typography>
      </Stack>
    </Stack>
  );
}
