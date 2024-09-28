import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export let lightTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    mode: "light",
    background: {
      default: "#EDF7FA",
      paper: "#1E90FF",
    },
    primary: {
      main: "#FF6464",
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
        maxWidth: "md",
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: "680px",

          "@media (min-width: 600px)": {
            maxWidth: "680px",
          },
        },
        maxWidthMd: {
          maxWidth: "860px",

          "@media (min-width: 900px)": {
            maxWidth: "860px",
          },
        },
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
            color: "#FF6464",
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
    primary: {
      main: "#CC1100",
    },
    secondary: {
      light: "#EDF7FA",
      main: "#00A8CC",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: "680px",

          "@media (min-width: 600px)": {
            maxWidth: "680px",
          },
        },
        maxWidthMd: {
          maxWidth: "860px",

          "@media (min-width: 900px)": {
            maxWidth: "860px",
          },
        },
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
            color: "#FF6464",
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
