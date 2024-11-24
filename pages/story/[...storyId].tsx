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
    ["/story/getDetail", payload],
    ([url, payload]) => fetcher(url, payload)
  );

  const payloadRefer: GetStoryListReferPayload = {
    storyId: id || "",
  };

  const { data: storyRefer, isValidating: loadingStoryRefer } = useSWR(
    ["/story/getListRefer", payloadRefer],
    ([url, payload]) => fetcherRefer(url, payload)
  );

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
          description:
            "Novelsnook is a blog website that provides quality content on various topics.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <NovelDetail
        storyDetail={storyDetail}
        storyRefer={storyRefer?.data}
        isLoading={isLoading}
        onChangePageIndex={handleOnChangePageIndex}
        pageIndex={pageIndex}
      />
    </Box>
  );
};

Novel.Layout = MainLayout;

export default Novel;
