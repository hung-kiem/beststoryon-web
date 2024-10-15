import { Box, Stack } from "@mui/system";
import React, { SyntheticEvent, useState } from "react";
import {
  Link as MuiLink,
  Container,
  Icon,
  TextField,
  Autocomplete,
  AutocompleteInputChangeReason,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ROUTE_LIST } from "./routes";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useTheme } from "@mui/material/styles";
import { useDebounce } from "use-debounce";
import { SearchPayload } from "@/models";
import { searchApi } from "@/api-client";
import useSWR from "swr";

const fetcherSearch = (url: string, payload: SearchPayload) => {
  return searchApi.search(payload);
};

export function HeaderMobile() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  const payload: SearchPayload = {
    keyword: debouncedSearchValue,
    status: "ALL",
    sortCondition: "POPULAR",
    pageIndex: 1,
    pageSize: 5,
  };
  const { data: searchResults, mutate } = useSWR(
    debouncedSearchValue ? [`/search`, payload] : null,
    ([url, payload]) => fetcherSearch(url, payload)
  );

  const handleInputChange = (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    setSearchValue(value);
  };

  const handleOptionSelect = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      const selectedStory = searchResults?.data?.find(
        (story) => story.storyName === value
      );
      if (selectedStory) {
        router.push(`/story/${selectedStory.storyId}`);
      }
    }
  };

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  return (
    <Box
      display={{
        xs: "block",
        sm: "none",
      }}
    >
      <Container sx={{ mt: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Link href="/" passHref>
            <Icon
              sx={{
                fontSize: 70,
                alignItems: "center",
              }}
            >
              <AutoStoriesIcon
                sx={{
                  fontSize: 50,
                  height: "100%",
                }}
              />
            </Icon>
          </Link>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={
              searchResults?.data?.map((option) => option.storyName) || []
            }
            onInputChange={handleInputChange}
            onChange={handleOptionSelect}
            value={searchValue}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#1565c0",
                    },
                    borderRadius: "6px",
                    width: "100%",
                  },
                }}
              />
            )}
            // Tùy chỉnh màu nền của danh sách các tùy chọn
            componentsProps={{
              paper: {
                sx: {
                  backgroundColor: "#e3f2fd", // Màu nền xanh dương rất nhạt cho danh sách các tùy chọn
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  "& .MuiAutocomplete-option": {
                    backgroundColor: "#ffffff", // Màu nền trắng cho từng tùy chọn
                    color: "#1565c0", // Màu chữ xanh dương đậm
                    padding: "10px",
                    "&:hover": {
                      backgroundColor: "#bbdefb", // Màu nền xanh dương nhạt khi hover
                    },
                    "&[aria-selected='true']": {
                      backgroundColor: "#1565c0", // Màu nền xanh dương đậm khi được chọn
                      color: "#ffffff", // Màu chữ trắng khi tùy chọn được chọn
                    },
                  },
                },
              },
            }}
          />
          <MenuIcon onClick={toggleDrawer()} />
          <SwipeableDrawer
            anchor={"right"}
            open={open}
            onClose={toggleDrawer()}
            onOpen={toggleDrawer()}
            PaperProps={{
              style: {
                backgroundColor:
                  theme.palette.mode === "light" ? "#EDF7FA" : "#0F172A",
              },
            }}
          >
            {ROUTE_LIST.map((route) => (
              <Link key={route.path} href={route.path} passHref legacyBehavior>
                <MuiLink
                  sx={{ ml: 2, mr: 2, mt: 2 }}
                  underline="none"
                  className={clsx({
                    active: route.path === router.pathname,
                  })}
                  color="text.primary"
                >
                  {route.label}
                </MuiLink>
              </Link>
            ))}
          </SwipeableDrawer>
        </Stack>
      </Container>
    </Box>
  );
}
