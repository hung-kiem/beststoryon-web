import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import { categoryApi } from "@/api-client/category-api";
import { CategoryButton } from "./CategoryButton";
import { storyApi } from "@/api-client/story-api";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Seo } from "../common";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const statusArr = ["ALL", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];

export function CategoryPage() {
  const router = useRouter();
  const { catCode, pageIndex: rawPageIndex } = router.query;
  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replace("list-", "").replace(".html", ""))
      : 1;
  const [status, setStatus] = useState("ALL");
  const [sortCondition, setSortCondition] = useState("Popular");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: categories, isValidating: loadingList } = useSWR(
    `/category/getList`,
    categoryApi.getList,
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );

  const { data: stories, isValidating: loadingDetail } = useSWR(
    [`/category/getListByCatCode`, catCode, status, sortCondition, pageIndex],
    ([url, catCode, status, sortCondition, pageIndex]) =>
      storyApi.getListByCatId({
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

  const isLoading = loadingList || loadingDetail;

  const handleChangePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(
      {
        pathname: `/categories/${catCode}/list-${value}.html`,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleCategoryClick = (code: string) => {
    router.push(
      {
        pathname: `/categories/${code}/list-1.html`,
      },
      undefined,
      { shallow: true }
    );
  };

  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "CATEGORY"],
    () =>
      bannerApi.getBannerList({
        requestId: "1",
        bannerOfPage: "CATEGORY",
      }),
    {
      dedupingInterval: 3600000,
    }
  );

  const banner1 =
    bannerList?.data?.filter((banner) => banner.bannerPos === "1") || [];

  const currentCategory = categories?.find((cat) => cat.catCode === catCode);
  const categoryName = currentCategory ? currentCategory.catName : "All Genres";

  return (
    <>
      <Head>
        <title>NovelsNook - List of Novels - {categoryName}</title>
        <meta
          name="description"
          content={`Looking for good ${categoryName}? Explore the ${categoryName} novels with daily updates. Find your next great read!`}
        />
      </Head>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: `NovelsNook - List of Novels - ${categoryName}`,
          description: `Explore the latest and most popular ${categoryName} novels with daily updates. From hot releases to trending stories, find your next ${categoryName}.`,
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <Box>
        <LoadingOverlay isLoading={isLoading} />
        <Container>
          {/* {banner1?.length > 0 && <BannerPage data={banner1} />} */}
          <Stack direction="column" my={2} spacing={2}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h4" fontWeight="bold">
                Genre / Category
              </Typography>
              <Stack direction="row" spacing={1}>
                <Grid container spacing={1}>
                  <Grid>
                    <CategoryButton
                      name="ALL"
                      code="ALL"
                      isActive={catCode === "ALL"}
                      onClick={handleCategoryClick}
                    />
                  </Grid>
                  {categories?.map((cat) => (
                    <Grid key={cat.catCode}>
                      <CategoryButton
                        name={cat.catName}
                        code={cat.catCode}
                        isActive={cat.catCode === catCode}
                        onClick={handleCategoryClick}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Stack>
            {isMobile ? (
              <>
                <Stack direction="column" spacing={1}>
                  <Typography variant="h4" fontWeight="bold">
                    Status
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {statusArr.map((s) => (
                      <CategoryButton
                        key={s}
                        name={s}
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
                        name={s}
                        code={s}
                        isActive={s === sortCondition}
                        onClick={setSortCondition}
                      />
                    ))}
                  </Stack>
                </Stack>
              </>
            ) : (
              <Stack direction="row" spacing={4}>
                <Stack direction="column" spacing={1}>
                  <Typography variant="h4" fontWeight="bold">
                    Status
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {statusArr.map((s) => (
                      <CategoryButton
                        key={s}
                        name={s}
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
                        name={s}
                        code={s}
                        isActive={s === sortCondition}
                        onClick={setSortCondition}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            )}
            {banner1?.length > 0 && <BannerPage data={banner1} />}
            {stories?.data?.length === 0 && (
              <Typography
                variant="body1"
                color="text.secondary"
                alignSelf="center"
              >
                No stories found
              </Typography>
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {stories?.data?.map((story) => (
                  <Grid key={story.storyId} size={{ xs: 6, sm: 3, md: 2 }}>
                    <Link
                      passHref
                      href={`/story/${story.storyNameAlias}-${story.storyId}.html`}
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
            {/* {banner3?.length > 0 && <BannerPage data={banner3} />} */}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
