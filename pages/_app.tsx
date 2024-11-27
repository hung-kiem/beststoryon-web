import axiosClient from "@/api-client/axios-client";
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "@/models";
import "@/styles/globals.css";
import { SWRConfig } from "swr";
import { createEmotionCache } from "@utils/index";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@context/theme-context";

const clientSideEmotionCache = createEmotionCache();
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const Layout = Component.Layout ? Component.Layout : EmptyLayout;
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <CssBaseline />
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            dedupingInterval: 3600000, // 1 giờ (3600000 ms)
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
