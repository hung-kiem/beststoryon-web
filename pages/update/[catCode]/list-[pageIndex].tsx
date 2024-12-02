import React from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { UpdatePage } from "@/components/update";

const Update: NextPageWithLayout = () => {
  return <UpdatePage />;
};

Update.Layout = MainLayout;

export default Update;
