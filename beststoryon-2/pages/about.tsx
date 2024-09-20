import React from "react";

import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";

export interface AboutPageProps {}

const AboutPage: NextPageWithLayout = () => {
  return <div>About page</div>;
};

AboutPage.Layout = MainLayout;

export default AboutPage;
