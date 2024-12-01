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
      dedupingInterval: 3600000,
    }
  );

  const { data: trendingList } = useSWR(
    "/home/getTrendingList",
    () => homeApi.getTrendingList({ requestId: "1" }),
    {
      dedupingInterval: 3600000,
    }
  );

  const { data: newReleaseList } = useSWR(
    "/home/getNewReleaseList",
    () => homeApi.getNewReleaseList({ requestId: "1" }),
    {
      dedupingInterval: 3600000,
    }
  );

  const { data: hotList } = useSWR(
    "/home/getHotList",
    () => homeApi.getHotList({ requestId: "1" }),
    {
      dedupingInterval: 3600000,
    }
  );

  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "HOME"],
    () =>
      homeApi.getBannerList({
        requestId: "1",
        bannerOfPage: "HOME",
      }),
    {
      dedupingInterval: 3600000,
    }
  );

  const banner2 =
    bannerList?.data?.filter((banner) => banner.bannerPos === "2") || [];
  const banner3 =
    bannerList?.data?.filter((banner) => banner.bannerPos === "3") || [];

  const isLoading = loadingHotTopList;

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
      {banner2?.length > 0 && <BannerPage data={banner2} />}
      {newReleaseList?.data && newReleaseList?.data.length > 0 && (
        <NewRelease data={newReleaseList?.data || []} />
      )}
      {hotList?.data && hotList?.data.length > 0 && (
        <HotNovel data={hotList?.data || []} />
      )}
      {banner3?.length > 0 && <BannerPage data={banner3} />}
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
