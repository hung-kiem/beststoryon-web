import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import { CategoryButton } from "./CategoryButton";
import useSWR from "swr";
import { categoryApi, storyApi } from "@/api-client";
import Link from "next/link";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { useRouter } from "next/router";
import Head from "next/head";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;

export function UpdatePage() {
  const router = useRouter();
  const [catCode, setCatCode] = useState("ALL");
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    if (router.query.catCode) {
      const code = router.query.catCode as string;
      setCatCode(code);
    }
  }, [router.query.catCode]);

  const { data: categories } = useSWR(
    `/category/getList`,
    categoryApi.getList,
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );
  const { data: stories, isValidating } = useSWR(
    catCode ? [`/updates`, catCode, pageIndex] : null,

    ([url, catCode, pageIndex]) =>
      storyApi.getUpdateList({
        catCode,
        storyStatus: "All",
        sortCondition: "Popular",
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
    setPageIndex(value);
  };

  const handleCategoryClick = (code: string) => {
    setCatCode(code);
    router.push(
      {
        pathname: `/update/${code}`,
      },
      undefined,
      { shallow: true }
    );
  };

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
      <Box>
        <LoadingOverlay isLoading={isValidating} />
        <Container>
          <Stack direction="column" my={2} spacing={2}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h4" fontWeight="bold">
                Genre / Category
              </Typography>
              <Stack direction="row" spacing={1}>
                <Grid container spacing={1}>
                  <Grid>
                    <CategoryButton
                      title="All"
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
        </Container>
      </Box>
    </>
  );
}
