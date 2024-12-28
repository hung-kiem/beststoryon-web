import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import { CategoryButton } from "./CategoryButton";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { bannerApi } from "@/api-client/banner-api";
import BannerPage from "../home/BannerPage";
import { Category } from "@/models";
import { Story } from "@/models/story";

const statusArr = ["All", "Ongoing", "Completed"];
const sortByArr = ["Popular", "New", "Update"];
interface NewReleasePageProps {
  categories: Category[];
  stories: Story[];
  totalPage: number;
}
export function NewReleasePage({
  categories,
  stories,
  totalPage,
}: NewReleasePageProps) {
  const router = useRouter();
  const { catCode, pageIndex: rawPageIndex } = router.query;
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
      pathname: `/newRelease/${catCode}/list-${value}.html`,
    });
  };

  const handleCategoryClick = (code: string) => {
    router.push({
      pathname: `/newRelease/${code}/list-1.html`,
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    router.push({
      pathname: `/newRelease/${catCode}/list-1.html`,
      query: { status: newStatus, sort: sortCondition },
    });
  };

  const handleSortChange = (newSortCondition: string) => {
    setSortCondition(newSortCondition);
    router.push({
      pathname: `/newRelease/${catCode}/list-1.html`,
      query: { status, sort: newSortCondition },
    });
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
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "1" || banner.bannerPos === "0"
    ) || [];
  const banner2 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "2" || banner.bannerPos === "0"
    ) || [];
  const banner3 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "3" || banner.bannerPos === "0"
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

    banner2.forEach((banner) => {
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

    banner3.forEach((banner) => {
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

      banner2.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
        }
      });

      banner3.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
        }
      });
    };
  }, [banner1, banner2, banner3]);

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
          {banner3?.length > 0 && <BannerPage data={banner3} />}
        </Container>
      </Box>
    </>
  );
}
