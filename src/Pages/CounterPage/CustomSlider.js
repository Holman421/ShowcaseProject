import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CustomSlider = (props) => {
   const {
      value,
      max = 255,
      onChangeHandler,
      label,
      step = 15,
      marks = [
         { value: 0, label: "0" },
         { value: 15, label: "15" },
         { value: 30, label: "30" },
         { value: 45, label: "45" },
         { value: 60, label: "60" },
         { value: 75, label: "75" },
         { value: 90, label: "90" },
         { value: 105, label: "105" },
         { value: 120, label: "120" },
         { value: 135, label: "135" },
         { value: 150, label: "150" },
         { value: 165, label: "165" },
         { value: 180, label: "180" },
         { value: 195, label: "195" },
         { value: 210, label: "210" },
         { value: 225, label: "225" },
         { value: 240, label: "240" },
         { value: 255, label: "255" },
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