import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
const Home: NextPageWithLayout = () => {
  return <Box>Home page</Box>;
};

Home.Layout = MainLayout;

export default Home;
