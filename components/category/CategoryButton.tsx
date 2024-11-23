import { Button } from "@mui/material";
import * as React from "react";

export interface ICategoryButtonProps {
  name: string;
  code: string;
  isActive: boolean;
  onClick: (code: string) => void;
}

export function CategoryButton({
  name,
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
      title={`NovelsNook - List of Novels - ${name}`}
      onClick={() => onClick(code)}
    >
      {name}
    </Button>
  );
}
