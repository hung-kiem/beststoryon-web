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
  Icon,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useThemeContext } from "@context/theme-context";
import { chapterApi, storyApi } from "@/api-client";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import { GetChapterByIndexPayload } from "@/models/chapter";
import { GetStoryDetailPayload } from "@/models/story";

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

export const ChapterPage = () => {
  const router = useRouter();
  const { storyId, index = [1] } = router.query;
  const idParts = storyId
    ? (Array.isArray(storyId) ? storyId[0] : storyId).split("-")
    : [];
  const id = idParts.pop();
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();

  const [open, setOpen] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(Number(index[0]) || 1);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFontSize = localStorage.getItem("fontSize");
      const storedFontFamily = localStorage.getItem("fontFamily");
      if (storedFontSize) {
        setFontSize(Number(storedFontSize));
      }
      if (storedFontFamily) {
        setFontFamily(storedFontFamily);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fontSize", fontSize.toString());
      localStorage.setItem("fontFamily", fontFamily);
    }
  }, [fontSize, fontFamily]);

  useEffect(() => {
    if (index && Array.isArray(index)) {
      setChapterIndex(Number(index[0]) || 1);
    }
  }, [index]);

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

  const isLoading = loadingChapterDetail || loadingStoryDetail;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    const newIndex = Number(event.target.value);
    setChapterIndex(newIndex);
  };

  const handleNextChapter = () => {
    if (chapterIndex < (storyDetail?.totalRecord || 1)) {
      setChapterIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevChapter = () => {
    if (chapterIndex > 1) {
      setChapterIndex((prevIndex) => prevIndex - 1);
    }
  };

  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () =>
    setFontSize((prevSize) => Math.max(12, prevSize - 2));
  const handleFontFamilyChange = (event: SelectChangeEvent) => {
    setFontFamily(event.target.value);
  };

  return (
    <Box>
      <LoadingOverlay isLoading={isLoading} />
      <Container>
        <Stack direction="column" spacing={2} alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            {chapterDetail?.data?.storyName}
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
              onClick={() => router.push("/")}
            >
              <Icon
                sx={{
                  fontSize: "24px",
                  alignItems: "center",
                }}
              >
                <HomeIcon />
              </Icon>
            </Button>
            <Button
              onClick={handleOpen}
              aria-label="setting"
              size="medium"
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
                height: "40px", // Giảm chiều cao
                // padding: "0 12px", // Thêm padding
                borderRadius: "8px", // Bo góc
              }}
            >
              <Icon
                sx={{
                  fontSize: "24px",
                  alignItems: "center",
                }}
              >
                <SettingsIcon />
              </Icon>
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
              onClick={() => router.push("/")}
            >
              <Icon
                sx={{
                  fontSize: "24px",
                  alignItems: "center",
                }}
              >
                <HomeIcon />
              </Icon>
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
            <Button
              onClick={handleOpen}
              aria-label="setting"
              size="medium"
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
                height: "40px", // Giảm chiều cao
                // padding: "0 12px", // Thêm padding
                borderRadius: "8px", // Bo góc
                display: { xs: "none", sm: "block" },
              }}
            >
              <Icon
                sx={{
                  fontSize: "24px",
                  alignItems: "center",
                }}
              >
                <SettingsIcon />
              </Icon>
            </Button>
          </Stack>
          <Typography
            variant="body2"
            textAlign="left"
            sx={{
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily === "Default" ? "inherit" : fontFamily,
            }}
            dangerouslySetInnerHTML={{
              __html: chapterDetail?.data.content || "",
            }}
          ></Typography>
        </Stack>
        <Modal open={open} onClose={handleClose}>
          <Stack direction="column" sx={style} spacing={2}>
            <Button
              variant="outlined"
              onClick={decreaseFontSize}
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
                height: "36px", // Giảm chiều cao
                padding: "0 8px", // Thêm padding
                borderRadius: "6px", // Bo góc
              }}
            >
              <TextDecreaseIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={increaseFontSize}
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
                height: "36px", // Giảm chiều cao
                padding: "0 8px", // Thêm padding
                borderRadius: "6px", // Bo góc
              }}
            >
              <TextIncreaseIcon />
            </Button>
            <FormControl>
              <InputLabel id="font-family-select-label">Font</InputLabel>
              <Select
                labelId="font-family-select-label"
                value={fontFamily}
                onChange={handleFontFamilyChange}
                label="Font"
                color="primary"
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
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
                <MenuItem value="Default" sx={{ backgroundColor: "#ffffff" }}>
                  Default
                </MenuItem>
                <MenuItem value="Roboto" sx={{ backgroundColor: "#ffffff" }}>
                  Roboto
                </MenuItem>
                <MenuItem value="Lora" sx={{ backgroundColor: "#ffffff" }}>
                  Lora
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={toggleTheme}
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
                height: "36px", // Giảm chiều cao
                padding: "0 8px", // Thêm padding
                borderRadius: "6px", // Bo góc
              }}
            >
              {mode === "light" ? (
                <DarkModeIcon fontSize="medium" />
              ) : (
                <LightModeIcon fontSize="medium" />
              )}
            </Button>
          </Stack>
        </Modal>
      </Container>
    </Box>
  );
};
