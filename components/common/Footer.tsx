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
    `/category/getList`,
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
        backgroundColor: "background.paper",
        color: "#FFFFFF",
      }}
    >
      <Container>
        {/* Tiêu đề NovelsNook */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign={{ xs: "center", md: "left" }}
        >
          NovelsNook
        </Typography>

        <Stack
          mt={4}
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          {/* Menu Footer và Categories */}
          <Grid container spacing={2}>
            {/* Menu Footer */}
            {["Home", "Contact Us", "Term Of Use", "Cookie Policy", "DCMA"].map(
              (item, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <Link href="/" passHref>
                    <Typography
                      variant="caption"
                      color="inherit"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "underline", // Gạch chân
                        // color: "#0047AB", // Màu chữ xanh đậm
                        "&:hover": {
                          color: "#002B5C", // Màu xanh đậm hơn khi hover
                        },
                      }}
                    >
                      <ChevronRightIcon fontSize="small" sx={{ mr: 1 }} />{" "}
                      {/* Thêm icon */}
                      {item}
                    </Typography>
                  </Link>
                </Grid>
              )
            )}

            {/* Categories từ API */}
            {categories &&
              categories.map((category, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <Link
                    href={`/categories?catCode=${category.catCode}`}
                    passHref
                  >
                    <Typography
                      variant="caption"
                      color="inherit"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "underline", // Gạch chân
                        // color: "#0047AB", // Màu chữ xanh đậm
                        "&:hover": {
                          color: "#002B5C", // Màu xanh đậm hơn khi hover
                        },
                      }}
                    >
                      <ChevronRightIcon fontSize="small" sx={{ mr: 1 }} />{" "}
                      {/* Thêm icon */}
                      {category.catName}
                    </Typography>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Stack>

        {/* Phần Bản quyền */}
        <Typography variant="body2" color="inherit" mt={4} textAlign="center">
          © Copyright NovelsNook.Com. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
