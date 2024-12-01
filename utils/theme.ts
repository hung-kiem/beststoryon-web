import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export let lightTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: "#1E90FF",
    },
    primary: {
      main: "#5856D6",
    },
    secondary: {
      light: "#EDF7FA",
      main: "#00A8CC",
      dark: "#ba000d",
      contrastText: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#0F172A",
      secondary: "#757575",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          color: "black",

          "&:hover, &.active": {
            color: "#1E90FF",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "white",
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 2,
        },
      },
      variants: [
        {
          props: { color: "secondary" },
          style: {
            backgroundColor: "#142850",
            color: "white",
            fontWeight: "bold",
          },
        },
      ],
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export let darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#0F172A",
      paper: "#1E90FF",
    },
    primary: {
      main: "#5856D6",
    },
    secondary: {
      light: "#EDF7FA",
      main: "#00A8CC",
      dark: "#ba000d",
      contrastText: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#757575",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          color: "#FFFFFF",

          "&:hover, &.active": {
            color: "#1E90FF",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "white",
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 2,
        },
      },
      variants: [
        {
          props: { color: "secondary" },
          style: {
            backgroundColor: "#142850",
            color: "white",
            fontWeight: "bold",
          },
        },
      ],
    },
  },
});

darkTheme = responsiveFontSizes(darkTheme);
