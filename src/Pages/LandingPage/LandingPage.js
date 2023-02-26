import { Typography, Box, Paper } from "@mui/material";
import React from "react";
import fadeInAnimation from "../../Components/fadeInAnimation";
import {defineElement} from "lord-icon-element";
import Lottie from "lottie-web";

defineElement(Lottie.loadAnimation);

const LandingPage = () => {
  const textColor = "#414141";
  return (
    <Box
      sx={{
        backgroundColor: "#F1EDEB",
        borderRadius: ".5rem",
        width: "auto",
        animation: `${fadeInAnimation} 400ms ease`,
        padding: "2rem 0 2rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}>
      <lord-icon
        src="https://cdn.lordicon.com/wcjauznf.json"
        trigger="hover"
        colors="primary:#121331,secondary:#08a88a"
        style={{ width: "50px", height: "150px" }}></lord-icon>

      <Typography variant="h5" color={textColor} sx={{ fontWeight: "bold" }}>
        Welcome to my portfolio
      </Typography>
      <Typography color={textColor}>
        On the left sidebar you can see a list of my showcase projects.
      </Typography>
      <Typography color={textColor}>About me section in progress !</Typography>
      <Paper
        sx={{
          marginTop: "2rem",
          padding: "2rem",
          width: "calc(100% - 2rem)",
        }}>
        <Typography
          variant="h6"
          color={textColor}
          sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          Taskify
        </Typography>
        <Typography color={textColor}>
          Todo app for adding and completing your plans and tasks.
        </Typography>
      </Paper>
      <Paper sx={{ marginTop: "2rem", padding: "2rem", width: "calc(100% - 2rem)" }}>
        <Typography
          variant="h6"
          color={textColor}
          sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          Weatherscape
        </Typography>
        <Typography color={textColor}>
          Weather app for displaying weather and temperature in desired town.
        </Typography>
      </Paper>
      <Paper sx={{ marginTop: "2rem", padding: "2rem", width: "calc(100% - 2rem)" }}>
        <Typography
          variant="h6"
          color={textColor}
          sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          Chaos Canvas
        </Typography>
        <Typography color={textColor}>
          At first simple react counter, but each value is represented with rendered element of
          random shape, color, size and position.
        </Typography>
        <Typography color={textColor} sx={{ margin: ".5rem 0" }}>
          All of these values are adjustable (click on the settings icon).
        </Typography>
        <Typography color={textColor}>
          Also whole canvas size is adjustable (drag bottom right corner) and elements within it are
          responsive (this was the most challenging part).
        </Typography>
      </Paper>
    </Box>
  );
};

export default LandingPage;
