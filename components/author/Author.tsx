import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Seo } from "../common";
import { useRouter } from "next/router";
import useSWR from "swr";
import { storyApi } from "@/api-client";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { NovelCard } from "./NovelCard";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;

const AuthorPage = () => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (router.query.authorCode) {
      const code = router.query.authorCode as string;
      setAuthor(code);
    }
  }, [router.query.authorCode]);

  const { data: stories, isValidating } = useSWR(
    author ? [`/story/getListByAuthor`, author, pageIndex] : null,
    ([url, author, pageIndex]) =>
      storyApi.getByAuthor({
        authorCode: author,
        pageIndex,
        pageSize: 20,
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

  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "AUTHOR"],
    () =>
      bannerApi.getBannerList({
        requestId: "1",
        bannerOfPage: "AUTHOR",
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
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: `NovelsNook - List of Novels - ${author}`,
          description: `Discover the finest works by ${author}, featuring captivating stories with daily updates. 
          Browse through popular and latest releases to enjoy the unique storytelling style of ${author}.`,
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <Box>
        <LoadingOverlay isLoading={isValidating} />
        {banner1?.length > 0 && <BannerPage data={banner1} />}
        <Container>
          <Stack direction="column" my={2} spacing={2}>
            <Typography variant="h4" fontWeight="bold">
              {`${author}`}
            </Typography>
            {banner2?.length > 0 && <BannerPage data={banner2} />}
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
                      href={`/story/${story.storyNameAlias}-${story.storyId}/list-1.html`}
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
          </Stack>
          {banner3?.length > 0 && <BannerPage data={banner3} />}
        </Container>
      </Box>
    </Box>
  );
};

export default AuthorPage;
