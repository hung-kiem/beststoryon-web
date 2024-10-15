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
} from "@mui/material";
import { useThemeContext } from "@context/theme-context";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuItem from "@mui/material/MenuItem";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import {
  GetChapterByIndexPayload,
  GetChapterDetailPayload,
} from "@/models/chapter";
import { chapterApi, storyApi } from "@/api-client";
import { useRouter } from "next/router";
import useSWR from "swr";
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

const fetcherStory = (url: string, payload: GetStoryDetailPayload) => {
  return storyApi.getDetail(payload);
};

const fetchChapterByIndex = (
  url: string,
  payload: GetChapterByIndexPayload
) => {
  return chapterApi.getByIndex(payload);
};

export const ChapterPage = () => {
  const router = useRouter();
  const { storyId, index = [1] } = router.query;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { mode, toggleTheme } = useThemeContext();
  const [chapterIndex, setChapterIndex] = useState(
    index ? (index[0] as number) : 1
  );

  const payload: GetChapterByIndexPayload | null = storyId
    ? {
        storyId: Array.isArray(storyId) ? storyId[0] : (storyId as string),
        chapterIndex: chapterIndex,
      }
    : null;

  const { data: chapterDetail, error } = useSWR(
    payload ? ["/chapter/getQuickByIndex", payload] : null,
    ([url, payload]) => fetchChapterByIndex(url, payload)
  );

  const storyPayload: GetStoryDetailPayload = {
    storyId: Array.isArray(storyId) ? storyId[0] : (storyId as string),
    pageIndex: 1,
    pageSize: 5000,
  };

  const { data: storyDetail } = useSWR(
    storyPayload ? ["/story/getDetail", storyPayload] : null,
    ([url, payload]) => fetcherStory(url, payload)
  );
  console.log("Story detail:", storyDetail);

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

  return (
    <Box>
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
                height: "56px",
                width: "56px",
              }}
            >
              <HomeIcon />
            </Button>
            <Button
              onClick={handleOpen}
              aria-label="setting"
              size="medium"
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
                height: "56px",
                width: "56px",
              }}
            >
              <SettingsIcon />
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
                height: "56px",
                width: "56px",
                display: { xs: "none", sm: "block" },
              }}
            >
              <HomeIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={handlePrevChapter}
              startIcon={<ArrowLeftIcon />}
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
              }}
            >
              Prev
            </Button>
            <FormControl
              sx={{
                width: 120,
              }}
            >
              <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chapterIndex.toString()}
                label="Chapter"
                onChange={handleChange}
                color="primary"
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
                display: { xs: "none", sm: "block" },
              }}
            >
              <SettingsIcon />
            </Button>
          </Stack>
          <Typography
            variant="body2"
            textAlign="left"
            dangerouslySetInnerHTML={{
              __html: chapterDetail?.data.content || "",
            }}
          ></Typography>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack
            direction="row"
            sx={style}
            borderRadius={2}
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              <TextDecreaseIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              <TextIncreaseIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              Select font
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              {mode === "light" ? (
                <DarkModeIcon onClick={toggleTheme} fontSize="medium" />
              ) : (
                <LightModeIcon onClick={toggleTheme} fontSize="medium" />
              )}
            </Button>
          </Stack>
        </Modal>
      </Container>
    </Box>
  );
};
