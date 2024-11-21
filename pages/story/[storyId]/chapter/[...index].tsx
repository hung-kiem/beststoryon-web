import { Seo } from "@/components/common";
import { MainLayout } from "@/components/layout";
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import Grid from "@mui/material/Grid2";
import { GetChapterByIndexPayload } from "@/models/chapter";
import { chapterApi, storyApi } from "@/api-client";
import {
  GetStoryDetailPayload,
  GetStoryListReferPayload,
} from "@/models/story";
import { useRouter } from "next/router";
import { useThemeContext } from "@/context";
import useSWR from "swr";
import { useTheme } from "@mui/material/styles";
import { NovelCard } from "@/components/chapter/NovelCard";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.default",
  boxShadow: 24,
  p: 4,
};

const fetchChapterDetail = (url: string, payload: GetChapterByIndexPayload) =>
  chapterApi.getByIndex(payload);

const fetchStoryDetail = (url: string, payload: GetStoryDetailPayload) =>
  storyApi.getDetail(payload);

const fetcherRefer = (url: string, payload: GetStoryListReferPayload) => {
  return storyApi.getListRefer(payload);
};

const Chapter = () => {
  const router = useRouter();
  const { storyId, index = [1] } = router.query;
  const idParts = storyId
    ? (Array.isArray(storyId) ? storyId[0] : storyId).split("-")
    : [];
  const id = idParts.pop();
  const theme = useTheme();
  const { mode, setTheme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [chapterIndex, setChapterIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const storedChapterIndex = localStorage.getItem("chapterIndex");
      return storedChapterIndex ? Number(storedChapterIndex) : 1;
    }
    return 1;
  });

  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== "undefined") {
      const storedFontSize = localStorage.getItem("fontSize");
      return storedFontSize ? Number(storedFontSize) : 16;
    }
    return 16;
  });

  const [fontFamily, setFontFamily] = useState(() => {
    if (typeof window !== "undefined") {
      const storedFontFamily = localStorage.getItem("fontFamily");
      return storedFontFamily || "Default";
    }
    return "Default";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFontSize = localStorage.getItem("fontSize");
      const storedFontFamily = localStorage.getItem("fontFamily");
      const storedMode = localStorage.getItem("themeMode");

      if (storedFontSize) setFontSize(Number(storedFontSize));
      if (storedFontFamily) setFontFamily(storedFontFamily);
      if (storedMode === "light" || storedMode === "dark") {
        setTheme(storedMode as "light" | "dark");
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fontSize", fontSize.toString());
      localStorage.setItem("fontFamily", fontFamily);
      localStorage.setItem("theme", mode);
    }
  }, [fontSize, fontFamily, mode]);

  useEffect(() => {
    if (index && Array.isArray(index)) {
      setChapterIndex(Number(index[0]) || 1);
    }
  }, [index]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapterIndex]);

  const chapterPayload: GetChapterByIndexPayload | null = storyId
    ? { storyId: id || "", chapterIndex }
    : null;

  const storyPayload: GetStoryDetailPayload = {
    storyId: id || "",
    pageIndex: 1,
    pageSize: 5000,
  };

  const { data: chapterDetail, isValidating: loadingChapterDetail } = useSWR(
    chapterPayload ? ["/chapter/getQuickByIndex", chapterPayload] : null,
    ([, payload]) => fetchChapterDetail("", payload)
  );

  const { data: storyDetail, isValidating: loadingStoryDetail } = useSWR(
    storyPayload ? ["/story/getDetail", storyPayload] : null,
    ([, payload]) => fetchStoryDetail("", payload)
  );

  const payloadRefer: GetStoryListReferPayload = {
    storyId: id || "",
  };
  const { data: storyRefer, isValidating: loadingStoryRefer } = useSWR(
    ["/story/getListRefer", payloadRefer],
    ([url, payload]) => fetcherRefer(url, payload)
  );

  const isLoading = loadingChapterDetail || loadingStoryDetail;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    const newIndex = Number(event.target.value);
    setChapterIndex(newIndex);
    updatePathParam(newIndex);
  };

  const handleNextChapter = () => {
    if (chapterIndex < (storyDetail?.totalRecord || 1)) {
      setChapterIndex((prevIndex) => prevIndex + 1);
      updatePathParam(chapterIndex + 1);
    }
  };

  const handlePrevChapter = () => {
    if (chapterIndex > 1) {
      setChapterIndex((prevIndex) => prevIndex - 1);
      updatePathParam(chapterIndex - 1);
    }
  };

  const updatePathParam = (newIndex: number) => {
    router.push(
      {
        pathname: `/story/${storyId}/chapter/${newIndex}.html`,
      },
      undefined,
      { shallow: true }
    );
  };

  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () =>
    setFontSize((prevSize) => Math.max(12, prevSize - 2));
  const handleFontFamilyChange = (event: SelectChangeEvent) => {
    setFontFamily(event.target.value);
  };
  const titleSeo = useMemo(() => {
    if (chapterDetail?.data.chapterName && chapterDetail?.data.storyName) {
      return (
        chapterDetail.data.storyName + " - " + chapterDetail?.data?.chapterName
      );
    } else {
      return "Novelsnook";
    }
  }, [chapterDetail]);

  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title: titleSeo,
          description:
            "Novelsnook is a blog website that provides quality content on various topics.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      <Box>
        <LoadingOverlay isLoading={isLoading} />
        <Container>
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            mb={4}
            textAlign="left"
          >
            <Typography
              variant="h2"
              fontSize={{ xs: "20px", sm: "28px", md: "32px" }}
              fontWeight="bold"
              width="100%"
            >
              {chapterDetail?.data?.storyName}
            </Typography>
            <Typography
              variant="h3"
              fontSize={{ xs: "18px", sm: "22px", md: "24px" }}
              fontWeight="bold"
              width="100%"
            >
              {chapterDetail?.data.chapterName}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                height: "56px",
                display: { xs: "block", sm: "none" },
              }}
            >
              <Button
                aria-label="home"
                sx={{
                  backgroundColor: "background.paper",
                  color: "secondary.contrastText",
                  height: "40px", // Giảm chiều cao
                  // padding: "0 12px", // Thêm padding
                  borderRadius: "8px", // Bo góc
                  justifyContent: "center", // Căn giữa theo chiều ngang
                  alignItems: "center", // Căn giữa theo chiều dọc
                }}
                onClick={() => router.push(`/story/${storyId}`)}
              >
                <HomeIcon sx={{ fontSize: "24px" }} />
              </Button>
              <Button
                onClick={handleOpen}
                aria-label="setting"
                size="medium"
                sx={{
                  color: "secondary.contrastText",
                  backgroundColor: "background.paper",
                  height: "40px", // Giảm chiều cao
                  borderRadius: "8px", // Bo góc
                }}
              >
                <SettingsIcon sx={{ fontSize: "24px" }} />
              </Button>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                height: "56px",
              }}
            >
              <Button
                aria-label="home"
                sx={{
                  backgroundColor: "background.paper",
                  color: "secondary.contrastText",
                  height: "40px", // Giảm chiều cao
                  // padding: "0 12px", // Thêm padding
                  borderRadius: "8px", // Bo góc
                  justifyContent: "center", // Căn giữa theo chiều ngang
                  alignItems: "center", // Căn giữa theo chiều dọc
                  display: { xs: "none", sm: "block" },
                }}
                onClick={() => router.push(`/story/${storyId}`)}
              >
                <HomeIcon sx={{ fontSize: "24px", height: "100%" }} />
              </Button>
              <Button
                variant="outlined"
                onClick={handlePrevChapter}
                startIcon={<ArrowLeftIcon />}
                sx={{
                  color: "secondary.contrastText",
                  backgroundColor: "background.paper",
                  height: "40px", // Giảm chiều cao
                  padding: "0 12px", // Thêm padding
                  borderRadius: "8px", // Bo góc
                }}
              >
                Prev
              </Button>
              <FormControl
                sx={{
                  width: 160,
                  height: "40px", // Giảm chiều cao để bằng với button
                  "& .MuiInputBase-root": {
                    height: "40px", // Căn chỉnh chiều cao của input
                    borderRadius: "8px", // Bo góc để phù hợp với button
                    padding: "0 12px", // Thêm padding cho hợp lý
                    "& .MuiInputBase-input": {
                      // color: theme.palette.text.primary, // Màu chữ trong select
                    },
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.text.primary, // Màu của icon dropdown
                    },
                  },
                }}
              >
                <InputLabel
                  id="chapter-select-label"
                  sx={{
                    top: "-6px",
                  }}
                >
                  Chapter
                </InputLabel>
                {isInitialized && (
                  <Select
                    labelId="chapter-select-label"
                    id="chapter-select"
                    value={chapterIndex.toString()}
                    label="Chapter"
                    onChange={handleChange}
                    color="primary"
                    sx={{
                      height: "40px", // Giảm chiều cao của select
                      borderRadius: "8px", // Bo góc cho select
                      "& .MuiSelect-select": {
                        // color: theme.palette.text.primary, // Màu chữ khi chọn
                      },
                      color: mode === "light" ? "#0F172A" : "#FFFFFF",
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root": {
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                            },
                          },
                        },
                      },
                      MenuListProps: {
                        sx: {
                          py: 0,
                        },
                      },
                    }}
                  >
                    {storyDetail?.totalRecord &&
                      Array.from(
                        { length: storyDetail.totalRecord },
                        (_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>
                            Chapter {index + 1}
                          </MenuItem>
                        )
                      )}
                  </Select>
                )}
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<ArrowRightIcon />}
                onClick={handleNextChapter}
                sx={{
                  color: "secondary.contrastText",
                  backgroundColor: "background.paper",
                  height: "40px", // Giảm chiều cao
                  padding: "0 12px", // Thêm padding
                  borderRadius: "8px", // Bo góc
                }}
              >
                Next
              </Button>
              <Button
                onClick={handleOpen}
                aria-label="setting"
                size="medium"
                sx={{
                  color: "secondary.contrastText",
                  backgroundColor: "background.paper",
                  height: "40px", // Giảm chiều cao
                  borderRadius: "8px", // Bo góc
                  alignItems: "center", // Căn giữa theo chiều dọc
                  display: { xs: "none", sm: "block" },
                }}
              >
                <SettingsIcon sx={{ fontSize: "24px", height: "100%" }} />
              </Button>
            </Stack>
            {isInitialized && (
              <Content
                content={chapterDetail?.data?.content || ""}
                fontSize={fontSize}
                fontFamily={fontFamily}
              />
            )}
            <div style={{ marginTop: "32px" }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  height: "56px",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handlePrevChapter}
                  startIcon={<ArrowLeftIcon />}
                  sx={{
                    color: "secondary.contrastText",
                    backgroundColor: "background.paper",
                    height: "40px", // Giảm chiều cao
                    padding: "0 12px", // Thêm padding
                    borderRadius: "8px", // Bo góc
                    marginTop: "auto",
                  }}
                >
                  Prev
                </Button>
                <FormControl
                  sx={{
                    width: 160,
                    height: "40px", // Giảm chiều cao để bằng với button
                    "& .MuiInputBase-root": {
                      height: "40px", // Căn chỉnh chiều cao của input
                      borderRadius: "8px", // Bo góc để phù hợp với button
                      padding: "0 12px", // Thêm padding cho hợp lý
                    },
                  }}
                >
                  <InputLabel
                    id="chapter-select-label"
                    sx={{
                      top: "-6px", // Điều chỉnh vị trí của label
                    }}
                  >
                    Chapter
                  </InputLabel>
                  <Select
                    labelId="chapter-select-label"
                    id="chapter-select"
                    value={chapterIndex.toString()}
                    label="Chapter"
                    onChange={handleChange}
                    color="primary"
                    sx={{
                      height: "40px", // Giảm chiều cao của select
                      borderRadius: "8px", // Bo góc cho select
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root": {
                            backgroundColor: theme.palette.background.default,
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                            },
                          },
                        },
                      },
                      MenuListProps: {
                        sx: {
                          py: 0,
                        },
                      },
                    }}
                  >
                    {storyDetail?.totalRecord &&
                      Array.from(
                        { length: storyDetail.totalRecord },
                        (_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>
                            Chapter {index + 1}
                          </MenuItem>
                        )
                      )}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<ArrowRightIcon />}
                  onClick={handleNextChapter}
                  sx={{
                    color: "secondary.contrastText",
                    backgroundColor: "background.paper",
                    height: "40px", // Giảm chiều cao
                    padding: "0 12px", // Thêm padding
                    borderRadius: "8px", // Bo góc
                  }}
                >
                  Next
                </Button>
              </Stack>
            </div>
          </Stack>
          {isInitialized && (
            <Modal open={open} onClose={handleClose}>
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  ...style,
                  width: "100%", // Đảm bảo modal phù hợp với màn hình nhỏ
                  maxWidth: "400px", // Giới hạn chiều rộng
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    onClick={decreaseFontSize}
                    sx={{
                      minWidth: "50px", // Đảm bảo kích thước nút nhỏ gọn
                      height: "50px",
                    }}
                  >
                    <TextDecreaseIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={increaseFontSize}
                    sx={{
                      minWidth: "50px",
                      height: "50px",
                    }}
                  >
                    <TextIncreaseIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setTheme(mode === "light" ? "dark" : "light")
                    }
                    sx={{
                      minWidth: "50px",
                      height: "50px",
                    }}
                  >
                    {mode === "light" ? (
                      <DarkModeIcon fontSize="medium" />
                    ) : (
                      <LightModeIcon fontSize="medium" />
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const defaultFontSize = 16;
                      const defaultFontFamily = "Default";
                      const defaultTheme = "light";

                      setFontSize(defaultFontSize);
                      setFontFamily(defaultFontFamily);
                      setTheme("light");

                      localStorage.setItem(
                        "fontSize",
                        defaultFontSize.toString()
                      );
                      localStorage.setItem("fontFamily", defaultFontFamily);
                      localStorage.setItem("theme", defaultTheme);
                    }}
                    color="error"
                    sx={{
                      minWidth: "50px",
                      height: "50px",
                    }}
                  >
                    <RestartAltIcon />
                  </Button>
                </Stack>
                <FormControl fullWidth>
                  <InputLabel id="font-family-select-label">Font</InputLabel>
                  <Select
                    labelId="font-family-select-label"
                    value={fontFamily}
                    onChange={handleFontFamilyChange}
                    label="Font"
                    color="primary"
                    sx={{
                      height: "40px", // Giảm chiều cao của select
                      borderRadius: "8px", // Bo góc cho select
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root": {
                            backgroundColor: theme.palette.background.default,
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                            },
                          },
                        },
                      },
                      MenuListProps: {
                        sx: {
                          py: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem value="Default">Default</MenuItem>
                    <MenuItem value="Roboto">Roboto</MenuItem>
                    <MenuItem value="Lora">Lora</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Modal>
          )}

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
                  You'll Also Like
                </Typography>
              </Stack>
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
                {storyRefer?.data?.map((story, index) => (
                  <Grid
                    key={index}
                    size={
                      storyRefer?.data?.length === 1
                        ? 12
                        : { xs: 6, sm: 3, md: 2 }
                    }
                    display="flex"
                    justifyContent={
                      storyRefer?.data?.length === 1 ? "center" : "flex-start"
                    }
                  >
                    <Link
                      href={`/story/${story.storyNameAlias}-${story.storyId}.html`}
                      passHref
                    >
                      <NovelCard story={story} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

const Content = ({
  content,
  fontSize,
  fontFamily,
}: {
  content: string;
  fontSize: number;
  fontFamily: string;
}) => {
  return (
    <Typography
      variant="body2"
      textAlign="left"
      sx={{
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily === "Default" ? "inherit" : fontFamily,
        "& p, & div, & li": {
          marginBottom: "20px",
        },
      }}
      dangerouslySetInnerHTML={{
        __html: content || "",
      }}
    />
  );
};

Chapter.Layout = MainLayout;

export default Chapter;
