import { Box, Stack, Typography, Card, CardMedia } from "@mui/material";
import * as React from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

export function ChapterRelease() {
  return (
    <Stack direction="row" spacing={2} mt={2}>
      <Card
        sx={{
          borderRadius: 2,
          my: 1,
          height: "88px",
          width: "72px",
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          width="100%"
          image="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Novel image"
        />
      </Card>
      <Stack direction="column">
        <Typography fontWeight="bold" variant="subtitle1" color="text.default">
          I Gave Up Being Stronger
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight="regular"
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
              42 Chapter
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
