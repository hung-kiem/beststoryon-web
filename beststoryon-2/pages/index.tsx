import { HeroSection, RecentPost } from '@/components/home';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';
const Home: NextPageWithLayout = () => {
    return (
        <Box>
            <HeroSection />
            <RecentPost />
        </Box>
    );
};

Home.Layout = MainLayout;

export default Home;
