import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CustomSlider = (props) => {
   const {
      value,
      max = 250,
      onChangeHandler,
      label,
      step = 25,
      marks = [
         { value: 0, label: "0" },
         { value: 25, label: "25" },
         { value: 50, label: "50" },
         { value: 75, label: "75" },
         { value: 100, label: "100" },
         { value: 125, label: "125" },
         { value: 150, label: "150" },
         { value: 175, label: "175" },
         { value: 200, label: "200" },
         { value: 225, label: "225" },
         { value: 250, label: "250" },
      ],
   } = props;
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".5rem",
         }}
      >
         <Typography sx={{ fontSize: "1.25rem",color: "#414141", }}>{label}</Typography>
         <Slider
            // orientation="vertical"
            getAriaLabel={() => "Minimum distance shift"}
            value={value}
            step={step}
            marks={marks}
            min={0}
            max={max}
            onChange={onChangeHandler}
            valueLabelDisplay="auto"
            disableSwap
            sx={{
               width: "calc(100% - 6rem)",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               justifyContent: "center",
            }}
         />
      </Box>
   );
};

export default CustomSlider;