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
              banner.bannerType === "IMAGE" &&
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
    const img = event.currentTarget;
    setIsVertical(img.naturalWidth < img.naturalHeight);
    console.log("setLoaded: ", setLoaded);
    setLoaded(true);
  };

  useEffect(() => {
    if (banner.bannerType === "HTML" && bannerRef.current) {
      const images = bannerRef.current.querySelectorAll("img");
      let loadedImages = 0;

      const handleImageLoaded = () => {
        loadedImages += 1;
        if (loadedImages === images.length) {
          setLoaded(true);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          handleImageLoaded();
        } else {
          img.onload = handleImageLoaded;
          img.onerror = handleImageLoaded; // Xử lý cả trường hợp lỗi để không treo trạng thái loading
        }
      });

      // Thay thế các thẻ script để đảm bảo chúng được chạy lại
      const scripts = bannerRef.current.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        if (oldScript.parentNode) {
          const newScript = document.createElement("script");
          newScript.textContent = oldScript.textContent;
          Array.from(oldScript.attributes).forEach((attr) =>
            newScript.setAttribute(attr.name, attr.value)
          );
          oldScript.parentNode.replaceChild(newScript, oldScript);
        }
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
              maxHeight: 400,
            }}
            image={banner.bannerUrl}
            alt={banner.bannerDesc}
            onLoad={handleImageLoad}
          />
        );
      case "HTML":
        return banner.bannerHTML ? (
          <Box
            ref={bannerRef}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: 400,
              overflow: "hidden",
              backgroundColor: "green",
            }}
            dangerouslySetInnerHTML={{ __html: banner.bannerHTML }}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Grid item xs={12} style={{ display: loaded ? "block" : "none" }}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          // backgroundColor: "transparent",
          backgroundColor: "pink",
          height: "auto",
        }}
      >
        {renderBannerContent()}
      </Card>
    </Grid>
  );
};

export default BannerPage;
