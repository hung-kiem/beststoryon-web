import { Card, CardMedia, Stack, Typography } from "@mui/material";
import * as React from "react";

export function RecommendCardSecondary() {
  return (
    <Card
      sx={{
        borderRadius: 2,
        height: "100%",
        display: "absolute",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        image="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Novel image"
        height="100%"
        sx={{
          maxHeight: "200px",
        }}
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
          right: 10,
          top: 10,
        }}
      >
        <Typography
          variant="body2"
          color="secondary.contrastText"
          fontWeight="bold"
        >
          5.0
        </Typography>
      </Stack>
      <Stack
        direction="column"
        display="flex"
        spacing={1}
        alignItems="left"
        width="fit-content"
        height="fit-content"
        p="4px"
        sx={{
          borderRadius: 2,
          position: "absolute",
          left: 10,
          bottom: 10,
        }}
      >
        <Typography
          variant="body2"
          color="secondary.contrastText"
          fontWeight="bold"
          sx={{
            textShadow: "1px 1px 1px #000",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineClamp: 2,
          }}
        >
          I Can Copy Talent Novel I Can Copy Talent Novel
        </Typography>
        <Typography
          variant="body2"
          color="secondary.contrastText"
          fontWeight="regular"
          sx={{
            textShadow: "1px 1px 1px #000",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineClamp: 2,
          }}
        >
          Action, Fantasy, Adventure, Action, Fantasy, Adventure
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography
            variant="caption"
            color="secondary.contrastText"
            fontWeight="regular"
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              p: 1,
            }}
          >
            Action
          </Typography>
          <Typography
            variant="caption"
            color="secondary.contrastText"
            fontWeight="regular"
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              p: 1,
            }}
          >
            On going
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}