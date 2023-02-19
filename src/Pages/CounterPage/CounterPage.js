import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState, useRef, useEffect, useCallback } from "react";
import CustomSlider from "./CustomSlider";
import useColors from "./useColors";
import fadeInAnimation from "../../Components/fadeInAnimation";
import Canvas from "./Canvas";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const CounterPage = () => {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  const [minMaxBoxSizes, setMinMaxBoxSizes] = useState([0, 200]);
  const [randomBoxes, setRandomBoxes] = useState([]);
  const { randomColors, handleSetRandomColors } = useColors();
  const [showBorder, setshowBorder] = useState(true);
  const [showSettings, setShowSettings] = useState(true);

  const randomNumber = (minNumber, maxNumber) => {
    return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
  };

  const adjustCoordHandler = (size, position, axis, canvasRefCurrent) => {
    // equation to prevent overflowing randomBoxes from Canvas
    // the closer they spawn near side, the more it pushes them away from it
    // random boxes with position 100% will end up only touching border
    if (axis === "x") {
      return position - (size / (canvasRefCurrent.clientWidth / 100)) * (position / 100);
    }
    return position - (size / (canvasRefCurrent.clientHeight / 100)) * (position / 100);
  };

  const adjustAllCoordHandler = useCallback(() => {
    // this will apply adjustCoordHandler to every randomBox
    setRandomBoxes((prevRandomBoxes) => {
      return prevRandomBoxes.map((box) => {
        const adjustedX = adjustCoordHandler(box.size, box.x, "x", canvasRef.current);
        const adjustedY = adjustCoordHandler(box.size, box.y, "y", canvasRef.current);

        return {
          ...box,
          xUpdated: adjustedX,
          yUpdated: adjustedY,
        };
      });
    });
  }, [canvasRef, setRandomBoxes]);

  useEffect(() => {
    // fires adjustAllCoordHandler everytime size of canvas changes
    if (!canvasRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      adjustAllCoordHandler();
    });

    resizeObserver.observe(canvasRef.current);
    return () => resizeObserver.disconnect();
  }, [adjustAllCoordHandler, canvasRef]);

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
        id: Date.now().toString(36).padStart(8, "0"),
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
        border: [border1, border2, border3, border4, border5, border6, border7, border8],
      };
      return [...prevRandomBoxes, newBox];
    });
    adjustAllCoordHandler();
  };

  const deleteSingleRandomBoxHandler = (id) => {
    setCount((count) => count - 1);
    setRandomBoxes((prevRandomBoxes) => {
      const newRandomBoxes = prevRandomBoxes.filter((box) => box.id !== id);
      return newRandomBoxes;
    });
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

  const screenshotDownloadHandler = () => {
    setshowBorder(false);
  };

  useEffect(() => {
    // fires adjustAllCoordHandler everytime size of canvas changes
    if (showBorder) return;

    html2canvas(canvasRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "screenshot.png");
      });
    });
    setshowBorder(true);
  }, [showBorder]);

  const showSettingsHandler = () => {
    setShowSettings(!showSettings);
    console.log(showSettings);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F1EDEB",
        borderRadius: ".5rem",
        width: "auto",
        height: "100%",
        animation: `${fadeInAnimation} 400ms ease`,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        // overflowX: "scroll",
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
      <Box
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "2rem" }}>
        <Button onClick={decrementCounterHandler} sx={{ padding: ".5rem" }} variant="contained">
          -
        </Button>
        <Paper
          sx={{
            padding: "0 1rem",
            margin: "0 1rem",
            display: "grid",
            alignItems: "center",
          }}>
          <Typography>{count}</Typography>
        </Paper>
        <Button onClick={incrementCounterHandler} sx={{ padding: ".5rem" }} variant="contained">
          +
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Button onClick={resetHandler} variant="contained" sx={{ marginLeft: "1rem" }}>
          Reset
        </Button>
        <Button onClick={toggleAutoGenerate} variant="contained" sx={{ marginLeft: "1rem" }}>
          {autoGenerateRunning ? "Stop" : "Start"} Auto Generate
        </Button>
        <Button onClick={screenshotDownloadHandler} variant="contained" sx={{ marginLeft: "1rem" }}>
          Download Screenshot
        </Button>
        <Button onClick={showSettingsHandler} variant="contained" sx={{ marginLeft: "1rem" }}>
        {showSettings ? "Hide" : "Show"} settings
        </Button>
      </Box>
      <Grid
        container
        rowSpacing={3}
        sx={{
          margin: "0rem 0 2rem 0",
          transition: "all 300ms ease-in-out",
          maxHeight: showSettings ? "550px" : "0px",
          opacity: showSettings ? "1" : "0",
        }}>
        <Grid xs={12} xl={6} item>
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
        </Grid>
        <Grid xs={12} xl={6} item>
          <CustomSlider
            value={randomColors.r}
            label="Red"
            onChangeHandler={(event, newValue, activeThumb) =>
              handleSetRandomColors(event, newValue, activeThumb, "r")
            }
          />
        </Grid>
        <Grid xs={12} xl={6} item>
          <CustomSlider
            value={randomColors.g}
            label="Green"
            onChangeHandler={(event, newValue, activeThumb) =>
              handleSetRandomColors(event, newValue, activeThumb, "g")
            }
          />
        </Grid>
        <Grid xs={12} xl={6} item>
          <CustomSlider
            value={randomColors.b}
            label="Blue"
            onChangeHandler={(event, newValue, activeThumb) =>
              handleSetRandomColors(event, newValue, activeThumb, "b")
            }
          />
        </Grid>
      </Grid>

      <Canvas
        randomBoxes={randomBoxes}
        canvasRef={canvasRef}
        showBorder={showBorder}
        deleteSingleRandomBoxHandler={deleteSingleRandomBoxHandler}
      />
    </Box>
  );
};

export default CounterPage;
