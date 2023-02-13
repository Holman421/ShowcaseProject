import { Paper, Typography } from "@mui/material";
import React from "react";

const Town = ({ name, temp, weather }) => {
  return (
    <Paper elevation={3} sx={{ width: "21.5rem", borderRadius: ".5rem" }}>
      <Typography sx={{ margin: "1.5rem" }} variant="h5">
        {name}
      </Typography>
      <Typography sx={{ margin: "1.5rem" }}>{temp + " °C"}</Typography>
      <Typography sx={{ margin: "1.5rem" }}>{weather}</Typography>
    </Paper>
  );
};

export default Town;
