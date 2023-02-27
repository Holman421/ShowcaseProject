import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CustomLink = (props) => {
  const { name, url, iconURL, isSidebarShown, setSelectedLink, selectedLink } = props;
  const [isRunning, setIsRunning] = useState(false);
  const LinkRef = useRef(null);

  useEffect(() => {
    function handleMouseIn() {
      setIsRunning(true);
    }
    function handleMouseOut() {
      setIsRunning(false);
    }

    if (LinkRef.current) {
      LinkRef.current.addEventListener("mouseover", handleMouseIn);
      LinkRef.current.addEventListener("mouseout", handleMouseOut);
    }
  }, [LinkRef.current]);

  return (
    <Tooltip title={isSidebarShown ? null : name} placement="right" arrow key={url}>
      <Link
        to={url}
        onClick={() => {
          setSelectedLink(url);
        }}>
        <Box
          ref={LinkRef}
          sx={{
            position: "relative",
            padding: "0.75rem 0.5rem 0.75rem 0.25rem",
            borderBottom: "1px solid #E5DED9",
            display: "flex",
            "&:hover svg, &:hover p": {
              color: "#1976d2",
              transition: "all 0ms ease",
            },
          }}>
          <Box sx={{ position: "absolute", top: "0%" }}>
            <lord-icon
              src={iconURL}
              trigger={isRunning ? "loop" : ""}
              colors={
                url === selectedLink
                  ? "primary:#1976d2,secondary:#1976d2"
                  : isRunning
                  ? "primary:#1976d2,secondary:#1976d2"
                  : "primary:#121331,secondary:#000000"
              }
              style={{ width: "50px", height: "50px" }}
            />
          </Box>
          <Typography
            sx={{
              color: url === selectedLink ? "#1976d2" : "#414141",
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
  );
};

export default CustomLink;
