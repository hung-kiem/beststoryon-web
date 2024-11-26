import { useThemeContext } from "@/context";
import { StoryDetail } from "@/models/story";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface ISearchItemMobileProps {
  story: StoryDetail;
  onSelected?: (story: StoryDetail) => void;
}

export function SearchItemMobile({
  story,
  onSelected,
}: ISearchItemMobileProps) {
  const { mode } = useThemeContext();
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
    <>
      <Box
        component="li"
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: "8px",
          backgroundColor: mode === "light" ? "#0F172A" : "#FFF",
          borderRadius: "4px",
          marginY: "4px",
          transition: "opacity 0.3s",
          "&:hover": {
            opacity: 0.8,
            cursor: "pointer",
          },
        }}
        onClick={onSelected ? () => onSelected(story) : undefined}
      >
        <Card
          sx={{
            borderRadius: 2,
            height: "48px",
            width: "36px",
            overflow: "hidden",
            minWidth: "36px",
          }}
        >
          <CardMedia
            component="img"
            image="/images/no-image.jpg"
            alt={story?.storyName}
            title={story?.storyName}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: isImageLoaded ? "none" : "block",
            }}
            onError={handleImageError}
          />
          <CardMedia
            component="img"
            image={imageSrc}
            alt={story?.storyName}
            title={story?.storyName}
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
        <Stack direction="column" sx={{ maxWidth: "calc(100% - 64px)", ml: 2 }}>
          <Typography
            fontWeight="regular"
            fontSize={14}
            variant="subtitle1"
            color={mode === "light" ? "white" : "black"}
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
        </Stack>
      </Box>
    </>
  );
}
