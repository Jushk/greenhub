import "@fontsource/roboto";
import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#008080", // a teal color
    },
    secondary: {
      main: "#f44336", // a red color
    },
    background: {
      default: "#F7F1E5", // a dark grey color
    },
  },
  typography: {},
  fontFamily: "Roboto",
});

export default theme;
