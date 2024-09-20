import * as React from "react";
import { LayoutProps } from "@/models/index";

export function AdminLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Admin Layout</h1>
      <h1>Sidebar</h1>
      {children}
    </div>
  );
}
