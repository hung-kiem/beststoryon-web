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
            component="img"
            height="140"
            image="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="random"
          />
        </Card>
      </Container>
    </Box>
  );
}
