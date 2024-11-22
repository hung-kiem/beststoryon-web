import { Button } from "@mui/material";
import * as React from "react";

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
      title={`NovelsNook - List of Novels - ${title}`}
      onClick={() => onClick(code)}
    >
      {title}
    </Button>
  );
}
