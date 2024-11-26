import { Box, Stack } from "@mui/system";
import React, { SyntheticEvent, useState } from "react";
import {
  Link as MuiLink,
  Container,
  Icon,
  TextField,
  Autocomplete,
  AutocompleteInputChangeReason,
  IconButton,
  Divider,
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
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { SearchItem } from "./SearchItem";
import { StoryDetail } from "@/models/story";
import { useThemeContext } from "@/context";

const fetcherSearch = (url: string, payload: SearchPayload) => {
  return searchApi.search(payload);
};

export function HeaderMobile() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
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

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    setOpen(false); // Đóng menu
  };

  const handleOptionSelect = (value: StoryDetail) => {
    if (value) {
      router.push(`/story/${value.storyNameAlias}-${value.storyId}.html`);
      (document.activeElement as HTMLElement)?.blur();
    }
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
          <h1 style={{ display: "flex", alignItems: "center", margin: 0 }}>
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
          </h1>
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
                  maxHeight: "300px",
                  overflow: "auto",
                  marginTop: "4px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  "& .MuiAutocomplete-option": {
                    padding: "0px",
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
                width: "40vw",
                maxWidth: "400px",
                backgroundColor:
                  theme.palette.mode === "light" ? "#EDF7FA" : "#0F172A",
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              {/* Nút X để đóng menu */}
              <IconButton
                onClick={toggleDrawer()}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              {/* Danh sách các mục menu, mỗi mục có một icon */}
              <Box mt={5}>
                {ROUTE_LIST.map((route, index) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    passHref
                    legacyBehavior
                  >
                    <MuiLink
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                      underline="none"
                      className={clsx({
                        active: route.path === router.pathname,
                      })}
                      color="text.primary"
                      onClick={() => handleMenuClick(route.path)}
                      fontWeight="bold"
                    >
                      <Icon
                        sx={{ mr: 1, display: "flex", alignItems: "center" }}
                      >
                        {index === 0 && <HomeIcon />}
                        {index === 1 && <FormatListBulletedIcon />}
                        {index === 2 && <LocalOfferIcon />}
                        {index === 3 && <NewReleasesIcon />}
                      </Icon>
                      {route.label}
                    </MuiLink>
                  </Link>
                ))}
              </Box>
            </Box>
          </SwipeableDrawer>
        </Stack>
      </Container>
    </Box>
  );
}
