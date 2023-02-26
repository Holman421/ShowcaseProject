import { Box, Tooltip } from "@mui/material";
import React from "react";
import RandomBox from "./RandomBox";
import DownloadIcon from "@mui/icons-material/Download";

const Canvas = (props) => {
  const {
    randomBoxes,
    canvasRef,
    deleteSingleRandomBoxHandler,
    showBorder,
    screenshotDownloadHandler,
  } = props;
  return (
    <Tooltip title="Click & hold right there and resize your canvas" arrow placement="right-end">
      <Box
        ref={canvasRef}
        sx={{
          width: "27.5rem",
          minWidth: "200px",
          minHeight: "200px",
          maxWidth: "95% !important",
          resize: "both",
          overflow: "hidden",
          marginBottom: "2rem",
          backgroundColor: "white",
          position: "relative",
          boxSizing: "content-box",
          border: showBorder ? "2px solid #1976d2" : "none",
          borderRadius: showBorder ? ".5rem" : "0",
          "&::-webkit-resizer": {
            content: '""',
            borderStyle: "solid",
            borderWidth: "0 0 18px 18px",
            borderColor: "transparent transparent #1976d2 transparent",
            position: "absolute",
            bottom: "-18px",
            right: "-18px",
            cursor: "nwse-resize",
          },
        }}>
        <Tooltip title={"Download screenshot"} placement="top" arrow>
          <DownloadIcon
            onClick={screenshotDownloadHandler}
            color="primary"
            sx={{
              position: "absolute",
              right: "1px",
              top: "3px",
              cursor: "pointer",
              fontSize: "1.6rem",
            }}></DownloadIcon>
        </Tooltip>
        {/* <Box
          sx={{
            top: "0px",
            left: "0px",
            height: "0px",
            width: "0px",
          }}> */}
          {randomBoxes.map((box) => {
            return (
              <RandomBox
                key={box.id}
                box={box}
                deleteSingleRandomBoxHandler={deleteSingleRandomBoxHandler}
              />
            );
          })}
        {/* </Box> */}
      </Box>
    </Tooltip>
  );
};

export default Canvas;
