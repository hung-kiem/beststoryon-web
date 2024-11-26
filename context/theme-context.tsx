import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "@utils/theme";

interface ThemeContextProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("themeMode");
      if (storedMode === "light" || storedMode === "dark") {
        return storedMode;
      }
    }
    return "light";
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
    }
  };

  const setTheme = (theme: "light" | "dark") => {
    setMode(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", theme); // Lưu lại vào localStorage
    }
  };

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
      <EmotionThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
