import { Box, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
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
        <Grid container direction="column" spacing={4}>
          {data.map((banner, index) => {
            if (banner.bannerUrl && banner.bannerUrl !== "") {
              return <BannerCard key={index} banner={banner} />;
            }
            return null;
          })}
        </Grid>
      </Container>
    </Box>
  );
};

const BannerCard = ({ banner }: { banner: Banner }) => {
  const [loaded, setLoaded] = useState(false);
  const [isVertical, setIsVertical] = useState(false);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    const img = event.currentTarget;
    setIsVertical(img.naturalWidth < img.naturalHeight);
  };

  useEffect(() => {
    if (banner.bannerType === "HTML" && banner.bannerHTML) {
      setLoaded(true); // Immediately set loaded to true for HTML content
    }
  }, [banner.bannerType, banner.bannerHTML]);

  const renderBannerContent = () => {
    switch (banner.bannerType) {
      case "IMAGE":
        return (
          <CardMedia
            component="img"
            sx={{
              height: "auto",
              width: "100%",
              objectFit: isVertical ? "contain" : "cover", // Maintain aspect ratio for vertical images, fill width for horizontal images
              maxHeight: 600, // Set a maximum height to prevent extremely tall images
            }}
            image={banner.bannerUrl}
            alt={banner.bannerDesc}
            onLoad={handleImageLoad}
          />
        );
      case "VIDEO":
        return (
          <CardMedia
            component="video"
            controls
            sx={{
              height: "auto",
              width: "100%",
              maxHeight: 600, // Set a maximum height to prevent extremely tall videos
            }}
            src={banner.bannerUrl}
          />
        );
      case "HTML":
        return banner.bannerHTML ? (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: 600,
              overflow: "hidden",
            }}
            dangerouslySetInnerHTML={{ __html: banner.bannerHTML }}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Grid item xs={12}>
      <a
        href={banner.bannerLinkTo}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            transition: "transform 0.3s ease-in-out",
            visibility:
              loaded || banner.bannerType !== "IMAGE" ? "visible" : "hidden",
            "&:hover": {
              transform: "scale(1.05)",
            },
            backgroundColor: "transparent",
          }}
        >
          {renderBannerContent()}
        </Card>
      </a>
    </Grid>
  );
};

export default BannerPage;
