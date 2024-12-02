import { Container, Stack, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { categoryApi } from "@/api-client";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;

export function Footer() {
  const { data: categories } = useSWR(
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
        <Stack direction="column" spacing={1} mb={6}>
          {/* <Typography
            variant="h6"
            fontWeight="bold"
            textAlign={{ xs: "center", md: "left" }}
            width={"100%"}
          >
            Categories
          </Typography> */}
          <Grid
            container
            spacing={2}
            columns={{ xs: 2, sm: 4, md: 4 }}
            sx={{
              paddingRight: 2,
            }}
          >
            {categories?.map((category) => (
              <Grid item xs={1} md={1} key={category.catCode}>
                <Link
                  href={`/categories/${category.catCode}/list-1.html`}
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
                    {category.catName}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>

        {/* Tên trang web */}
        <Stack
          direction="column"
          spacing={2}
          mb={2}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              paddingLeft: { md: "20%" },
            }}
          >
            NovelsNook
          </Typography>
        </Stack>

        {/* Mô tả trang web và các liên kết điều khoản chính sách */}
        <Grid container spacing={0} alignItems="flex-start">
          {/* Mô tả trang web */}
          <Grid item xs={12} md={6}>
            <Stack direction="column" spacing={2}>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  textAlign: { xs: "justify", md: "left" },
                  textJustify: "inter-word",
                  color: "white",
                }}
              >
                Dive into a world of free online novels! Discover daily-updated
                stories, light novel, web novels, and a wide range of
                captivating genres. From Chinese, Japanese, Korean, and English
                novels.
              </Typography>
            </Stack>
          </Grid>

          {/* Các liên kết điều khoản chính sách */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              marginTop: { xs: 2, md: 0 },
            }}
          >
            <Grid
              container
              spacing={2}
              columns={{ xs: 2, sm: 4, md: 2 }}
              sx={{
                paddingLeft: 2,
              }}
            >
              {links.map((link) => (
                <Grid
                  item
                  xs={1}
                  md={1}
                  key={link.label}
                  sx={{
                    width: "50%",
                  }}
                >
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
          </Grid>
        </Grid>

        {/* Phần Bản quyền */}
        <Typography variant="body2" color="inherit" mt={4} textAlign="center">
          © Copyright{" "}
          <Link href="https://novelsnook.com/">
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
