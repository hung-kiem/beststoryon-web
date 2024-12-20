import {
  Box,
  Container,
  Stack,
  Card,
  CardMedia,
  Typography,
  Button,
  Divider,
  Pagination,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { ChapterTitle } from "./ChapterTitle";
import { NovelCard } from "./NovelCard";
import { useRouter } from "next/router";
import { GetStoryDetailResponse, StoryDetail } from "@/models/story";
import StoryRating from "./StoryRating";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { Banner } from "@/models/banner";
import BannerPage from "../home/BannerPage";

interface NovelDetailProps {
  storyDetail?: GetStoryDetailResponse;
  storyRefer?: StoryDetail[];
  onChangePageIndex: (pageIndex: number) => void;
  pageIndex: number;
  isLoading: boolean;
  banner1: Banner[];
  banner2: Banner[];
  banner3: Banner[];
}

export function NovelDetail({
  storyDetail,
  storyRefer,
  isLoading,
  pageIndex,
  onChangePageIndex,
  banner1,
  banner2,
  banner3,
}: NovelDetailProps) {
  const router = useRouter();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [imageSrc, setImageSrc] = useState("/images/no-image.jpg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (storyDetail?.story.urlAvatar) {
      if (storyDetail?.story.urlAvatar.startsWith("https")) {
        setImageSrc(storyDetail?.story.urlAvatar);
      } else {
        setImageSrc(
          `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN || ""}${
            storyDetail?.story.urlAvatar
          }`
        );
      }
    } else {
      setImageSrc("/images/no-image.jpg");
    }
  }, [storyDetail?.story.urlAvatar]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageSrc("/images/no-image.jpg");
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleChangePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onChangePageIndex(value);
  };

  const handleReadFirstChapter = () => {
    router.push(
      `/story/${storyDetail?.story?.storyNameAlias}-${storyDetail?.story?.storyId}/chapter/1.html`
    );
  };

  const handleReadLastChapter = () => {
    router.push(
      `/story/${storyDetail?.story?.storyNameAlias}-${
        storyDetail?.story?.storyId
      }/chapter/${storyDetail?.story?.chapterNumber || 1}.html`
    );
  };

  return (
    <Box>
      <LoadingOverlay isLoading={isLoading} />
      <Container>
        {banner1?.length > 0 && <BannerPage data={banner1} />}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  width: "100%",
                  maxHeight: { xs: "300px", sm: "300px", lg: "460px" },
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  width="100%"
                  image="/images/no-image.jpg"
                  title={storyDetail?.story?.storyName}
                  alt={storyDetail?.story?.storyName}
                  sx={{ display: isImageLoaded ? "none" : "block" }}
                />
                <CardMedia
                  component="img"
                  height="100%"
                  width="100%"
                  image={imageSrc}
                  title={storyDetail?.story?.storyName}
                  alt={storyDetail?.story?.storyName}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  sx={{ display: isImageLoaded ? "block" : "none" }}
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
              <Stack direction="column" spacing={1}>
                <Typography
                  fontWeight="bold"
                  variant="h2"
                  fontSize={{ xs: "20px", sm: "28px", md: "32px" }}
                >
                  {storyDetail?.story?.storyName}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <VisibilityIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="small"
                      fontWeight="bold"
                    >
                      {storyDetail?.story.viewNumberLabel || ""} Views
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <ImportContactsIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="small"
                      fontWeight="bold"
                    >
                      {storyDetail?.story?.chapterNumber} Chapter
                    </Typography>
                  </Stack>
                </Stack>
                <StoryRating storyId={storyDetail?.story?.storyId || ""} />
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontSize="medium"
                    fontWeight="bold"
                  >
                    Status:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="medium"
                  >
                    {storyDetail?.story?.status}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontSize="medium"
                    fontWeight="bold"
                  >
                    Author:
                  </Typography>
                  <Link href={`/author/${storyDetail?.story.author}.html`}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="medium"
                    >
                      {storyDetail?.story?.author}
                    </Typography>
                  </Link>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  spacing={0.5}
                  sx={{ maxWidth: "100%" }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontSize="medium"
                    fontWeight="bold"
                  >
                    Genre:
                  </Typography>
                  {storyDetail?.story?.catList?.map((cat, index) => (
                    <Link key={index} href={`/categories/${cat}/list-1.html`}>
                      <Typography
                        variant="body2"
                        color="secondary.contrastText"
                        fontWeight="regular"
                        sx={{
                          backgroundColor: "text.secondary",
                          borderRadius: 2,
                          p: 0.5,
                          m: 0.5,
                        }}
                      >
                        {cat}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: showFullDescription ? "none" : 3,
                      maxHeight: showFullDescription ? "none" : "4.5em",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: storyDetail?.story?.summaryContent || "",
                    }}
                  />
                  <Button
                    onClick={toggleDescription}
                    sx={{ color: "background.paper" }}
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      height: "fit-content",
                      width: "fit-content",
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      color: "secondary.contrastText",
                      mt: 2,
                    }}
                    onClick={handleReadFirstChapter}
                  >
                    Start Reading
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      height: "fit-content",
                      width: "fit-content",
                      borderRadius: 2,
                      borderColor: "background.paper",
                      color: "background.paper",
                      mt: 2,
                    }}
                    onClick={handleReadLastChapter}
                  >
                    Latest Chapter
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        {banner2?.length > 0 && <BannerPage data={banner2} />}
        <Stack direction="column" spacing={2} my={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="background.paper"
          >
            Chapter List
          </Typography>
          <Stack direction="column" spacing={0}>
            <Typography variant="body1" fontWeight="bold">
              {storyDetail?.story?.chapterNumber} Chapter
            </Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            sx={{
              maxHeight: "1600px",
              overflow: "auto",
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Typography variant="body2" fontWeight="bold">
                Chapter
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                Update
              </Typography>
            </Stack>
            {storyDetail?.data?.map((chapter, index) => {
              if (!chapter.chapterIndex) {
                return null;
              }
              const chapterIndex = chapter.chapterIndex;
              // const chapterIndex =
              //   (storyDetail.pageIndex - 1) * storyDetail.pageSize + index + 1;
              return (
                <Link
                  href={`/story/${storyDetail.story.storyNameAlias}-${storyDetail.story.storyId}/chapter/${chapterIndex}.html`}
                  passHref
                  key={index}
                >
                  <ChapterTitle
                    chapterNumber={chapterIndex.toString()}
                    title={chapter.chapterName}
                    date={chapter.createdDateLabel}
                  />
                </Link>
              );
            })}
            <Divider />
          </Stack>
          <Pagination
            count={storyDetail?.totalPage || 0}
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
        </Stack>
        {banner3?.length > 0 && <BannerPage data={banner3} />}
        <Stack direction="column" spacing={2} my={4}>
          <Stack
            direction="row"
            mb={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <VisibilityIcon />
              <Typography variant="h4" fontWeight="bold">
                Recommend
              </Typography>
            </Stack>
            <Link passHref href="/newRelease/ALL/list-1.html" legacyBehavior>
              <MuiLink color="background.paper">View all</MuiLink>
            </Link>
          </Stack>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              {storyRefer?.map((story, index) => (
                <Grid
                  key={index}
                  size={storyRefer?.length === 1 ? 12 : { xs: 6, sm: 3, md: 2 }}
                  display="flex"
                  justifyContent={
                    storyRefer?.length === 1 ? "center" : "flex-start"
                  }
                >
                  <Link
                    href={`/story/${story.storyNameAlias}-${story.storyId}/list-1.html`}
                    passHref
                  >
                    <NovelCard
                      storyName={story.storyName}
                      status={story.status}
                      numberChapter={story.chapterNumber}
                      urlAvatar={story.urlAvatar}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
