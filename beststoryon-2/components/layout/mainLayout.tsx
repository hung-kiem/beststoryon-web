import * as React from "react";
import { LayoutProps } from "@/models/index";

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>
      {children}
    </div>
  );
}
