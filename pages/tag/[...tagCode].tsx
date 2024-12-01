import { MainLayout } from "@/components/layout";
import { TagDetail } from "@/components/tags/TagDetail";
import { NextPageWithLayout } from "@/models";
import React from "react";

const Tag: NextPageWithLayout = () => {
  return <TagDetail />;
};

Tag.Layout = MainLayout;

export default Tag;
