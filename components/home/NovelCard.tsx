import { Stack, Typography, Card, CardMedia } from "@mui/material";
import * as React from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

export function NovelCard() {
  return (
    <Stack spacing={1} direction="column" mt={2}>
      <Card sx={{ maxWidth: 230, borderRadius: 2, my: 1 }}>
        <CardMedia
          component="img"
          height="270"
          width="230"
          image="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Novel image"
        />
      </Card>
      <Typography variant="body2" fontWeight="bold" fontSize="medium">
        Solo Leveling
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <ImportContactsIcon
          sx={{
            color: "text.secondary",
          }}
        />
        <Typography variant="body2" color="text.secondary" fontSize="small">
          Number of Chapters
        </Typography>
      </Stack>
    </Stack>
  );
}
