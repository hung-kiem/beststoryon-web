import { Seo } from "@/components/common";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import React from "react";

const ContactUsPage: NextPageWithLayout = () => {
  useEffect(() => {
    document.title = "Contact Us - NovelsNook";
  }, []);

  return (
    <Box py={5}>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title:
            "NovelsNook - Explore Fan-Fiction Novels Online – Completely Free!",
          description:
            "Dive into a world of free online novels! Discover daily-updated stories, including light novel, web novels, and a wide range of captivating genres.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We’re here to help! If you have any questions, suggestions, or
          concerns, feel free to reach out to us using the details below.
        </Typography>
        <Typography variant="body1" paragraph>
          Email: inspirednovels (at) gmail.com
        </Typography>
        <Typography variant="body1" paragraph>
          Alternatively, you can use our contact email to get in touch with our
          support team. We aim to respond within 24-48 hours.
        </Typography>
      </Container>
    </Box>
  );
};

ContactUsPage.Layout = MainLayout;
export default ContactUsPage;
