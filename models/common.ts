import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactNode, ReactElement } from "react";
import { EmotionCache } from "@emotion/cache";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type NextPageWithLayout2 = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

export interface BaseResponse {
  code: string;
  message: string;
}
