import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import theme from "../theme";

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Outlet />
    </ThemeProvider>
  );
};

export default Layout;
