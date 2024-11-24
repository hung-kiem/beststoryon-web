import { useThemeContext } from "@/context";
import { StoryDetail } from "@/models/story";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";

export interface ISearchItemProps {
  story: StoryDetail;
  onSelected?: (story: StoryDetail) => void;
}

export function SearchItem({ story, onSelected }: ISearchItemProps) {
  const { mode } = useThemeContext();
  const [imageSrc, setImageSrc] = useState(story?.urlAvatar || "");
  const handleImageError = () => {
    setImageSrc(process.env.NEXT_PUBLIC_DEFAULT_IMAGE || "");
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
          marginY: "8px",
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
            height: "64px",
            width: "48px",
            overflow: "hidden",
            minWidth: "48px",
          }}
        >
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
            }}
            onError={handleImageError}
          />
        </Card>
        <Stack direction="column" sx={{ maxWidth: "calc(100% - 64px)", ml: 2 }}>
          <Typography
            fontWeight="bold"
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
