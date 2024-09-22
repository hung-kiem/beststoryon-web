import { Box } from "@mui/system";
import Link from "next/link";
import * as React from "react";

export function Header() {
  console.log("render header");

  return (
    <Box component="header" py={2} textAlign="center">
      <Link href="/">Home</Link>
      <Link href="/blogs">Blog</Link>
      <Link href="/works">Works</Link>
      Header
    </Box>
  );
}
