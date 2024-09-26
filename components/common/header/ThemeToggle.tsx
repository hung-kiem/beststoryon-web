import { useThemeContext } from "@context/theme-context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Fragment } from "react";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Fragment>
      {mode === "light" ? (
        <DarkModeIcon onClick={toggleTheme} fontSize="medium" />
      ) : (
        <LightModeIcon onClick={toggleTheme} fontSize="medium" />
      )}
    </Fragment>
  );
};

export default ThemeToggle;
