import { homeApi } from "@/api-client";
import { Seo } from "@/components/common";
import {
  NewRelease,
  HotNovel,
  TrendingNovel,
  Banner,
  HotNovelMain,
} from "@/components/home";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import useSWR from "swr";
import React from "react";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";

const Home: NextPageWithLayout = () => {
  const { data: hotTopList, isValidating: loadingHotTopList } = useSWR(
    "/home/getHotTopList",
    () => homeApi.getHotTopList({ requestId: "1" })
  );

  const { data: trendingList, isValidating: loadingTrending } = useSWR(
    "/home/getTrendingList",
    () => homeApi.getTrendingList({ requestId: "1" })
  );

  const { data: newReleaseList, isValidating: loadingNewRelease } = useSWR(
    "/home/getNewReleaseList",
    () => homeApi.getNewReleaseList({ requestId: "1" })
  );

  const { data: hotList, isValidating: loadingHot } = useSWR(
    "/home/getHotList",
    () => homeApi.getHotList({ requestId: "1" })
  );

  // Kết hợp tất cả trạng thái loading
  const isLoading =
    loadingHotTopList || loadingTrending || loadingNewRelease || loadingHot;

  return (
    <Box>
      <Seo
        data={{
          url: "https://beststoryon.com/",
          title: "BestStoryOn",
          description:
            "BestStoryOn is a blog website that provides quality content on various topics.",
          thumbnailUrl: "https://beststoryon.com/thumbnail.png",
        }}
      />
      <LoadingOverlay isLoading={isLoading} />
      {hotTopList?.data && hotTopList?.data.length > 0 && (
        <HotNovelMain data={hotTopList?.data || []} />
      )}
      {trendingList?.data && trendingList?.data.length > 0 && (
        <TrendingNovel data={trendingList?.data || []} />
      )}
      <Banner />
      {newReleaseList?.data && newReleaseList?.data.length > 0 && (
        <NewRelease data={newReleaseList?.data || []} />
      )}
      {hotList?.data && hotList?.data.length > 0 && (
        <HotNovel data={hotList?.data || []} />
      )}
      <Banner />
      {/* <RecommendForYou /> */}
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
