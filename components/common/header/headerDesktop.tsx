import { Container, Link as MuiLink, Icon, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import * as React from "react";
import { ROUTE_LIST } from "./routes";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export function HeaderDesktop() {
  const router = useRouter();

  return (
    <Box display={{ xs: "none", sm: "block" }} py={2}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/" passHref>
            <Icon
              sx={{
                fontSize: 70,
                alignItems: "center",
              }}
            >
              <AutoStoriesIcon
                sx={{
                  fontSize: 50,
                  height: "100%",
                }}
              />
            </Icon>
          </Link>
          <Stack direction="row" justifyContent="flex-start" spacing={4}>
            {ROUTE_LIST.map((route) => (
              <Link key={route.path} href={route.path} passHref legacyBehavior>
                <MuiLink
                  sx={{ ml: 2 }}
                  underline="none"
                  className={clsx({
                    active: route.path === router.pathname,
                  })}
                >
                  {route.label}
                </MuiLink>
              </Link>
            ))}
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              size="small"
              placeholder="Search"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "text.primary",
                  },
                  borderRadius: "6px",
                },
              }}
            />
            <ThemeToggle />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
