import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { TodoContext } from "../../Context/TodoContext";

import { defineElement } from "lord-icon-element";
import Lottie from "lottie-web";
import TogglerIcon from "./TogglerIcon";
import CustomLink from "./CustomLink";
defineElement(Lottie.loadAnimation);

const Sidebar = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);

  const context = useContext(TodoContext);

  const handleIsSidebarShown = () => {
    setIsSidebarShown(!isSidebarShown);
  };

  const Links = [
    { name: "Home", url: "", iconURL: "https://cdn.lordicon.com/gmzxduhd.json" },
    { name: "Taskify", url: "todo", iconURL: "https://cdn.lordicon.com/puvaffet.json" },
    { name: "Weatherscape", url: "weather", iconURL: "https://cdn.lordicon.com/wcjauznf.json" },
    { name: "Chaos Canvas", url: "counter", iconURL: "https://cdn.lordicon.com/jvucoldz.json" },
    { name: "Example page 2", url: "2", iconURL: "https://cdn.lordicon.com/sbiheqdr.json" },
    { name: "Example page 3", url: "3", iconURL: "https://cdn.lordicon.com/sbiheqdr.json" },
  ];

  const RenderLinks = () => {
    return Links.map(({ name, url, iconURL }) => (
      <CustomLink
        key={url}
        name={name}
        url={url}
        iconURL={iconURL}
        isSidebarShown={isSidebarShown}
        setSelectedLink={context.setSelectedLink}
        selectedLink={context.selectedLink}
      />
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
      <TogglerIcon handleIsSidebarShown={handleIsSidebarShown} isSidebarShown={isSidebarShown} />

      {RenderLinks()}
    </Box>
  );
};

export default Sidebar;