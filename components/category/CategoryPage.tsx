import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { NovelCard } from "./NovelCard";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import { categoryApi } from "@/api-client/category-api";
import { CategoryButton } from "./CategoryButton";

const MILLISECOND_PER_HOUR = 1000 * 60 * 60;
const statusArr = ["All", "Ongoing", "Completed"];
const sortByArr = ["Name", "Views", "Rating"];

export function CategoryPage() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Name");
  const { data: categories } = useSWR(
    `/category/getList`,
    categoryApi.getList,
    {
      revalidateOnFocus: false,
      dedupingInterval: MILLISECOND_PER_HOUR,
    }
  );

  return (
    <Box>
      <Container>
        <Stack direction="column" my={2} spacing={2}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Genre / Category
            </Typography>
            <Stack direction="row" spacing={1}>
              <Grid container spacing={1}>
                <Grid>
                  <CategoryButton
                    title="All"
                    code="All"
                    isActive={category === "All"}
                    onClick={setCategory}
                  />
                </Grid>
                {categories?.map((cat) => (
                  <Grid key={cat.catCode}>
                    <CategoryButton
                      title={cat.catName}
                      code={cat.catCode}
                      isActive={cat.catCode === category}
                      onClick={setCategory}
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
                  onClick={setStatus}
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
                  isActive={s === sortBy}
                  onClick={setSortBy}
                />
              ))}
            </Stack>
          </Stack>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <NovelCard />
              </Grid>
            </Grid>
          </Box>
          <Pagination
            count={20}
            variant="outlined"
            shape="rounded"
            boundaryCount={1}
            siblingCount={1}
            sx={{
              alignSelf: "center",
              mt: 2,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
