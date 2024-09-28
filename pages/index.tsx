import { Seo } from "@/components/common";
import {
  HeroSection,
  FeaturedWork,
  RecentPost,
  TrendingNovel,
} from "@/components/home";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          url: "https://beststoryon.com/",
          title: "BestStoryOn",
          description:
            "BestStoryOn is a blog website that provides quality content on various topics.",
          thumbnailUrl: "https://beststoryon.com/thumbnail.png",
        }}
      />
      <TrendingNovel />
      {/* <RecentPost /> */}
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
