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
  const [countdown, setCountdown] = useState(3);

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
      setLoaded(true); // Set loaded to true for sanitized HTML content
    }
  }, [banner]);

  useEffect(() => {
    if (banner.bannerType === "HTML" && bannerRef.current) {
      // Tìm và thực thi các thẻ <script> sau khi HTML đã được render
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

  const exampleHtmlAd = `<div style="text-align: center; position: relative;"><a href="https://www.rolex.com" target="_blank"><img src="https://images.unsplash.com/photo-1709884732294-90379fee354c?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Quảng cáo Banner" style="width: 100%; height: 100%; object-fit: cover;"/></a><div style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 5px;">Chuyển đến sau: <span id="countdown">3</span> giây</div><script>(function() {var countdownElement = document.getElementById('countdown');var countdownValue = 3;var countdownInterval = setInterval(function() {countdownValue--;if (countdownElement) {countdownElement.textContent = countdownValue;}if (countdownValue <= 0) {clearInterval(countdownInterval);}}, 1000);})();</script></div>`;

  banner.bannerHTML = exampleHtmlAd;

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
