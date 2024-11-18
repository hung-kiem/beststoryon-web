import { Container, Stack, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { categoryApi } from "@/api-client";

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
          flexWrap="wrap" // Cho phép bọc cột khi không đủ không gian
        >
          {/* Menu Footer và Category Gộp Lại trong Grid */}
          <Grid container spacing={2} sx={{ flex: 1, minWidth: "200px" }}>
            {/* Menu Footer */}
            <Grid item xs={6} md={4}>
              <Link href="/" passHref>
                <Typography variant="caption" component="a" color="inherit">
                  Home
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6} md={4}>
              <Link href="/" passHref>
                <Typography variant="caption" component="a" color="inherit">
                  Contact Us
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6} md={4}>
              <Link href="/" passHref>
                <Typography variant="caption" component="a" color="inherit">
                  Term Of Use
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6} md={4}>
              <Link href="/" passHref>
                <Typography variant="caption" component="a" color="inherit">
                  Cookie Policy
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6} md={4}>
              <Link href="/" passHref>
                <Typography variant="caption" component="a" color="inherit">
                  DCMA
                </Typography>
              </Link>
            </Grid>

            {/* Danh sách Category */}
            {!loadingList && categories && (
              <>
                {categories.map((category, index) => (
                  <Grid item xs={6} md={4} key={index}>
                    <Link href="/" passHref>
                      <Typography
                        variant="caption"
                        component="a"
                        color="inherit"
                      >
                        {category.catName}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
              </>
            )}
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
