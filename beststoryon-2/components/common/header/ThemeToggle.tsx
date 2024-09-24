import { useThemeContext } from '@context/theme-context';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Fragment } from 'react';

const ThemeToggle = () => {
    const { mode, toggleTheme } = useThemeContext();

    return (
        // <Button onClick={toggleTheme}>
        //     Switch to {mode === 'light' ? 'dark' : 'light'} mode
        // </Button>

        <Fragment>
            {mode === 'light' ? (
                <DarkModeIcon onClick={toggleTheme} />
            ) : (
                <LightModeIcon onClick={toggleTheme} />
            )}
        </Fragment>
    );
};

export default ThemeToggle;
