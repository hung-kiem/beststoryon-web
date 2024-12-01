import React from "react";
import { NextPageContext } from "next";
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "@/components/layout";

const CustomError: NextPageWithLayout = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Oops! Something went wrong.</h1>
      <a
        href="/"
        style={{
          marginTop: "1rem",
          display: "inline-block",
          padding: "0.5rem 1rem",
          backgroundColor: "#1E90FF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        Go back to Home
      </a>
    </div>
  );
};

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

CustomError.Layout = MainLayout;
export default CustomError;
