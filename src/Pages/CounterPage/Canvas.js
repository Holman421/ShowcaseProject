import { Box } from "@mui/material";
import React from "react";
import RandomBox from "./RandomBox";

const Canvas = (props) => {
  const { randomBoxes, canvasRef, deleteSingleRandomBoxHandler, showBorder } = props;
  return (
    <Box
      ref={canvasRef}
      sx={{
        // flex: "1 1 auto",
        minWidth: "200px",
        minHeight: "200px",
        // width: "calc(100% - 4rem)",
        resize: "both",
        overflow: "hidden",
        marginBottom: "2rem",
        backgroundColor: "white",
        position: "relative",
        boxSizing: "content-box",
        border: showBorder ? "2px solid #1976d2" : "none",
        borderRadius: showBorder ? ".5rem" : "0",
      }}>
      <Box
        sx={{
          top: "0px",
          left: "0px",
          height: "0px",
          width: "0px",
        }}>
        {randomBoxes.map((box) => {
          return (
            <RandomBox
              key={box.id}
              x={box.xUpdated}
              y={box.yUpdated}
              id={box.id}
              size={box.size}
              color={box.color}
              border={box.border}
              deleteSingleRandomBoxHandler={deleteSingleRandomBoxHandler}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Canvas;
