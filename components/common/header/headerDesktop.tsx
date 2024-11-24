import React, { SyntheticEvent, useState, memo } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  Container,
  Link as MuiLink,
  Icon,
  Autocomplete,
  Stack,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { ROUTE_LIST } from "./routes";
import Link from "next/link";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { SearchPayload } from "@/models";
import { searchApi } from "@/api-client";
import { useDebounce } from "use-debounce";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ThemeToggle from "./ThemeToggle";
import clsx from "clsx";
import { SearchItem } from "./SearchItem";
import { StoryDetail } from "@/models/story";
import { useThemeContext } from "@/context";

const LogoComponent = memo(() => (
  <h1 style={{ display: "flex", alignItems: "center", margin: 0 }}>
    <Link href="/" passHref>
      <Icon sx={{ fontSize: 70, alignItems: "center" }}>
        <AutoStoriesIcon sx={{ fontSize: 50, height: "100%" }} />
      </Icon>
    </Link>
    <span style={{ visibility: "hidden", position: "absolute" }}>
      NovelsNook - Explore Fan-Fiction Novels Online Free!
    </span>
  </h1>
));

const fetcherSearch = (url: string, payload: SearchPayload) =>
  searchApi.search(payload);

export function HeaderDesktop() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const { mode } = useThemeContext();

  const payload: SearchPayload = {
    keyword: debouncedSearchValue,
    status: "ALL",
    sortCondition: "POPULAR",
    pageIndex: 1,
    pageSize: 5,
  };

  const { data: searchResults, isValidating } = useSWR(
    debouncedSearchValue ? ["/search", payload] : null,
    ([url, payload]) => fetcherSearch(url, payload)
  );

  const handleInputChange = (_: SyntheticEvent, value: string) => {
    setSearchValue(value);
  };

  const handleOptionSelect = (value: StoryDetail) => {
    if (value) {
      router.push(`/story/${value.storyNameAlias}-${value.storyId}.html`);
      (document.activeElement as HTMLElement)?.blur();
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
          <LogoComponent />
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
                  className={clsx({ active: route.path === router.pathname })}
                  fontWeight="bold"
                >
                  <Icon sx={{ mr: 1 }}>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <FormatListBulletedIcon />}
                    {index === 2 && <LocalOfferIcon />}
                    {index === 3 && <NewReleasesIcon />}
                  </Icon>
                  <span>{route.label}</span>
                </MuiLink>
              </Link>
            ))}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Autocomplete
              id="search-autocomplete"
              freeSolo
              options={searchResults?.data || []}
              onInputChange={handleInputChange}
              value={searchValue}
              loading={isValidating}
              fullWidth
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option?.storyName || ""
              }
              renderOption={(props, option, { index }) => (
                <>
                  <SearchItem
                    story={option}
                    onSelected={handleOptionSelect}
                    {...props}
                  />
                  {index < (searchResults?.data?.length || 0) - 1 && (
                    <Divider sx={{ backgroundColor: "#BDBDBD" }} />
                  )}
                </>
              )}
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
                      height: "40px",
                      fontSize: "14px",
                      padding: "0 12px",
                      "& .MuiInputBase-input": {
                        padding: "10px 0",
                      },
                      width: "300px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "-4px",
                      fontSize: "14px",
                    },
                  }}
                />
              )}
              componentsProps={{
                paper: {
                  sx: {
                    backgroundColor: mode === "light" ? "#0F172A" : "#FFF",
                    borderRadius: "8px",
                    marginTop: "4px",
                    maxHeight: "300px", // Giới hạn chiều cao tối đa của danh sách tùy chọn
                    overflow: "auto", // Thêm cuộn khi danh sách tùy chọn quá dài
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    "& .MuiAutocomplete-option": {
                      padding: "0px",
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
