import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import theme from "../theme";
import { Link, useNavigate } from "react-router-dom";
import { authInstance } from "../api/axios";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    course: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await authInstance.post("/register", formData, {
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const userId = response?.data?.user?._id;
      const username = response?.data?.user?.username;
      setAuth({ userId, username, accessToken });
      localStorage.setItem("asdasd", userId);
      localStorage.setItem("asdasdasd", username);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  console.log(formData);
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
          Register
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="course"
                label="Course"
                name="course"
                autoComplete="course"
                value={formData.course}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: theme.spacing(3, 0, 2) }}
          >
            Register
          </Button>
          <Typography align="center">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log in
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};
export default RegisterPage;
