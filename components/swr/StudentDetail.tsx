import React from "react";
import useSWR from "swr";

export interface StudentDetailProps {
  studentId: string;
}

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
  });
  return <div>{data?.name || "--"}</div>;
}
