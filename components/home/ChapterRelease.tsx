import { Box, Stack, Typography, Card, CardMedia } from "@mui/material";
import * as React from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { StoryHome } from "@/models";

interface ChapterReleaseProps {
  story: StoryHome;
}

export function ChapterRelease({ story }: ChapterReleaseProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      mt={2}
      sx={{
        flexDirection: { xs: "row", md: "row" }, // Đảm bảo vẫn là hàng ngang
        maxWidth: { xs: "100%", md: "100%" }, // Tăng độ rộng khi màn hình lớn
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          my: 1,
          height: "88px",
          width: { xs: "72px", md: "100px" }, // Tăng độ rộng khi màn hình lớn
          minWidth: { xs: "72px", md: "100px" }, // Tăng minWidth khi màn hình lớn
        }}
      >
        <CardMedia
          component="img"
          height="88px"
          width="72px"
          image={story?.urlAvatar || ""}
          alt="Novel image"
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
          {story?.lastAddNewChapterLabel || "Chapter " + story.chapterNumber}
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
            >
              {story?.chapterNumber} chapter
            </Typography>
          </Stack>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="regular"
          >
            {story?.lastAddNewChapter || ""}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
