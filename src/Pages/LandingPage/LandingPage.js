import { Typography, Box, keyframes } from "@mui/material";
import React from "react";

const render = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F1EDEB",
        borderRadius: ".5rem",
        width: "auto",
        animation: `${render} 400ms ease`,
        paddingBottom: "3rem"
      }}>
      <Typography variant="h5" sx={{ padding: "2rem", fontWeight: "bold", color: "#414141" }}>
        Welcome to my showcase project
      </Typography>
      <Typography sx={{ paddingLeft: "2rem", fontWeight: "bold", color: "#414141" }}>
        Here I want to show you two of my short projects that I made over weekend
      </Typography>
      <Typography sx={{ paddingLeft: "2rem", fontWeight: "bold", color: "#414141" }}>
        Todo and Weather App
      </Typography>
    </Box>
  );
};

export default LandingPage;
