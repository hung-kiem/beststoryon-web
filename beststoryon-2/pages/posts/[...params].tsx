import { useRouter } from "next/router";
import React from "react";

export interface ParamPageProps {}

export default function ParamPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Param Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}
