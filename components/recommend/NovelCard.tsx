import { Stack, Typography, Card, CardMedia } from "@mui/material";
import React from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import StarIcon from "@mui/icons-material/Star";

export function NovelCard() {
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
          image=""
          alt="Novel image"
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
            backgroundColor: "background.paper",
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
            5.0
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
            backgroundColor: "background.paper",
            borderRadius: 2,
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <Typography variant="caption" color="secondary.contrastText">
            On going
          </Typography>
        </Stack>
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
