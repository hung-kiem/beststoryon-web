import { Box, Container } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export function Banner() {
  return (
    <Box component="section" bgcolor={"background.default"} py={4}>
      <Container>
        <Card
          sx={{
            borderRadius: 2,
          }}
        >
          <CardMedia
            component="iframe"
            height="200"
            src="https://www.youtube.com/embed/7ICKkagL3xA"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Card>
      </Container>
    </Box>
  );
}
