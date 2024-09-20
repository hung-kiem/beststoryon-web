import axiosClient from "@/api-client/axios-client";
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "@/models";
import "@/styles/globals.css";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ? Component.Layout : EmptyLayout;

  return (
    <SWRConfig
      value={{
        fetcher: (url) => {
          axiosClient.get(url).then((res) => res.data);
        },
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
