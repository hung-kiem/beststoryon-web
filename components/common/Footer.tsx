import { Container, Stack, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { categoryApi } from "@/api-client";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;

export function Footer() {
  const { data: categories, isValidating: loadingList } = useSWR(
    "/category/getList",
    categoryApi.getList,
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );

  const links = [
    { label: "Contact", url: "/contact-us.html" },
    { label: "TOS", url: "/terms-of-service.html" },
    { label: "Privacy Policy", url: "/privacy-policy.html" },
    { label: "DCMA", url: "/dcma.html" },
  ];

  return (
    <Box
      component="footer"
      py={5}
      sx={{
        backgroundColor: "#0F172A",
        color: "#FFFFFF",
      }}
    >
      <Container>
        {/* Categories từ API */}
        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign={{ xs: "center", md: "left" }}
            width={{ xs: "100%", md: "auto" }}
          >
            Categories
          </Typography>
          <Grid container spacing={2} mb={4} columns={{ xs: 2, md: 4 }}>
            {categories?.map((category, index) => (
              <Grid item xs={1} md={1} key={index}>
                <Link href={`/categories/${category.catCode}`} passHref>
                  <Typography
                    variant="caption"
                    color="inherit"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "underline",
                    }}
                  >
                    <ChevronRightIcon fontSize="small" sx={{ mr: 1 }} />
                    {category.catName}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} mt={4} spacing={4}>
          <Grid container spacing={2} columns={{ xs: 2, md: 4 }}>
            {/* Tên trang web */}
            <Grid item xs={2} md={2}>
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign={{ xs: "center", md: "left" }}
              >
                NovelsNook
              </Typography>
            </Grid>
            {/* Mô tả bên trái */}
            <Grid item xs={2} md={2}>
              <Typography
                variant="body1"
                mt={1}
                textAlign={{ xs: "justify", md: "left" }}
                sx={{
                  textJustify: "inter-word",
                }}
              >
                Dive into a world of free online novels! Discover daily-updated
                stories, light novel, web novels, and a wide range of
                captivating genres. From Chinese, Japanese, Korean, and English
                novels.
              </Typography>
            </Grid>
          </Grid>

          {/* Các liên kết bên phải */}
          <Grid container spacing={2} columns={{ xs: 2, md: 2 }}>
            {links.map((link, index) => (
              <Grid item xs={1} md={1} key={index}>
                <Link href={link.url} passHref>
                  <Typography
                    variant="caption"
                    color="inherit"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "underline",
                    }}
                  >
                    <ChevronRightIcon fontSize="small" sx={{ mr: 1 }} />
                    {link.label}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>

        {/* Phần Bản quyền */}
        <Typography variant="body2" color="inherit" mt={4} textAlign="center">
          © Copyright{" "}
          <Link href="https://novelsnook.com/" passHref>
            <Typography
              variant="body2"
              component="span"
              sx={{ textDecoration: "underline", color: "inherit" }}
            >
              NovelsNook.Com
            </Typography>
          </Link>
          . All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
