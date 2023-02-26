import { Box, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloudIcon from "@mui/icons-material/Cloud";
import RemoveIcon from "@mui/icons-material/Remove";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { TodoContext } from "../../Context/TodoContext";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

const Sidebar = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);

  const context = useContext(TodoContext);

  const handleIsSidebarShown = () => {
    setIsSidebarShown(!isSidebarShown);
  };

  const Links = [
    { name: "Home", url: "", icon: (sx) => <HomeIcon sx={sx} /> },
    { name: "Taskify", url: "todo", icon: (sx) => <LibraryBooksIcon sx={sx} /> },
    { name: "Weatherscape", url: "weather", icon: (sx) => <CloudIcon sx={sx} /> },
    { name: "Chaos Canvas", url: "counter", icon: (sx) => <AspectRatioIcon sx={sx} /> },
    { name: "Example page 2", url: "2", icon: (sx) => <QuestionMarkIcon sx={sx} /> },
    { name: "Example page 3", url: "3", icon: (sx) => <QuestionMarkIcon sx={sx} /> },
  ];

  const RenderLinks = () => {
    return Links.map(({ name, url, icon }) => (
      <Tooltip title={isSidebarShown ? null : name} placement="right" arrow key={url}>
        <Link
          to={url}
          onClick={() => {
            context.setSelectedLink(url);
          }}>
          <Box
            sx={{
              position: "relative",
              padding: "0.5rem 0.5rem 0.5rem 0.25rem",
              borderBottom: "1px solid #E5DED9",
              display: "flex",
              "&:hover svg, &:hover p": {
                color: "#1976d2",
                transition: "all 0ms ease",
              },
            }}>
            {icon({
              color: url === context.selectedLink ? "#1976d2" : "#414141",
              position: "absolute",
              top: "25%",
              left: isSidebarShown ? "2rem" : "2rem",
              transform: "translateX(-50%) scale(1.3)",
              transition: "all 400ms ease",
              "& > span > svg": {
                transition: "all 200ms ease",
              },
            })}
            <Typography
              sx={{
                color: url === context.selectedLink ? "#1976d2" : "#414141",
                transition: "all 400ms ease",
                paddingLeft: "3.5rem",
                opacity: isSidebarShown ? "1" : "0",
                maxWidth: isSidebarShown ? "1000px" : "0px",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
              noWrap={true}>
              {name}
            </Typography>
          </Box>
        </Link>
      </Tooltip>
    ));
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        backgroundColor: "#F1EDEB",
        width: isSidebarShown ? "15rem" : "4rem",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        transition: "all 400ms ease",
      }}>
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

      {RenderLinks()}
    </Box>
  );
};

export default Sidebar;
