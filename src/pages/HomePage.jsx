import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const GreenStudentHub = () => {
  return (
    <Box sx={{ textAlign: "center", padding: "50px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ textAlign: "center", mb: 4 }}
          >
            Welcome to <br /> <span style={{ color: "green" }}> Green</span>{" "}
            Student Hub!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Typography
                variant="body1"
                component="p"
                sx={{ textAlign: "center" }}
              >
                We are a community of students and educators dedicated to
                promoting sustainability and environmental stewardship in
                schools and universities across the world.
              </Typography>
            </Grid>
            <Grid>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button>Register Now!</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GreenStudentHub;
