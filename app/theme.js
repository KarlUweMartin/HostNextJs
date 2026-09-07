"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",    
    border: 
    { 
      main: "#e7d192",
      secondary: "#4775a8"
    },
    background: {
      default: "#1b1b1d",
      defaultDark: "#19191b",
      defaultLight: "#202124",
      blurry: "#32323a52",
      paper: "#35393f"
    },
    button: {
      default: "#35393f",
      hover: "#7ab3e9",      
    },
    text: {
      primary: "#eda916",
      secondary: "#f3ede3",
      faded: "#929087",
      dark: "#32323a"
    },
    data:
    {
      blue: "#1779c9",
      orange: "#ed7716",
      green: "#2caf2c",
      red: "#c9112a",
      cyan: "#15acc0",
      pink: "#d32289",
    }       
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: [
      "Helvetica Neue",
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {       
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#35393f",
          color: "#f3ede3",
          ":hover": {
            backgroundColor: "#535861",
            color: "#eda916",
          },
        },     
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#35393f",
          color: "#f3ede3",
          ":hover": {
            backgroundColor: "#535861",
            color: "#eda916",
          },
        },     
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {          
          backgroundColor: "#1f2124",
          color: "#eda916"          
        },     
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          minWidth: "120px",      
          backgroundColor: "#3b86db",
        },     
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {     
          color: "#609ee6",
           ":hover": {
            color: "#eda916",
          },
        },     
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {     
          color: "#7ab3e9"          
        },     
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth", 
        },
      },
    },
  },
});

export default theme;
