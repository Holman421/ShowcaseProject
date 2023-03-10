import { Box } from "@mui/system";
import React from "react";

const RandomBox = (props) => {
  const { box, deleteSingleRandomBoxHandler } = props;
  const { id, xUpdated, yUpdated, size, color, border, transitionLength } = box;
  return (
    <Box
      onClick={() => {
        deleteSingleRandomBoxHandler(id);
      }}
      key={id}
      sx={{
        position: "absolute",
        left: `${xUpdated}%`,
        top: `${yUpdated}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        transition: `all ${transitionLength}ms ease, transform 30s ease-out, box-shadow 0.2s ease-out`,
        ":hover": {
          transform: "scale(1.1) rotate(1000deg)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
          cursor: "pointer",
        },
        borderRadius: `${border[0]}% ${border[1]}% ${border[2]}% ${border[3]}% / ${border[4]}% ${border[5]}% ${border[6]}% ${border[7]}%`,
        backfaceVisibility: "hidden",
      }}></Box>
  );
};

export default RandomBox;
