import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authInstance } from "../api/axios";
import useAuth from "../hooks/useAuth";
import { CalendarMonth, Home } from "@mui/icons-material";
import MyCalendar from "./MyCalendar";
import TodoList from "./TodoList";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const { userId, users, setAuth } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogoutClick = async () => {
    try {
      await authInstance.get(`/logout?userId=${userId}`, {
        withCredentials: true,
      });
      localStorage.removeItem("asdasd");
      localStorage.removeItem("asdasdasd");
      setAuth(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation();

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Green Student Hub
            </Link>
          </Typography>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="button" sx={{ mr: 2 }}>
              Login
            </Typography>
          </Link>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="button">Register</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography sx={{ minWidth: "150px" }}>
          {" "}
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
            target="_self"
          >
            Student Green Hub
          </Link>
        </Typography>
        <IconButton component={Link} to="/dashboard" color="inherit">
          <Home />
        </IconButton>
        <Box
          sx={{
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "0 auto",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <SearchBar />
        </Box>

        <Box display="flex" marginLeft={1}>
          {" "}
          {isXSmallScreen && (
            <>
              <IconButton
                color="inherit"
                aria-controls="calendar-menu"
                aria-haspopup="true"
                onClick={(event) => setCalendarAnchorEl(event.currentTarget)}
              >
                <CalendarMonth />
              </IconButton>
              <Menu
                id="calendar-menu"
                anchorEl={calendarAnchorEl}
                open={Boolean(calendarAnchorEl)}
                onClose={() => setCalendarAnchorEl(null)}
              >
                <MenuItem component={MyCalendar} />
                <MenuItem component={TodoList} />
              </Menu>
            </>
          )}
          <IconButton
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={(event) => setProfileAnchorEl(event.currentTarget)}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={() => setProfileAnchorEl(null)}
          >
            <MenuItem
              component={Link}
              to={`/profile/${users}`}
              onClick={() => setProfileAnchorEl(null)}
            >
              Edit Profile
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
