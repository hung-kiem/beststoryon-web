import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import { categoryApi, storyApi } from "@/api-client";
import { CategoryButton } from "./CategoryButton";
import Link from "next/link";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const statusArr = ["All", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];

export function TrendingPage() {
  const [catCode, setCatCode] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortCondition, setSortCondition] = useState("Popular");
  const [pageIndex, setPageIndex] = useState(1);
  const { data: categories } = useSWR(
    `/category/getList`,
    categoryApi.getList,
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );
  const { data: stories, error } = useSWR(
    [`/story/getTrendingList`, catCode, status, sortCondition, pageIndex],

    ([url, catCode, status, sortCondition, pageIndex]) =>
      storyApi.getTrendingList({
        catCode,
        storyStatus: status,
        sortCondition,
        pageIndex,
        pageSize: 2,
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

  return (
    <Box>
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
                    code="All"
                    isActive={catCode === "All"}
                    onClick={setCatCode}
                  />
                </Grid>
                {categories?.map((cat) => (
                  <Grid key={cat.catCode}>
                    <CategoryButton
                      title={cat.catName}
                      code={cat.catCode}
                      isActive={cat.catCode === catCode}
                      onClick={setCatCode}
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
  );
}
