import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import CustomSlider from "./CustomSlider";
import useColors from "./useColors";
import fadeInAnimation from "../../Components/fadeInAnimation";
import Canvas from "./Canvas";

const CounterPage = () => {
   const canvasRef = useRef(null);
   const [count, setCount] = useState(0);
   const [minMaxBoxSizes, setMinMaxBoxSizes] = useState([0, 200]);
   const [randomBoxes, setRandomBoxes] = useState([]);
   const { randomColors, handleSetRandomColors } = useColors();

   const randomNumber = (minNumber, maxNumber) => {
      return Math.floor(
         Math.random() * (maxNumber + 1 - minNumber) + minNumber
      );
   };

   const adjustCoordHandler = (size, position, axis, canvasRefCurrent) => {
      // equation to prevent overflowing randomBoxes from Canvas
      // the closer they spawn near side, the more it pushes them away from it
      // random boxes with position 100% will end up only touching border
      if (axis === "x") {
         return (
            position -
            (size / (canvasRefCurrent.clientWidth / 100)) * (position / 100)
         );
      }
      return (
         position -
         (size / (canvasRefCurrent.clientHeight / 100)) * (position / 100)
      );
   };

   const adjustAllCoordHandler = () => {
      // this will apply adjustCoordHandler to every randomBox
      setRandomBoxes((randomBoxes) => {
         return randomBoxes.map((box) => {
            const adjustedX = adjustCoordHandler(
               box.size,
               box.x,
               "x",
               canvasRef.current
            );
            const adjustedY = adjustCoordHandler(
               box.size,
               box.y,
               "y",
               canvasRef.current
            );

            return {
               ...box,
               xUpdated: adjustedX,
               yUpdated: adjustedY,
            };
         });
      });
   };

   useEffect(() => {
      // fires adjustAllCoordHandler everytime size of canvas changes
      if (!canvasRef.current) return;
      const resizeObserver = new ResizeObserver(() => {
         adjustAllCoordHandler();
      });
      resizeObserver.observe(canvasRef.current);
      return () => resizeObserver.disconnect();
   }, []);

   const minDistanceSliderBoxes = 20;
   const handlesetMinMaxBoxSizes = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
         return;
      }

      if (newValue[1] - newValue[0] < minDistanceSliderBoxes) {
         if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 200 - minDistanceSliderBoxes);
            setMinMaxBoxSizes([clamped, clamped + minDistanceSliderBoxes]);
         } else {
            const clamped = Math.max(newValue[1], minDistanceSliderBoxes);
            setMinMaxBoxSizes([clamped - minDistanceSliderBoxes, clamped]);
         }
      } else {
         setMinMaxBoxSizes(newValue);
      }
   };

   const incrementCounterHandler = () => {
      setCount((count) => count + 1);

      setRandomBoxes((prevRandomBoxes) => {
         const xCoord = randomNumber(0, 100);
         const yCoord = randomNumber(0, 100);
         const border1 = randomNumber(20, 80);
         const border2 = 100 - border1;
         const border4 = randomNumber(20, 80);
         const border3 = 100 - border4;
         const border5 = randomNumber(20, 80);
         const border6 = randomNumber(20, 80);
         const border7 = 100 - border6;
         const border8 = 100 - border5;

         const newBox = {
            x: xCoord,
            xUpdated: xCoord,
            y: yCoord,
            yUpdated: yCoord,
            size: randomNumber(minMaxBoxSizes[0], minMaxBoxSizes[1]),
            color: {
               r: randomNumber(randomColors.r[0], randomColors.r[1]),
               g: randomNumber(randomColors.g[0], randomColors.g[1]),
               b: randomNumber(randomColors.b[0], randomColors.b[1]),
            },
            border: [
               border1,
               border2,
               border3,
               border4,
               border5,
               border6,
               border7,
               border8,
            ],
         };
         return [...prevRandomBoxes, newBox];
      });
      adjustAllCoordHandler();
   };

   const [autoGenerateRunning, setAutoGenerateRunning] = useState(false);
   const intervalRef = useRef(null);

   const autoGenerateHandler = () => {
      incrementCounterHandler();
      const intervalId = setInterval(() => {
         incrementCounterHandler();
      }, 225);

      intervalRef.current = intervalId;
   };

   const toggleAutoGenerate = () => {
      if (autoGenerateRunning) {
         clearInterval(intervalRef.current);
         setAutoGenerateRunning(false);
      } else {
         autoGenerateHandler();
         setAutoGenerateRunning(true);
      }
   };

   const decrementCounterHandler = () => {
      if (count > 0) {
         setCount(count - 1);
         const updatedRandomBoxes = [...randomBoxes];
         updatedRandomBoxes.pop();
         setRandomBoxes(updatedRandomBoxes);
      }
   };

   const resetHandler = () => {
      setRandomBoxes([]);
      setCount(0);
   };

   return (
      <Box
         sx={{
            backgroundColor: "#F1EDEB",
            borderRadius: ".5rem",
            width: "auto",
            animation: `${fadeInAnimation} 400ms ease`,
            paddingBottom: "3rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
         }}
      >
         <Typography
            variant="h4"
            sx={{
               padding: "2rem 0 2rem 0",
               fontWeight: "bold",
               color: "#414141",
               textAlign: "center",
            }}
         >
            Counter
         </Typography>
         <Box sx={{ display: "flex", marginBottom: "2.5rem" }}>
            <Button
               onClick={decrementCounterHandler}
               sx={{ padding: ".5rem" }}
               variant="contained"
            >
               -
            </Button>
            <Paper
               sx={{
                  padding: "0 1rem",
                  margin: "0 1rem",
                  display: "grid",
                  alignItems: "center",
               }}
            >
               <Typography>{count}</Typography>
            </Paper>
            <Button
               onClick={incrementCounterHandler}
               sx={{ padding: ".5rem" }}
               variant="contained"
            >
               +
            </Button>
            <Button
               onClick={resetHandler}
               variant="contained"
               sx={{ marginLeft: "1rem" }}
            >
               Reset
            </Button>
            <Button
               onClick={toggleAutoGenerate}
               variant="contained"
               sx={{ marginLeft: "1rem" }}
            >
               {autoGenerateRunning ? "Stop" : "Start"} Auto Generate
            </Button>
         </Box>
         <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Divider orientation="vertical" flexItem variant="middle" />
            <CustomSlider
               value={minMaxBoxSizes}
               max={200}
               label="Size"
               step={20}
               marks={[
                  { value: 0, label: "0px" },
                  { value: 20, label: "20px" },
                  { value: 40, label: "40px" },
                  { value: 60, label: "60px" },
                  { value: 80, label: "80px" },
                  { value: 100, label: "100px" },
                  { value: 120, label: "120px" },
                  { value: 140, label: "140px" },
                  { value: 160, label: "160px" },
                  { value: 180, label: "180px" },
                  { value: 200, label: "200px" },
               ]}
               onChangeHandler={(event, newValue, activeThumb) =>
                  handlesetMinMaxBoxSizes(event, newValue, activeThumb)
               }
            />
            <Divider orientation="vertical" flexItem variant="middle" />
            <CustomSlider
               value={randomColors.r}
               label="Red"
               onChangeHandler={(event, newValue, activeThumb) =>
                  handleSetRandomColors(event, newValue, activeThumb, "r")
               }
            />
            <Divider orientation="vertical" flexItem variant="middle" />
            <CustomSlider
               value={randomColors.g}
               label="Green"
               onChangeHandler={(event, newValue, activeThumb) =>
                  handleSetRandomColors(event, newValue, activeThumb, "g")
               }
            />
            <Divider orientation="vertical" flexItem variant="middle" />
            <CustomSlider
               value={randomColors.b}
               label="Blue"
               onChangeHandler={(event, newValue, activeThumb) =>
                  handleSetRandomColors(event, newValue, activeThumb, "b")
               }
            />
            <Divider orientation="vertical" flexItem variant="middle" />

            <Canvas randomBoxes={randomBoxes} canvasRef={canvasRef} />
         </Box>
      </Box>
   );
};

export default CounterPage;
