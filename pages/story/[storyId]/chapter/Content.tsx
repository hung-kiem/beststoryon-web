"use client";

import { Typography } from "@mui/material";
import React from "react";

const Content = ({
  content,
  fontSize,
  fontFamily,
  banner,
}: {
  content: string;
  fontSize: number;
  fontFamily: string;
  banner: React.ReactNode;
}) => {
  const parts = content.split("</p>");
  const middleIndex = Math.floor(parts.length / 2);

  // Tách content thành hai phần và chèn banner vào giữa
  const firstHalf = parts.slice(0, middleIndex).join("</p>") + "</p>";
  const secondHalf = parts.slice(middleIndex).join("</p>");

  return (
    <Typography
      variant="body2"
      textAlign="left"
      sx={{
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily === "Default" ? "inherit" : fontFamily,
        "& p, & div, & li": {
          marginBottom: "20px",
        },
      }}
    >
      <div>
        <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
        <div id="banner-2">{banner}</div>
        <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
      </div>
    </Typography>
  );
};

export default Content;
