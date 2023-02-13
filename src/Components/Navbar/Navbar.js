import React from "react";
import { Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      sx={{
        height: "4rem",
        width: "100%",
        backgroundColor: "#F1EDEB",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        zIndex: "10",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
      <Typography variant="h5" sx={{ padding: "2rem", fontWeight: "bold", color: "#414141" }}>
        Showcase project for Agnostix
      </Typography>
      <Typography variant="h5" sx={{ padding: "2rem", fontWeight: "bold", color: "#414141" }}>
        By Aleš Holman
      </Typography>
    </Box>
  );
};

export default Navbar;
