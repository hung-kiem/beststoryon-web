import React, { useState, useEffect, useRef } from "react";
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
  const { storyId, pageIndex: rawPageIndex } = router.query;
  const idParts = storyId
    ? (Array.isArray(storyId) ? storyId[0] : storyId).split("-")
    : [];
  const id = idParts.pop();

  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replace("list-", "").replace(".html", ""))
      : 1;
  console.log(">>>pageIndex", pageIndex);

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
    ["/home/getBannerList", "STORY"],
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
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "1" || banner.bannerPos === "0"
    ) || [];
  const banner2 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "2" || banner.bannerPos === "0"
    ) || [];
  const banner3 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "3" || banner.bannerPos === "0"
    ) || [];

  const addedScripts = useRef(new Set());

  useEffect(() => {
    banner1.forEach((banner) => {
      if (banner.bannerDesc && !addedScripts.current.has(banner.bannerId)) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = banner.bannerDesc;
        const script = tempDiv.querySelector("script");

        if (script) {
          const existingScript = document.head.querySelector(
            `script[data-banner-id="${banner.bannerId}"]`
          );
          if (!existingScript) {
            const newScript = document.createElement("script");
            Array.from(script.attributes).forEach((attr) =>
              newScript.setAttribute(attr.name, attr.value)
            );
            newScript.innerHTML = script.innerHTML;

            newScript.setAttribute(
              "data-banner-id",
              banner.bannerId.toString()
            );

            document.head.appendChild(newScript);
            addedScripts.current.add(banner.bannerId);
            console.log(`Added script for bannerId: ${banner.bannerId}`);
          }
        }
      }
    });

    banner2.forEach((banner) => {
      if (banner.bannerDesc && !addedScripts.current.has(banner.bannerId)) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = banner.bannerDesc;
        const script = tempDiv.querySelector("script");

        if (script) {
          const existingScript = document.head.querySelector(
            `script[data-banner-id="${banner.bannerId}"]`
          );
          if (!existingScript) {
            const newScript = document.createElement("script");
            Array.from(script.attributes).forEach((attr) =>
              newScript.setAttribute(attr.name, attr.value)
            );
            newScript.innerHTML = script.innerHTML;

            newScript.setAttribute(
              "data-banner-id",
              banner.bannerId.toString()
            );

            document.head.appendChild(newScript);
            addedScripts.current.add(banner.bannerId);
            console.log(`Added script for bannerId: ${banner.bannerId}`);
          }
        }
      }
    });

    banner3.forEach((banner) => {
      if (banner.bannerDesc && !addedScripts.current.has(banner.bannerId)) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = banner.bannerDesc;
        const script = tempDiv.querySelector("script");

        if (script) {
          const existingScript = document.head.querySelector(
            `script[data-banner-id="${banner.bannerId}"]`
          );
          if (!existingScript) {
            const newScript = document.createElement("script");
            Array.from(script.attributes).forEach((attr) =>
              newScript.setAttribute(attr.name, attr.value)
            );
            newScript.innerHTML = script.innerHTML;

            newScript.setAttribute(
              "data-banner-id",
              banner.bannerId.toString()
            );

            document.head.appendChild(newScript);
            addedScripts.current.add(banner.bannerId);
            console.log(`Added script for bannerId: ${banner.bannerId}`);
          }
        }
      }
    });

    return () => {
      banner1.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
          console.log(`Removed script for bannerId: ${banner.bannerId}`);
        }
      });

      banner2.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
          console.log(`Removed script for bannerId: ${banner.bannerId}`);
        }
      });

      banner3.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
          console.log(`Removed script for bannerId: ${banner.bannerId}`);
        }
      });
    };
  }, [banner1, banner2, banner3]);

  const isLoading = loadingStoryDetail || loadingStoryRefer;

  const handleOnChangePageIndex = (index: number) => {
    router.push(`/story/${storyId}/list-${index}.html`, undefined, {
      shallow: true,
    });
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
