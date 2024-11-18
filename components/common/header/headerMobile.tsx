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
        router.push(
          `/story/${selectedStory.storyNameAlias}-${selectedStory.storyId}.html`
        );
      }
    }
  };

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    setOpen(false); // Đóng menu
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
            fullWidth
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
          <MenuIcon onClick={toggleDrawer()} />
          <SwipeableDrawer
            anchor={"right"}
            open={open}
            onClose={toggleDrawer()}
            onOpen={toggleDrawer()}
            PaperProps={{
              style: {
                width: "40vw", // Tăng chiều rộng của menu
                maxWidth: "400px", // Đặt chiều rộng tối đa cho menu
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
                      sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      underline="none"
                      className={clsx({
                        active: route.path === router.pathname,
                      })}
                      color="text.primary"
                      onClick={() => handleMenuClick(route.path)}
                    >
                      {/* Thêm icon trước nhãn menu */}
                      <Icon sx={{ mr: 1 }}>
                        {index === 0 && <HomeIcon />}
                        {index === 1 && <FormatListBulletedIcon />}
                        {index === 2 && <LocalOfferIcon />}
                        {index === 3 && <NewReleasesIcon />}
                        {/* Thay đổi icon theo ý muốn */}
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
