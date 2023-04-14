import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Paper } from "@mui/material";
import theme from "../theme";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  return (
    <Container maxWidth="xs">
      <Paper
        style={{
          margin: theme.spacing(1, 0),
        }}
      >
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </Paper>
    </Container>
  );
};

export default MyCalendar;
