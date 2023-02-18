import { Box } from "@mui/material";
import React from "react";
import RandomBox from "./RandomBox";

const Canvas = (props) => {
   const { randomBoxes, canvasRef } = props;
   return (
      <Box
         ref={canvasRef}
         sx={{
            flex: "1 1 auto",
            minWidth: "200px",
            backgroundColor: "white",
            height: "500px",
            position: "relative",
            boxSizing: "content-box",
            margin: "0 1.5rem",
         }}
      >
         <Box
            sx={{
               top: "0px",
               left: "0px",
               height: "0px",
               width: "0px",
            }}
         >
            {randomBoxes.map((box, index) => {
               return (
                  <RandomBox
                     key={index}
                     x={box.xUpdated}
                     y={box.yUpdated}
                     size={box.size}
                     color={box.color}
                     border={box.border}
                  />
               );
            })}
         </Box>
      </Box>
   );
};

export default Canvas;
