import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NotFoundPage = () => {
  const { userId } = useAuth();
  return (
    <div style={{ textAlign: "center", marginTop: "64px" }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      {userId ? (
        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          color="primary"
        >
          Go to Home
        </Button>
      ) : (
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Home
        </Button>
      )}
    </div>
  );
};

export default NotFoundPage;
