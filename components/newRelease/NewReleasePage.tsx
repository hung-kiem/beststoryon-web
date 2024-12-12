import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import { categoryApi, storyApi } from "@/api-client";
import { CategoryButton } from "./CategoryButton";
import Link from "next/link";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import Head from "next/head";
import { useRouter } from "next/router";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const statusArr = ["All", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];

export function NewReleasePage() {
  const router = useRouter();
  const { catCode, pageIndex: rawPageIndex } = router.query;
  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replace("list-", "").replace(".html", ""))
      : 1;

  const [status, setStatus] = useState("All");
  const [sortCondition, setSortCondition] = useState("Popular");

  const { data: categories, isValidating: loadingCategory } = useSWR(
    `/category/getList`,
    categoryApi.getList,
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );
  const { data: stories, isValidating: loadingNewRelease } = useSWR(
    [`/story/getNewReleaseList`, catCode, status, sortCondition, pageIndex],

    ([url, catCode, status, sortCondition, pageIndex]) =>
      storyApi.getNewReleaseList({
        catCode: typeof catCode === "string" ? catCode : "",
        storyStatus: status,
        sortCondition,
        pageIndex,
        pageSize: 12,
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );

  const isLoading = loadingCategory || loadingNewRelease;

  const handleChangePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(
      {
        pathname: `/newRelease/${catCode}/list-${value}.html`,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleCategoryClick = (code: string) => {
    router.push(
      {
        pathname: `/newRelease/${code}/list-1.html`,
      },
      undefined,
      { shallow: true }
    );
  };

  const currentCategory = categories?.find((cat) => cat.catCode === catCode);
  const categoryName = currentCategory ? currentCategory.catName : "All Genres";

  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "NEW_RELEASE"],
    () =>
      bannerApi.getBannerList({
        requestId: "1",
        bannerOfPage: "NEW_RELEASE",
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

  return (
    <>
      <Head>
        <title>NovelsNook - List of Novels - {categoryName}</title>
        <meta
          name="description"
          content={`Looking for good ${categoryName}? Explore the ${categoryName} novels with daily updates. Find your next great read!`}
        />
      </Head>
      <Box>
        <LoadingOverlay isLoading={isLoading} />
        <Container>
          {banner1?.length > 0 && <BannerPage data={banner1} />}
          <Stack direction="column" my={2} spacing={2}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h4" fontWeight="bold">
                Genre / Category
              </Typography>
              <Stack direction="row" spacing={1}>
                <Grid container spacing={1}>
                  <Grid>
                    <CategoryButton
                      title="ALL"
                      code="ALL"
                      isActive={catCode === "ALL"}
                      onClick={handleCategoryClick}
                    />
                  </Grid>
                  {categories?.map((cat) => (
                    <Grid key={cat.catCode}>
                      <CategoryButton
                        title={cat.catName}
                        code={cat.catCode}
                        isActive={cat.catCode === catCode}
                        onClick={handleCategoryClick}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Stack>
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
            {banner2?.length > 0 && <BannerPage data={banner2} />}
            <Typography
              variant="h4"
              fontWeight="bold"
              alignSelf="center"
              sx={{
                pt: 2,
              }}
            >
              New Release
            </Typography>
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
                            rating={story.likeCount}
                            status={story.status}
                            chapterNumber={story.chapterNumber}
                            avatarUrl={story.urlAvatar}
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
          </Stack>
          {banner3?.length > 0 && <BannerPage data={banner3} />}
        </Container>
      </Box>
    </>
  );
}
