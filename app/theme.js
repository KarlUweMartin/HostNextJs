"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",    
    border: 
    { 
      main: "#e7d192",
      secondary: "#529fdd",
      faded: "#141c24"
    },
    background: {
      default: "#0e0e0f",
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
      blue: "#4775a8",
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
    },
    chip:
    {
      primary: "#529fdd",
      primary_offset: "#48779e",
      secondary: "#eda916",
      secondary_offset: "#ac8636",
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#1d1d1d",
          color: "#525151",
          textDecoration: "line-through",
          "&.Mui-selected": {
            textDecoration: "none",
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
          minWidth: "85px",      
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
