import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface ChapterTitleProps {
  chapterNumber: string;
  title: string;
  date: string;
}

export function ChapterTitle({
  chapterNumber,
  title,
  date,
}: ChapterTitleProps) {
  return (
    <Stack
      direction="row"
      spacing={0}
      justifyContent="space-between"
      sx={{
        width: "100%",
      }}
    >
      <Stack direction="column" spacing={0}>
        <Typography variant="caption">{chapterNumber}</Typography>
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
      </Stack>
      <Typography variant="body2" fontWeight="bold">
        {date}
      </Typography>
    </Stack>
  );
}
