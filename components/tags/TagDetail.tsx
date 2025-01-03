import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { tagApi } from "@/api-client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { CategoryButton } from "./CategoryButton";
import Link from "next/link";
import { NovelCard } from "./NovelCard";
import { useRouter } from "next/router";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { Seo } from "../common";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";
import Head from "next/head";
import { Story } from "@/models/story";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const statusArr = ["All", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];

interface TagPageProps {
  stories: Story[];
  totalPage: number;
}

export function TagDetail({ stories, totalPage }: TagPageProps) {
  const router = useRouter();
  const { tagCode, pageIndex: rawPageIndex } = router.query;
  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replaceAll("list-", "").replace(".html", ""))
      : 1;

  const [status, setStatus] = useState("All");
  const [sortCondition, setSortCondition] = useState("Popular");

  const handleChangePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push({
      pathname: `/tag/${tagCode}/list-${value}.html`,
      query: { status, sort: sortCondition },
    });
  };

  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "TAG"],
    () =>
      bannerApi.getBannerList({
        requestId: "1",
        bannerOfPage: "TAG",
      }),
    {
      dedupingInterval: 3600000,
    }
  );

  const banner1 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "1" || banner.bannerPos === "0"
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
        }
      });
    };
  }, [banner1]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    router.push({
      pathname: `/tag/${tagCode}/list-1.html`,
      query: { status: newStatus, sort: sortCondition },
    });
  };

  const handleSortChange = (newSortCondition: string) => {
    setSortCondition(newSortCondition);
    router.push({
      pathname: `/tag/${tagCode}/list-1.html`,
      query: { status, sort: newSortCondition },
    });
  };

  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: `NovelsNook - List of Novels - ${tagCode}`,
          description: `Dive into a world of captivating novels with thousands of ${tagCode} stories, fast updates, and a seamless reading experience.`,
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />

      <Container>
        <Stack direction="column" my={2} spacing={2}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Status
            </Typography>
            <Stack direction="row" spacing={1}>
              {statusArr.map((s) => (
                <CategoryButton
                  key={s}
                  title={s}
                  code={s}
                  isActive={s === status}
                  onClick={() => handleStatusChange(s)}
                />
              ))}
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Sort By
            </Typography>
            <Stack direction="row" spacing={1}>
              {sortByArr.map((s) => (
                <CategoryButton
                  key={s}
                  title={s}
                  code={s}
                  isActive={s === sortCondition}
                  onClick={() => handleSortChange(s)}
                />
              ))}
            </Stack>
          </Stack>
          {banner1?.length > 0 && <BannerPage data={banner1} />}
          {stories?.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              alignSelf="center"
            >
              No stories found
            </Typography>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {stories?.map((story) => (
                    <Grid key={story.storyId} size={{ xs: 6, sm: 3, md: 2 }}>
                      <Link
                        href={`/story/${story.storyNameAlias}-${story.storyId}/list-1.html`}
                      >
                        <NovelCard
                          storyName={story.storyName}
                          rating={story.ratingStar}
                          status={story.status}
                          chapterNumber={story.chapterNumber}
                          urlAvatar={story.urlAvatar}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {totalPage && (
                <Pagination
                  count={totalPage}
                  variant="outlined"
                  shape="rounded"
                  boundaryCount={1}
                  siblingCount={1}
                  sx={{
                    alignSelf: "center",
                    mt: 2,
                  }}
                  page={pageIndex}
                  onChange={handleChangePageIndex}
                />
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
