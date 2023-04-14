import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import theme from "../theme";
import { authInstance } from "../api/axios";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await authInstance.post("/login", formData, {
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const userId = response?.data?.user?._id;
      const username = response?.data?.user?.username;
      setAuth({ userId, username, accessToken });
      localStorage.setItem("asdasd", userId);
      localStorage.setItem("asdasdasd", username);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        marginTop={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "5",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ margin: theme.spacing(3, 0, 2), fontWeight: "bold" }}
        >
          Login
        </Typography>{" "}
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: theme.spacing(3, 0, 2) }}
          >
            Sign In
          </Button>
          <Typography align="center">
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Sign up
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
