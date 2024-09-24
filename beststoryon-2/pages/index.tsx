import { HeroSection, FeaturedWork, RecentPost } from '@/components/home';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';
const Home: NextPageWithLayout = () => {
    return (
        <Box>
            <HeroSection />
            <RecentPost />
            <FeaturedWork />
        </Box>
    );
};

Home.Layout = MainLayout;

export default Home;
