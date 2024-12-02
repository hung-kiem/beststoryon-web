import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import { categoryApi, storyApi } from "@/api-client";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "@/components/home/BannerPage";
import { CategoryButton } from "./CategoryButton";
import { NovelCard } from "./NovelCard";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const statusArr = ["All", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];

const TrendingPage = () => {
  const router = useRouter();
  const { catCode, pageIndex: rawPageIndex } = router.query;

  // Parse pageIndex from `list-{number}.html`
  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replace("list-", "").replace(".html", ""))
      : 1;

  const [status, setStatus] = useState("All");
  const [sortCondition, setSortCondition] = useState("Popular");

  const { data: categories, isValidating: loadingCategory } = useSWR(
    `/category/getList`,
    categoryApi.getList,
    { revalidateOnFocus: false, dedupingInterval: MILLISECOND_PER_HOUR }
  );

  const { data: stories, isValidating: loadingTrending } = useSWR(
    [`/story/getTrendingList`, catCode, status, sortCondition, pageIndex],
    ([url, catCode, status, sortCondition, pageIndex]) =>
      storyApi.getTrendingList({
        catCode: typeof catCode === "string" ? catCode : "",
        storyStatus: status,
        sortCondition,
        pageIndex,
        pageSize: 12,
      }),
    { revalidateOnFocus: false, dedupingInterval: MILLISECOND_PER_HOUR }
  );

  const isLoading = loadingCategory || loadingTrending;

  const handleChangePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/trending/${catCode}/list-${value}.html`, undefined, {
      shallow: true,
    });
  };

  const handleCategoryClick = (code: string) => {
    router.push(`/trending/${code}/list-1.html`, undefined, { shallow: true });
  };

  const currentCategory = categories?.find((cat) => cat.catCode === catCode);
  const categoryName = currentCategory ? currentCategory.catName : "All Genres";

  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "TRENDING"],
    () =>
      bannerApi.getBannerList({
        requestId: "1",
        bannerOfPage: "TRENDING",
      }),
    { dedupingInterval: MILLISECOND_PER_HOUR }
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
                      onClick={() => handleCategoryClick("ALL")}
                    />
                  </Grid>
                  {categories?.map((cat) => (
                    <Grid key={cat.catCode}>
                      <CategoryButton
                        title={cat.catName}
                        code={cat.catCode}
                        isActive={cat.catCode === catCode}
                        onClick={() => handleCategoryClick(cat.catCode)}
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
                    onClick={() => setStatus(s)}
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
                    onClick={() => setSortCondition(s)}
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
              Trending
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
                          href={`/story/${story.storyNameAlias}-${story.storyId}.html`}
                        >
                          <NovelCard
                            storyName={story.storyName}
                            rating={story.likeCount}
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
          </Stack>
          {banner3?.length > 0 && <BannerPage data={banner3} />}
        </Container>
      </Box>
    </>
  );
};

export default TrendingPage;
