import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { tagApi } from "@/api-client";
import React, { useState } from "react";
import useSWR from "swr";
import { CategoryButton } from "./CategoryButton";
import Link from "next/link";
import { NovelCard } from "./NovelCard";
import { useRouter } from "next/router";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { Seo } from "../common";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const statusArr = ["All", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];

export function TagDetail() {
  const router = useRouter();
  const { tagCode, pageIndex: rawPageIndex } = router.query;
  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replace("list-", "").replace(".html", ""))
      : 1;

  const [status, setStatus] = useState("All");
  const [sortCondition, setSortCondition] = useState("Popular");

  const { data: stories, isValidating } = useSWR(
    [`/story/getNewReleaseList`, tagCode, status, sortCondition, pageIndex],

    ([url, tagCode, status, sortCondition, pageIndex]) =>
      tagApi.getStoryByTagCode({
        keyword: Array.isArray(tagCode) ? tagCode[0] : tagCode || "",
        status,
        sortCondition,
        pageIndex,
        pageSize: 12,
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );

  const handleChangePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(
      {
        pathname: `/tag/${tagCode}/list-${value}.html`,
      },
      undefined,
      { shallow: true }
    );
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
    bannerList?.data?.filter((banner) => banner.bannerPos === "1") || [];

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
      <LoadingOverlay isLoading={isValidating} />
      <Container>
        {/* {banner1?.length > 0 && <BannerPage data={banner1} />} */}
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
                  onClick={setStatus}
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
                  onClick={setSortCondition}
                />
              ))}
            </Stack>
          </Stack>
          {banner1?.length > 0 && <BannerPage data={banner1} />}
          {stories?.data?.length === 0 ? (
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
                  {stories?.data?.map((story) => (
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
              {stories?.totalPage && (
                <Pagination
                  count={stories.totalPage}
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
          {/* {banner3?.length > 0 && <BannerPage data={banner3} />} */}
        </Stack>
      </Container>
    </Box>
  );
}
