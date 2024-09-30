import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

export function ChapterTitle() {
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
        <Typography variant="caption">Chương 1</Typography>
        <Typography variant="body1" fontWeight="bold">
          Whispers of the Ancients
        </Typography>
      </Stack>
      <Typography variant="body2" fontWeight="bold">
        10 day ago
      </Typography>
    </Stack>
  );
}
