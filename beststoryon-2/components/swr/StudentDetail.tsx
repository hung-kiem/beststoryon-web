import * as React from "react";
import useSWR from "swr";

export interface StudentDetailProps {
  studentId: string;
}

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data } = useSWR(`/students/${studentId}`);
  return <div>{data?.name || "--"}</div>;
}
