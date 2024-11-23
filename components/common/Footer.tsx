import { Container, Stack, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { categoryApi } from "@/api-client";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Icon mũi tên trỏ phải không có đuôi

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
          <Grid container spacing={2} mb={4}>
            {categories &&
              categories.map((category, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Link href={`/categories/${category.catCode}`} passHref>
                    <Typography
                      variant="caption"
                      color="inherit"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "underline", // Gạch chân
                        "&:hover": {
                          color: "#002B5C", // Màu xanh đậm hơn khi hover
                        },
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
        <Stack direction="row" mt={4}>
          <Grid item xs={12} md={6} flex={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign={{ xs: "center", md: "left" }}
            >
              NovelsNook
            </Typography>
            <Typography
              variant="body1"
              mt={1}
              textAlign={{ xs: "justify", md: "left" }}
              sx={{
                float: { xs: "none", md: "left" },
                textJustify: "inter-word",
              }}
            >
              Dive into a world of free online novels! Discover daily-updated
              stories, light novel, web novels, and a wide range of captivating
              genres. From Chinese, Japanese, Korean, and English novels.
            </Typography>
          </Grid>
          <Grid container spacing={0} mt={5} flex={1} sx={{ paddingLeft: 8 }}>
            {["Contact", "TOS", "Privacy Policy", "DCMA"].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Link
                  href={
                    item === "Contact"
                      ? "/contact-us.html"
                      : item === "TOS"
                      ? "/terms-of-service.html"
                      : item === "Privacy Policy"
                      ? "/privacy-policy.html"
                      : "/dcma.html"
                  }
                  passHref
                >
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
                    {item}
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
