// components/common/LoadingOverlay.tsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white", // Màu nền trắng
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, // Đảm bảo lớp phủ hiển thị phía trên mọi thứ
      }}
    >
      <CircularProgress color="primary" /> {/* Biểu tượng loading */}
    </Box>
  );
};
