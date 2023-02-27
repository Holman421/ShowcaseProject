import { Box } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";

const TogglerIcon = (props) => {
  const { handleIsSidebarShown, isSidebarShown } = props;
  return (
    <Box
      onClick={handleIsSidebarShown}
      sx={{
        padding: "1.3rem 0 1.3rem 0",
        transition: "all 400ms ease",
        position: "relative",
        borderBottom: "1px solid #E5DED9",
        cursor: "pointer",
        boxShadow: "inset 0 1.95px 2.6px rgba(0, 0, 0, 0.15)",
        "&:hover svg": {
          color: "#1976d2",
          transition: "all 0ms ease",
        },
        "& > svg:nth-of-type(1)": {
          position: "absolute",
          right: isSidebarShown ? "10%" : "50%",
          top: isSidebarShown ? "50%" : "65%",

          transform: isSidebarShown
            ? "translate(50%, -50%) rotate(45deg) scaleX(1.7)"
            : "translate(50%, -50%) rotate(0)  scaleX(1.7)",
          transition: "transform 400ms ease, right 400ms ease, top 400ms ease",
        },
        "& > svg:nth-of-type(2)": {
          opacity: isSidebarShown ? "0" : "1",
          position: "absolute",
          right: isSidebarShown ? "10%" : "50%",

          top: "50%",
          transform: isSidebarShown
            ? "translate(50%, -50%)  scaleX(1.7)"
            : "translate(50%, -50%)  scaleX(1.7)",
          transition: "transform 400ms ease, opacity 400ms ease, right 400ms ease",
        },
        "& > svg:nth-of-type(3)": {
          transform: isSidebarShown
            ? "translate(50%, -50%) rotate(-45deg) scaleX(1.7)"
            : "translate(50%, -50%) rotate(0)  scaleX(1.7)",
          position: "absolute",
          right: isSidebarShown ? "10%" : "50%",
          top: isSidebarShown ? "50%" : "35%",
          transition: "transform 400ms ease, right 400ms ease, top 400ms ease",
        },
      }}>
      <RemoveIcon sx={{ transition: "all 400ms ease", color: "#414141" }} />
      <RemoveIcon sx={{ transition: "all 400ms ease", color: "#414141" }} />
      <RemoveIcon sx={{ transition: "all 400ms ease", color: "#414141" }} />
    </Box>
  );
};

export default TogglerIcon;
