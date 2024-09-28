import { Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export function Footer() {
  return (
    <Box
      component="footer"
      py={5}
      textAlign="center"
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      <Container>
        <Stack
          direction={["column", "row"]}
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
              <Typography fontSize="small">0123456789</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <EmailIcon />
              <Typography fontSize="small">example@gmail.com</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <LocationOnIcon />
              <Typography fontSize="small">
                1234 Đường 567 phường 789 quận 12
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={{ sx: "column", md: "row" }}
            flex={1}
            mt={{ xs: 4, sm: 0, md: 2 }}
            spacing={4}
          >
            <Stack
              direction="row"
              spacing={4}
              justifyContent={["space-between", "flex-start"]}
            >
              <Stack
                direction="column"
                textAlign="start"
                spacing={1}
                width={112}
              >
                <Typography fontWeight="bold" variant="body1">
                  BestStoryOn
                </Typography>
                <Typography variant="caption">Privacy Policy</Typography>
                <Typography variant="caption">Terms of Service</Typography>
                <Typography variant="caption">DMCA Notices</Typography>
              </Stack>
              <Stack
                direction="column"
                textAlign="start"
                width={88}
                spacing={1}
              >
                <Typography fontWeight="bold" variant="body1">
                  Contact Us
                </Typography>
                <Typography variant="caption">Facebook</Typography>
                <Typography variant="caption">Instagram</Typography>
                <Typography variant="caption">Linkedin</Typography>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              textAlign="start"
              width={{ sm: "100%", md: 280 }}
              spacing={1}
              mt={{ xs: 4, md: 0 }}
            >
              <Typography fontWeight="bold" variant="body1">
                Tags
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <Stack direction="column" spacing={1}>
                  <Typography variant="caption">Novel Ranking</Typography>
                  <Typography variant="caption">Latest Chapters</Typography>
                  <Typography variant="caption">Latest Novels</Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography variant="caption">Romance</Typography>
                  <Typography variant="caption">Fantasy</Typography>
                  <Typography variant="caption">Sci-fi</Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography variant="caption">Slice of Life</Typography>
                  <Typography variant="caption">Supernatural</Typography>
                  <Typography variant="caption">Video Games</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
