import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface ChapterTitleProps {
  chapterNumber: string;
  title: string;
  date: string;
  onClick?: () => void;
}

export function ChapterTitle({
  chapterNumber,
  title,
  date,
  onClick,
}: ChapterTitleProps) {
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
          mt: 2,
          cursor: onClick ? "pointer" : "default",
          "&:hover": onClick
            ? {
                backgroundColor: "action.hover",
              }
            : undefined,
        }}
        onClick={onClick}
      >
        <Stack
          direction="row"
          sx={{
            flex: 1,
            maxWidth: "calc(100% - 120px)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {chapterNumber} - {title}
          </Typography>
        </Stack>

        <Typography
          variant="caption"
          fontWeight="regular"
          sx={{
            width: "120px",
            textAlign: "right",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {date.replace("update", "")}
        </Typography>
      </Stack>
    </>
  );
}
