import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import { Seo } from "@/components/common";
import { NovelDetail } from "@/components/novel";
import {
  GetStoryDetailPayload,
  GetStoryListReferPayload,
} from "@/models/story";
import { storyApi } from "@/api-client";
import useSWR from "swr";
import { useRouter } from "next/router";
import { bannerApi } from "@/api-client/banner-api";

const fetcher = (url: string, payload: GetStoryDetailPayload) => {
  return storyApi.getDetail(payload);
};

const fetcherRefer = (url: string, payload: GetStoryListReferPayload) => {
  return storyApi.getListRefer(payload);
};

const Novel: NextPageWithLayout = () => {
  const router = useRouter();
  const { storyId } = router.query;
  const idParts = storyId
    ? (Array.isArray(storyId) ? storyId[0] : storyId).split("-")
    : [];
  const id = idParts.pop();

  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageIndex]);

  const payload: GetStoryDetailPayload = {
    storyId: id || "",
    pageIndex: pageIndex,
    pageSize: 10,
  };

  const { data: storyDetail, isValidating: loadingStoryDetail } = useSWR(
    storyId ? ["/story/getDetail", payload] : null,
    ([url, payload]) => fetcher(url, payload)
  );

  const payloadRefer: GetStoryListReferPayload = {
    storyId: id || "",
  };

  const { data: storyRefer, isValidating: loadingStoryRefer } = useSWR(
    storyId ? ["/story/getListRefer", payloadRefer] : null,
    ([url, payload]) => fetcherRefer(url, payload)
  );

  const { data: bannerList } = useSWR(
    "/home/getBannerList",
    () =>
      bannerApi.getBannerList({
        requestId: "1",
        bannerOfPage: "STORY",
      }),
    {
      dedupingInterval: 3600000,
    }
  );

  const banner1 =
    bannerList?.data?.filter((banner) => banner.bannerPos === "1") || [];
  const banner2 =
    bannerList?.data?.filter((banner) => banner.bannerPos === "2") || [];
  const banner3 =
    bannerList?.data?.filter((banner) => banner.bannerPos === "3") || [];

  const isLoading = loadingStoryDetail || loadingStoryRefer;

  const handleOnChangePageIndex = (index: number) => {
    setPageIndex(index);
  };

  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: storyDetail?.story?.storyName || "Novelsnook",
          description: `Read all ${
            storyDetail?.story?.storyName || ""
          } chapters on Full Novels Online Free.`,
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <NovelDetail
        storyDetail={storyDetail}
        storyRefer={storyRefer?.data}
        isLoading={isLoading}
        onChangePageIndex={handleOnChangePageIndex}
        pageIndex={pageIndex}
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
      />
    </Box>
  );
};

Novel.Layout = MainLayout;

export default Novel;
