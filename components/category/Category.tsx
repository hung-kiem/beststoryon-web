import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import { CategoryButton } from "./CategoryButton";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Seo } from "../common";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";
import { Category } from "@/models";
import { Story } from "@/models/story";

interface CategoryPageProps {
  categories: Category[];
  stories: Story[];
  totalPage: number;
}

const statusArr = ["ALL", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];

export function CategoryPage({
  categories,
  stories,
  totalPage,
}: CategoryPageProps) {
  const router = useRouter();
  const {
    catCode = "ALL",
    pageIndex: rawPageIndex,
    status: queryStatus,
    sort: querySort,
  } = router.query;

  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replaceAll("list-", "").replace(".html", ""))
      : 1;

  const [status, setStatus] = useState(queryStatus || "ALL");
  const [sortCondition, setSortCondition] = useState(querySort || "Popular");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (queryStatus && typeof queryStatus === "string") {
      setStatus(queryStatus);
    }
    if (querySort && typeof querySort === "string") {
      setSortCondition(querySort);
    }
  }, [queryStatus, querySort]);

  const handleChangePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push({
      pathname: `/categories/${catCode}/list-${value}.html`,
    });
  };

  const handleCategoryClick = (code: string) => {
    router.push({
      pathname: `/categories/${code}/list-1.html`,
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    console.log("status", newStatus);
    router.push({
      pathname: `/categories/${catCode}/list-1.html`,
      query: { status: newStatus, sort: sortCondition },
    });
  };

  const handleSortChange = (newSortCondition: string) => {
    setSortCondition(newSortCondition);
    console.log("sort", newSortCondition);
    router.push({
      pathname: `/categories/${catCode}/list-1.html`,
      query: { status, sort: newSortCondition },
    });
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
                        name={s}
                        code={s}
                        isActive={s === sortCondition}
                        onClick={() => handleSortChange(s)}
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
            {stories?.length === 0 && (
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
                {stories?.map((story) => (
                  <Grid key={story.storyId} size={{ xs: 6, sm: 3, md: 2 }}>
                    <Link
                      passHref
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
            {/* {banner3?.length > 0 && <BannerPage data={banner3} />} */}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
