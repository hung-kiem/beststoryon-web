import {
  Container,
  Link as MuiLink,
  Icon,
  TextField,
  Autocomplete,
  AutocompleteInputChangeReason,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { SyntheticEvent, useState } from "react";
import { ROUTE_LIST } from "./routes";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { SearchPayload } from "@/models";
import { searchApi } from "@/api-client";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const fetcherSearch = (url: string, payload: SearchPayload) => {
  return searchApi.search(payload);
};

export function HeaderDesktop() {
  const router = useRouter();
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
        router.push(
          `/story/${selectedStory.storyNameAlias}-${selectedStory.storyId}.html`
        );
      }
    }
  };

  return (
    <Box display={{ xs: "none", sm: "block" }} py={2}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
          <Stack direction="row" justifyContent="flex-start" spacing={4}>
            {ROUTE_LIST.map((route, index) => (
              <Link key={route.path} href={route.path} passHref legacyBehavior>
                <MuiLink
                  sx={{
                    ml: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  underline="none"
                  className={clsx({
                    active: route.path === router.pathname,
                  })}
                  fontWeight="bold"
                >
                  <Icon sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <FormatListBulletedIcon />}
                    {index === 2 && <LocalOfferIcon />}
                    {index === 3 && <NewReleasesIcon />}
                    {/* Thay đổi icon theo ý muốn */}
                  </Icon>
                  <span>{route.label}</span>
                </MuiLink>
              </Link>
            ))}
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
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
                      height: "40px", // Giảm chiều cao của ô tìm kiếm
                      fontSize: "14px", // Giảm kích thước font cho phù hợp
                      padding: "0 12px", // Thêm padding ngang
                      "& .MuiInputBase-input": {
                        padding: "10px 0", // Căn chỉnh padding dọc để chữ được căn giữa
                      },
                      width: "300px", // Điều chỉnh chiều rộng của ô tìm kiếm
                    },
                    "& .MuiInputLabel-root": {
                      top: "-4px", // Điều chỉnh vị trí của label để căn giữa tốt hơn
                      fontSize: "14px",
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
            <ThemeToggle />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
