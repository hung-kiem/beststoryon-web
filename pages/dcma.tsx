import { Seo } from "@/components/common";
import { Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "@/components/layout";

const DMCAPage: NextPageWithLayout = () => {
  useEffect(() => {
    document.title = "DMCA Notice - NovelsNook";
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
          DMCA Notice
        </Typography>
        <Typography variant="body1" paragraph>
          If your copyrighted material has been posted on novelsnook.com or if
          links to your copyrighted material are returned through our search
          engine and you want this material removed, you must provide a written
          communication that details the information listed in the following
          section. Please be aware that you will be liable for damages
          (including costs and attorneys' fees) if you misrepresent information
          listed on our site that is infringing on your copyrights. We suggest
          that you first contact an attorney for legal assistance on this
          matter.
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Elements Required in Copyright Infringement Claim
        </Typography>
        <Typography variant="body1" paragraph>
          The following elements must be included in your copyright infringement
          claim:
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              Provide evidence of the authorized person to act on behalf of the
              owner of an exclusive right that is allegedly infringed.
            </li>
            <li>
              Provide sufficient contact information so that we may contact you.
              You must also include a valid email address.
            </li>
            <li>
              Identify in sufficient detail the copyrighted work claimed to have
              been infringed and include at least one search term under which
              the material appears in novelsnook.com search results.
            </li>
            <li>
              A statement that the complaining party has a good faith belief
              that use of the material in the manner complained of is not
              authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that the complaining party is
              authorized to act on behalf of the owner of an exclusive right
              that is allegedly infringed.
            </li>
            <li>
              Must be signed by the authorized person to act on behalf of the
              owner of an exclusive right that is allegedly being infringed.
            </li>
          </ul>
        </Typography>
        <Typography variant="body1" paragraph>
          Send the written infringement notice to the following email address:
          inspirednovels (at) gmail.com
        </Typography>
        <Typography variant="body2" paragraph>
          Note: Post mail is not accepted, send email instead. Don't send PDF or
          scanned PDF, as we filter all attachments. Please allow 5-7 business
          days for an email response. Note that emailing your complaint to other
          parties such as our Internet Service Provider will not expedite your
          request and may result in a delayed response due to the complaint not
          being properly filed.
        </Typography>
      </Container>
    </Box>
  );
};

DMCAPage.Layout = MainLayout;
export default DMCAPage;
