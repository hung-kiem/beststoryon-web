import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import { Container, Icon, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export function Footer() {
  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/",
      icon: Twitter,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: Facebook,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      icon: LinkedIn,
    },
  ];

  return (
    <Box
      component="footer"
      py={2}
      textAlign="center"
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      <Container>
        <Stack
          direction="row"
          sx={{
            color: "#FFFFFF",
          }}
          display="flex"
        >
          <Stack
            direction="column"
            spacing={1}
            flex={1}
            alignItems="flex-start"
          >
            <Typography variant="h4" fontWeight="bold">
              BestStoryOn
            </Typography>
            <Stack direction="row" spacing={1}>
              <LocalPhoneIcon />
              <Typography variant="body2">+91 1234567890</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <EmailIcon />
              <Typography variant="body2">abc@gmail.com</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <LocationOnIcon />
              <Typography variant="body2">Hanoi, Vietnam</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" flex={1}>
            <Stack direction="row" spacing={1}>
              <Box
                alignItems="center"
                justifyContent="start"
                sx={{ backgroundColor: "violet" }}
              >
                <Typography fontWeight="bold">BestStoryOn</Typography>
                <Typography variant="body2">Privacy Policy</Typography>
                <Typography variant="body2">Terms of Service</Typography>
                <Typography variant="body2">DMCA Notices</Typography>
              </Box>
              <Box sx={{ backgroundColor: "red" }}>
                <Typography fontWeight="bold">Contact Us</Typography>
                <Typography variant="body2">Facebook</Typography>
                <Typography variant="body2">Instagram</Typography>
                <Typography variant="body2">Linkedin</Typography>
              </Box>
            </Stack>
            <Box justifyContent="start" sx={{ backgroundColor: "green" }}>
              <Typography fontWeight="bold">Tags</Typography>
              <Stack direction="row" spacing={1}>
                <Box>
                  <Typography>Novel Ranking</Typography>
                  <Typography>Latest Chapters</Typography>
                  <Typography>Latest Novels</Typography>
                </Box>
                <Box>
                  <Typography>Romance</Typography>
                  <Typography>Fantasy</Typography>
                  <Typography>Sci-fi</Typography>
                </Box>
                <Box>
                  <Typography>Slice of Life</Typography>
                  <Typography>Supernatural</Typography>
                  <Typography>Video Games</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
