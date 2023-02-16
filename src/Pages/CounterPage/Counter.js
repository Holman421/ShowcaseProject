import { Box, Button, keyframes, Paper, Slider, Typography } from "@mui/material";
import React, { useState } from "react";

const render = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const Counter = () => {
  const [count, setCount] = useState(0);
  const [randomBoxes, setRandomBoxes] = useState([]);

  const randomNumber = (maxNumber, minNumber) => {
    return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
  };

  const [randomColors, setRandomColors] = useState({
    r: 255,
    g: 255,
    b: 255,
  });

  const setRandomColorsHandler = (color, value) => {
    setRandomColors((prevState) => ({
      ...prevState,
      [color]: value,
    }));
  };

  const randomBoxesMaxSize = 75;
  const canvasSize = 500;

  const incrementCounterHandler = () => {
    setCount(count + 1);

    setRandomBoxes([
      ...randomBoxes,
      {
        x: randomNumber(canvasSize, 0),
        y: randomNumber(canvasSize, 0),
        size: randomNumber(randomBoxesMaxSize, 10),
        color: {
          r: randomNumber(randomColors.r, 0),
          g: randomNumber(randomColors.g, 0),
          b: randomNumber(randomColors.b, 0),
        },
      },
    ]);
  };

  const decrementCounterHandler = () => {
    if (count > 0) {
      setCount(count - 1);
      const updatedRandomBoxes = [...randomBoxes];
      updatedRandomBoxes.pop();
      setRandomBoxes(updatedRandomBoxes);
    }
  };

  const positionHandler = (size, position) => {
    if (size + position > canvasSize) {
      return position - size;
    }
    return position;
  };

  const resetHandler = () => {
    setRandomBoxes([]);
    setCount(0);
    setRandomColors({
      r: 255,
      g: 255,
      b: 255,
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F1EDEB",
        borderRadius: ".5rem",
        width: "auto",
        animation: `${render} 400ms ease`,
        paddingBottom: "3rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <Typography
        variant="h4"
        sx={{
          padding: "2rem 0 2rem 0",
          fontWeight: "bold",
          color: "#414141",
          textAlign: "center",
        }}>
        Counter
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button onClick={incrementCounterHandler} sx={{ padding: ".5rem" }} variant="contained">
          +
        </Button>
        <Paper sx={{ padding: "0 1rem", margin: "0 1rem", display: "grid", alignItems: "center" }}>
          <Typography>{count}</Typography>
        </Paper>
        <Button onClick={decrementCounterHandler} sx={{ padding: ".5rem" }} variant="contained">
          -
        </Button>
      </Box>
      <Button onClick={resetHandler} sx={{ margin: "2rem" }} variant="contained">
        Reset
      </Button>
      <Typography>Red</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={255}
        value={randomColors.r}
        step={10}
        marks
        min={0}
        max={255}
        sx={{ width: "500px" }}
        valueLabelDisplay="auto"
        onChange={(e) => {
          setRandomColorsHandler("r", e.target.value);
        }}
      />
      <Typography>Green</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={255}
        value={randomColors.g}
        step={10}
        marks
        min={0}
        max={255}
        sx={{ width: "500px" }}
        valueLabelDisplay="auto"
        onChange={(e) => {
          setRandomColorsHandler("g", e.target.value);
        }}
      />
      <Typography>Blue</Typography>
      <Slider
        aria-label="Small steps"
        defaultValue={255}
        value={randomColors.b}
        step={10}
        marks
        min={0}
        max={255}
        sx={{ width: "500px", marginBottom: "1rem" }}
        valueLabelDisplay="auto"
        onChange={(e) => {
          setRandomColorsHandler("b", e.target.value);
        }}
      />
      <Box
        sx={{
          width: "500px",
          backgroundColor: "white",
          height: "500px",
          position: "relative",
          boxSizing: "content-box",
        }}>
        <Box sx={{ position: "absolute", top: "0px", left: "0px", height: "0px", width: "0px" }}>
          {randomBoxes.map((box, index) => {
            return (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  left: `${positionHandler(box.size, box.x)}px`,
                  top: `${positionHandler(box.size, box.y)}px`,
                  width: box.size,
                  height: box.size,
                  backgroundColor: `rgb(${box.color.r}, ${box.color.g}, ${box.color.b})`,
                }}></Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Counter;
