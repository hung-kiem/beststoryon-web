import { Stack, Typography, Card, CardMedia } from "@mui/material";
import React, { useState } from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import StarIcon from "@mui/icons-material/Star";

export type NovelCardProps = {
  storyName: string;
  rating: number;
  chapterNumber: number;
  status: string;
  avatarUrl: string;
};

export function NovelCard({
  storyName,
  rating,
  chapterNumber,
  status,
  avatarUrl,
}: NovelCardProps) {
  const [imageSrc, setImageSrc] = useState(avatarUrl);

  const handleImageError = () => {
    setImageSrc(process.env.NEXT_PUBLIC_DEFAULT_IMAGE || "");
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
          image={imageSrc}
          alt={storyName}
          title={storyName}
          onError={handleImageError}
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
            {rating || "5.0"}
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
            backgroundColor: status === "Ongoing" ? "#c14646" : "#377f49",
            borderRadius: 2,
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <Typography variant="caption" color="secondary.contrastText">
            {status}
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
        {storyName}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <ImportContactsIcon
          sx={{
            color: "text.secondary",
          }}
        />
        <Typography variant="body2" color="text.secondary" fontSize="small">
          {chapterNumber} Chapter
        </Typography>
      </Stack>
    </Stack>
  );
}
