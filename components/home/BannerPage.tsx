import { Box, Container } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Banner } from "@/models/banner";

interface BannerProps {
  data: Banner[];
}

const BannerPage = ({ data }: BannerProps) => {
  return (
    <Box component="section" bgcolor={"background.default"} py={4}>
      <Container>
        {data.map((banner, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 2,
              mt: 2,
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={banner.bannerUrl}
              alt={banner.bannerDesc}
            />
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default BannerPage;
