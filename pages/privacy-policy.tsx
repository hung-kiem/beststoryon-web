import { Seo } from "@/components/common";
import { Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "@/components/layout";

const PrivacyPolicyPage: NextPageWithLayout = () => {
  useEffect(() => {
    document.title = "Privacy Policy - NovelsNook";
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
          Privacy Policy of novelsnook.com
        </Typography>
        <Typography variant="body1" paragraph>
          novelsnook.com is committed to protecting the privacy and personal
          information of users when using our services (collectively referred to
          as "Service"). This Privacy Policy ("Privacy Policy") is established
          to guide how we collect, store, and use the information you provide to
          us.
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing our Service, including registering for an account at
          novelsnook.com, downloading and using software provided, or clicking
          the "I accept" button (or equivalent), you agree to the practices
          described in this Privacy Policy. If you do not agree, please do not
          use our Service.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          1. Scope of Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          This Privacy Policy applies to the collection and use of personal
          information provided through the Service of novelsnook.com. Personal
          information includes your name, address, phone number, email, and any
          other information related to your identity. Note that advertisements
          or links to other websites from our Service may collect personal
          information about you, and this Privacy Policy does not apply to those
          activities.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect the following types of data from you:
          <ul>
            <li>
              Personal information such as your name, email address when you
              register for an account, make purchases, or request support.
            </li>
            <li>
              Automatically collected information through log files, such as IP
              address, operating system, browser type, time, and other system
              information.
            </li>
            <li>
              Details of your use of the Service and information related to the
              resources you access.
            </li>
            <li>
              User feedback, community discussions, and other interactions on
              our Service.
            </li>
          </ul>
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          3. Tracking Technologies & Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          novelsnook.com and our partners use tracking technologies such as
          cookies, beacons, and scripts to analyze trends, manage the website,
          and gather demographic information about users. You can adjust your
          browser settings to control the use of cookies. However, if you reject
          cookies, some features may be limited.
        </Typography>
        {/* Remaining sections */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          4. Use and Sharing of Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use personal and non-personal information to:
          <ul>
            <li>Manage and operate the Service, improve your experience.</li>
            <li>
              Develop new products, provide technical support, and software
              updates.
            </li>
            <li>Communicate with you about our Service.</li>
            <li>Advertising and promotional purposes if you have agreed.</li>
          </ul>
          novelsnook.com does not sell or rent your personal information to
          third parties without your consent. However, we may share personal
          information with third parties that provide support services or when
          required by law.
        </Typography>
        {/* Add remaining sections similarly */}
      </Container>
    </Box>
  );
};

PrivacyPolicyPage.Layout = MainLayout;
export default PrivacyPolicyPage;
