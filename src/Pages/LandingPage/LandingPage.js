import { Typography, Box } from "@mui/material";
import React from "react";
import fadeInAnimation from "../../Components/fadeInAnimation";

const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F1EDEB",
        borderRadius: ".5rem",
        width: "auto",
        animation: `${fadeInAnimation} 400ms ease`,
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
