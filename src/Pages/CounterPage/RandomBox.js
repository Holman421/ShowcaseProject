import { Box } from "@mui/system";
import React from "react";

const RandomBox = (props) => {
   const { x, y, size, color, border } = props;

   const showInfo = () => {
      console.log(props);
   };
   return (
      <Box
         onClick={showInfo}
         sx={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            transition: "transform 30s ease-out, box-shadow 0.2s ease-out",
            ":hover": {
               transform: "scale(1.1) rotate(1000deg)",
               boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
            },
            borderRadius: `${border[0]}% ${border[1]}% ${border[2]}% ${border[3]}% / ${border[4]}% ${border[5]}% ${border[6]}% ${border[7]}%`,
            // borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
         }}
      ></Box>
   );
};

export default RandomBox;
