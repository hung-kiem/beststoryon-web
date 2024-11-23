import { Button } from "@mui/material";
import React from "react";

export interface ICategoryButtonProps {
  title: string;
  code: string;
  isActive: boolean;
  onClick: (code: string) => void;
}

export function CategoryButton({
  title,
  code,
  isActive,
  onClick,
}: ICategoryButtonProps) {
  return (
    <Button
      variant={isActive ? "contained" : "outlined"}
      sx={{
        backgroundColor: isActive ? "background.paper" : "",
        color: isActive ? "secondary.contrastText" : "background.paper",
        borderColor: "background.paper",
      }}
      onClick={() => onClick(code)}
    >
      {title}
    </Button>
  );
}
