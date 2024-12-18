import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import { CategoryButton } from "./CategoryButton";
import useSWR from "swr";
import { categoryApi, storyApi } from "@/api-client";
import Link from "next/link";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { useRouter } from "next/router";
import { Seo } from "../common";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;

export function UpdatePage() {
  const router = useRouter();
  const { catCode, pageIndex: rawPageIndex } = router.query;
  const pageIndex =
    rawPageIndex && typeof rawPageIndex === "string"
      ? parseInt(rawPageIndex.replace("list-", "").replace(".html", ""))
      : 1;

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
        catCode: typeof catCode === "string" ? catCode : "",
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
    router.push(
      {
        pathname: `/update/${catCode}/list-${value}.html`,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleCategoryClick = (code: string) => {
    router.push(
      {
        pathname: `/update/${code}/list-1.html`,
      },
      undefined,
      { shallow: true }
    );
  };

  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "UPDATE"],
    () =>
      bannerApi.getBannerList({
        requestId: "1",
        bannerOfPage: "UPDATE",
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
    };
  }, [banner1]);

  const currentCategory = categories?.find((cat) => cat.catCode === catCode);
  const categoryName = currentCategory ? currentCategory.catName : "All Genres";

  return (
    <>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: `Stay Updated with Recently ${categoryName} Novel Chapters`,
          description: `Never miss a moment! Explore the latest updates and newly released ${categoryName} novels. Dive back into the ${categoryName} with fresh content every day!`,
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <Box>
        <LoadingOverlay isLoading={isValidating} />
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
          </Stack>
          {/* {banner3?.length > 0 && <BannerPage data={banner3} />} */}
        </Container>
      </Box>
    </>
  );
}
