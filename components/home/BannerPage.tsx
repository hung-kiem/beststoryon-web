import { Box, Container, Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Banner } from "@/models/banner";
import sanitizeHtml from "sanitize-html";

interface BannerProps {
  data: Banner[];
}

const BannerPage = ({ data }: BannerProps) => {
  return (
    <Box component="section" bgcolor={"background.default"} py={4}>
      <Container>
        <Grid container spacing={4} direction="column">
          {data.map((banner, index) => {
            if (
              (banner.bannerType === "IMAGE" ||
                banner.bannerType === "VIDEO") &&
              banner.bannerUrl &&
              banner.bannerUrl !== ""
            ) {
              return <BannerCard key={index} banner={banner} />;
            } else if (banner.bannerType === "HTML" && banner.bannerHTML) {
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
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    const img = event.currentTarget;
    setIsVertical(img.naturalWidth < img.naturalHeight);
  };

  useEffect(() => {
    if (banner.bannerType === "HTML" && banner.bannerHTML) {
      const sanitizedHTML = sanitizeHtml(banner.bannerHTML, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["script"]),
        allowedAttributes: {
          "*": ["style", "class"],
        },
      });
      banner.bannerHTML = sanitizedHTML;
      setLoaded(true);
    }
  }, [banner]);

  useEffect(() => {
    if (banner.bannerType === "HTML" && bannerRef.current) {
      const scripts = bannerRef.current.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        newScript.textContent = oldScript.textContent;
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
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
              objectFit: isVertical ? "contain" : "cover",
              maxHeight: 600,
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
              maxHeight: 600,
            }}
            src={banner.bannerUrl}
          />
        );
      case "HTML":
        return banner.bannerHTML ? (
          <Box
            ref={bannerRef}
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
    </Grid>
  );
};

export default BannerPage;
