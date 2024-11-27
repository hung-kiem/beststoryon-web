import { homeApi } from "@/api-client";
import {
  NewRelease,
  HotNovel,
  TrendingNovel,
  HotNovelMain,
} from "@/components/home";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import useSWR from "swr";
import React from "react";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import BannerPage from "@/components/home/BannerPage";
import { Seo } from "@/components/common";

const Home: NextPageWithLayout = () => {
  const { data: hotTopList, isValidating: loadingHotTopList } = useSWR(
    "/home/getHotTopList",
    () => homeApi.getHotTopList({ requestId: "1" }),
    {
      dedupingInterval: 3600000, // 1 giờ (3600000 ms)
    }
  );

  const { data: trendingList, isValidating: loadingTrending } = useSWR(
    "/home/getTrendingList",
    () => homeApi.getTrendingList({ requestId: "1" }),
    {
      dedupingInterval: 3600000, // 1 giờ (3600000 ms)
    }
  );

  const { data: newReleaseList, isValidating: loadingNewRelease } = useSWR(
    "/home/getNewReleaseList",
    () => homeApi.getNewReleaseList({ requestId: "1" }),
    {
      dedupingInterval: 3600000, // 1 giờ (3600000 ms)
    }
  );

  const { data: hotList, isValidating: loadingHot } = useSWR(
    "/home/getHotList",
    () => homeApi.getHotList({ requestId: "1" }),
    {
      dedupingInterval: 3600000, // 1 giờ (3600000 ms)
    }
  );

  const { data: bannerList, isValidating: loadingBanner } = useSWR(
    "/home/getBannerList",
    () =>
      homeApi.getBannerList({
        requestId: "1",
        bannerOfPage: "HOME",
      }),
    {
      dedupingInterval: 3600000, // 1 giờ (3600000 ms)
    }
  );

  // Kết hợp tất cả trạng thái loading
  const isLoading =
    loadingHotTopList ||
    loadingTrending ||
    loadingNewRelease ||
    loadingHot ||
    loadingBanner;

  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title:
            "NovelsNook - Explore Fan-Fiction Novels Online – Completely Free!",
          description:
            "Dive into a world of free online novels! Discover daily-updated stories, including light novel, web novels, and a wide range of captivating genres.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <LoadingOverlay isLoading={isLoading} />
      {hotTopList?.data && hotTopList?.data.length > 0 && (
        <HotNovelMain data={hotTopList?.data || []} />
      )}
      {trendingList?.data && trendingList?.data.length > 0 && (
        <TrendingNovel data={trendingList?.data || []} />
      )}
      {bannerList?.data && bannerList?.data.length > 0 && (
        <BannerPage data={bannerList?.data || []} />
      )}
      {newReleaseList?.data && newReleaseList?.data.length > 0 && (
        <NewRelease data={newReleaseList?.data || []} />
      )}
      {hotList?.data && hotList?.data.length > 0 && (
        <HotNovel data={hotList?.data || []} />
      )}
      {bannerList?.data && bannerList?.data.length > 0 && (
        <BannerPage data={bannerList?.data || []} />
      )}
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
