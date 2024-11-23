import { Seo } from "@/components/common";
import { Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "@/components/layout";

const TermsConditionsPage: NextPageWithLayout = () => {
  useEffect(() => {
    document.title = "Terms and Conditions - NovelsNook";
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
          Terms of Service
        </Typography>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          These terms and conditions ("Terms", "Agreement") are an agreement
          between Website Operator ("Website Operator", "us", "we" or "our") and
          you ("User", "you" or "your"). This Agreement sets forth the general
          terms and conditions of your use of the https://www.novelsnook.com
          website and any of its products or services (collectively, "Website"
          or "Services").
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Age Requirement
        </Typography>
        <Typography variant="body1" paragraph>
          You must be at least 13 years of age to use this Website. By using
          this Website and by agreeing to this Agreement you warrant and
          represent that you are at least 13 years of age.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Backups
        </Typography>
        <Typography variant="body1" paragraph>
          We are not responsible for Content residing on the Website. In no
          event shall we be held liable for any loss of any Content. It is your
          sole responsibility to maintain appropriate backup of your Content.
          Notwithstanding the foregoing, on some occasions and in certain
          circumstances, with absolutely no obligation, we may be able to
          restore some or all of your data that has been deleted as of a certain
          date and time when we may have backed up data for our own purposes. We
          make no guarantee that the data you need will be available.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          NovelsNook User Accounts
        </Typography>
        <Typography variant="body1" paragraph>
          In order to access some features of novelsnook.com Services, you will
          have to create a novelsnook.com user account. You may never use
          another's user account without permission. When you register for an
          account, you may be required to provide us with some information about
          yourself, such as your email address or other contact information. You
          agree that the information you provide to us is accurate and that you
          will keep it accurate and up-to-date at all times. You are solely
          responsible for maintaining the confidentiality of your account and
          password, and you accept responsibility for all activities that occur
          under your account. If you have reason to believe that your account is
          no longer secure, then you must immediately notify us at
          info@novelsnook.com.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          General Use of the Service
        </Typography>
        <Typography variant="body1" paragraph>
          NovelsNook hereby grants you permission to access and use their
          Services as set forth in these Terms of Service, provided that:
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>You do not alter or modify any part of the Service.</li>
            <li>
              You agree not to use or launch any automated system, including
              without limitation, "robots," "spiders," or "offline readers,"
              that accesses the Service in a manner that attempts to forge the
              presence of a user accessing the site for the purpose of
              artificially increasing "pageviews," "subscribers," or "likes".
            </li>
            <li>
              You agree not to collect or harvest any personally identifiable
              information, including user account names, from the Service, nor
              to use the communication systems provided by the Service for any
              commercial solicitation purposes.
            </li>
            <li>
              In your use of the Service, you will comply with all applicable
              laws.
            </li>
            <li>
              NovelsNook reserves the right to discontinue any aspect of the
              Service at any time.
            </li>
          </ul>
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Prohibited Uses
        </Typography>
        <Typography variant="body1" paragraph>
          In addition to other terms as set forth in the Agreement, you are
          prohibited from using the Website or its Content for any unlawful
          purpose, to solicit others to perform unlawful acts, to violate any
          regulations, or to infringe upon or violate our intellectual property
          rights or the intellectual property rights of others. We reserve the
          right to terminate your use of the Service for violating any of the
          prohibited uses.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          To the fullest extent permitted by applicable law, in no event will
          Website Operator, its affiliates, officers, directors, employees,
          agents, suppliers or licensors be liable to any person for any
          indirect, incidental, special, punitive, cover or consequential
          damages (including, without limitation, damages for lost profits,
          revenue, sales, goodwill, use or content, impact on business, business
          interruption, or loss of anticipated savings).
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Changes and Amendments
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify this Agreement or its policies relating
          to the Website or Services at any time, effective upon posting of an
          updated version of this Agreement on the Website. Continued use of the
          Website after any such changes shall constitute your consent to such
          changes.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Acceptance of These Terms
        </Typography>
        <Typography variant="body1" paragraph>
          You acknowledge that you have read this Agreement and agree to all its
          terms and conditions. By using the Website or its Services you agree
          to be bound by this Agreement. If you do not agree to abide by the
          terms of this Agreement, you are not authorized to use or access the
          Website and its Services.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Contacting Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Agreement, please contact us at
          info@novelsnook.com.
        </Typography>
      </Container>
    </Box>
  );
};

TermsConditionsPage.Layout = MainLayout;
export default TermsConditionsPage;
