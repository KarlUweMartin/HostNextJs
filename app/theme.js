"use client";

import { alpha, createTheme } from "@mui/material/styles";

export const openStreetMapColors = {
  modal: {
    backdrop: "rgba(0, 0, 0, 0.75)",
    surface: "#15181ada",
    overlayBorder: "divider",
    iframeBackground: "background.default",
    emptyText: "text.secondary",
    zoomSegmentFilled: "#eda916",
    zoomSegmentEmpty: "#4c4b4a",
  },
  map: {
    measurement: "#529fdd",
    markerOutline: "#fff",
    crosshair: "#182230",
    crosshairOutline: "#529fdd",
    axisLabelBackground: "#35393f",
    axisLabelText: "#529fdd",
  },
  basemap: {
    land: "#32323a",
    residential: "#3b393c",
    park: "#2c302c",
    parkOutline: "#32323a",
    woodland: "#32323a",
    grass: "#32323a",
    wetland: "#32323a",
    sand: "#827158",
    ice: "#788b9d",
    cemetery: "#464e46",
    school: "#514940",
    hospital: "#574548",
    sportsGround: "#32323a",
    runningTrack: "#735a50",
    water: "#1d334d",
    building: "#595650",
    buildingOutline: "#45433f",
    minorRoad: "#ad8632",
    majorRoad: "#ad8632",
    motorway: "#be7b2f",
    roadOutline: "#544419",
    pedestrianArea: "#786237",
    rail: "#929087",
    railHatching: "#32323a",
    airport: "#4d4b55",
    boundary: "#929087",
    label: "#f3ede3",
    waterLabel: "#d2e7ff",
    labelHalo: "#25252b",
  },
};

const buttonRootStyles = {
  backgroundColor: "#15181a",
  color: "#f3ede3",
  "&.Mui-disabled": {
    color: "#43484e",
    borderColor: "#43484e",
  },
  ":hover": {
    backgroundColor: "#15181a",
    color: "#eda916",
    secondary: "#529fdd",
  },
};

const theme = createTheme({
  palette: {
    mode: "light",    
    border: 
    { 
      main: "#cf974c",
      secondary: "#529fdd",
      faded: "#141c24"
    },
    background: {
      default: "#0e0e0f",
      defaultDark: "#15181a",
      defaultLight: "#15181a",
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
        root: buttonRootStyles,     
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#242b30",
          color: "#f3ede3",
          "&.Mui-disabled": {
            color: "#43484e",
          },
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
          ...buttonRootStyles,
          border: 0,
          padding: "6px 8px",
          "&.Mui-selected": {
            backgroundColor: buttonRootStyles.backgroundColor,
            color: buttonRootStyles[":hover"].color,
            boxShadow: "inset 0 0 0 1px currentColor",
            "&:hover": buttonRootStyles[":hover"],
          },
          "&.Mui-disabled": {
            ...buttonRootStyles["&.Mui-disabled"],
            border: 0,
          },
        },
        sizeSmall: {
          padding: "4px 5px",
        },
        sizeLarge: {
          padding: "8px 11px",
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
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiInputLabel-root": {
            color: "#f3ede3",
            "&.Mui-focused": { color: "#529fdd" },
            "&.Mui-disabled": { color: "#929087" },
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#15181a",
            color: "#f3ede3",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
            "&:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: "#43484e",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              color: "#929087",
              WebkitTextFillColor: "#929087",
            },
          },
          "&:hover .MuiInputLabel-root:not(.Mui-disabled)": {
            color: "#529fdd",
          },
        }),
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
