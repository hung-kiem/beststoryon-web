import { Box, Stack, Typography, Card, CardMedia } from "@mui/material";
import * as React from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { StoryHome } from "@/models";

interface ChapterReleaseProps {
  story: StoryHome;
}

export function ChapterRelease({ story }: ChapterReleaseProps) {
  return (
    <Stack direction="row" spacing={2} mt={2}>
      <Card
        sx={{
          borderRadius: 2,
          my: 1,
          height: "88px",
          width: "72px",
          minWidth: "72px",
        }}
      >
        <CardMedia
          component="img"
          height="88px"
          width="72px"
          image="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=88&w=65&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Novel image"
        />
      </Card>
      <Stack
        direction="column"
        sx={{
          maxWidth: "calc(100% - 72px)",
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
          Chap 42: Sự khởi đầu của huyền thoại
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
            5 Minutes Ago
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
