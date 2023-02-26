import { Box, Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import CustomSlider from "./CustomSlider";
import useColors from "./useColors";
import fadeInAnimation from "../../Components/fadeInAnimation";
import Canvas from "./Canvas";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import TuneIcon from '@mui/icons-material/Tune';

const CounterPage = () => {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  const [minMaxBoxSizes, setMinMaxBoxSizes] = useState([5, 200]);
  const [randomBoxes, setRandomBoxes] = useState([]);
  const { randomColors, handleSetRandomColors } = useColors();

  const randomNumber = useMemo(
    () => (minNumber, maxNumber) => {
      return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
    },
    []
  );

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
    setRandomBoxes((prevRandomBoxes) => {
      return prevRandomBoxes.map((box) => {
        const adjustedX = adjustCoordHandler(box.size, box.x, "x", canvasRef.current);
        const adjustedY = adjustCoordHandler(box.size, box.y, "y", canvasRef.current);
        return Object.assign({}, box, { xUpdated: adjustedX, yUpdated: adjustedY });
      });
    });
  }, [canvasRef, setRandomBoxes]);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          console.log("This ran");
          adjustAllCoordHandler();
        }, 50);
      });
    });
    resizeObserver.observe(canvasRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [adjustAllCoordHandler]);

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
        transitionLength: randomNumber(200, 5000),
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
  const decrementCounterHandler = () => {
    if (count > 0) {
      setCount(count - 1);
      const updatedRandomBoxes = [...randomBoxes];
      updatedRandomBoxes.pop();
      setRandomBoxes(updatedRandomBoxes);
    }
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
    }, 150);

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

  const [showBorder, setshowBorder] = useState(true);
  const screenshotDownloadHandler = () => {
    setshowBorder(false);
  };
  useEffect(() => {
    if (showBorder) return;

    html2canvas(canvasRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "screenshot.png";
      link.click();
    });
    setshowBorder(true);
  }, [showBorder]);

  const [showSettings, setShowSettings] = useState(false);
  const showSettingsHandler = () => {
    setShowSettings(!showSettings);
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
        Chaos Canvas
      </Typography>
      <Box
        sx={{
          padding: "2rem",
          backgroundColor: "#F1EDEB",
          marginBottom: "2rem",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          borderRadius: ".5rem",
          width: showSettings ? "95%" : "0",
          minWidth: "27.5rem",
          transition: "all 500ms ease",
          position: "relative",
        }}>
        <Tooltip
          title={showSettings ? "Hide settings" : "Show settings"}
          placement="top"
          arrow>
          <TuneIcon
            onClick={showSettingsHandler}
            color="primary"
            sx={{
              fontSize: "1.75rem",
              position: "absolute",
              right: "6px",
              bottom: "6px",
              cursor: "pointer",
            }}
          />
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "2rem",
          }}>
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: showSettings ? "0" : "-1rem",
          }}>
          <Button onClick={toggleAutoGenerate} variant="contained" sx={{ marginLeft: "1rem" }}>
            {autoGenerateRunning ? "Stop" : "Start"} Auto Generate
          </Button>
          <Button onClick={resetHandler} variant="contained" sx={{ marginLeft: "1rem" }}>
            Reset
          </Button>
        </Box>
        <Grid
          container
          rowSpacing={3}
          sx={{
            margin: "auto",
            width: "90%",
            paddingBottom: "1rem",
            transition: "all 300ms ease",
            maxHeight: showSettings ? "500px" : "0px",
            // display: showSettings ? "block" : "none",
            opacity: showSettings ? "1" : "0",
            visibility: showSettings ? "visible" : "hidden",
          }}>
          <Grid xs={12} xl={6} item>
            <CustomSlider
              value={minMaxBoxSizes}
              max={200}
              label="Size"
              step={20}
              marks={[
                { value: 0, label: "0px" },
                { value: 20, label: "20" },
                { value: 40, label: "40" },
                { value: 60, label: "60" },
                { value: 80, label: "80" },
                { value: 100, label: "100" },
                { value: 120, label: "120" },
                { value: 140, label: "140" },
                { value: 160, label: "160" },
                { value: 180, label: "180" },
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
      </Box>

      <Canvas
        randomBoxes={randomBoxes}
        canvasRef={canvasRef}
        showBorder={showBorder}
        screenshotDownloadHandler={screenshotDownloadHandler}
        deleteSingleRandomBoxHandler={deleteSingleRandomBoxHandler}
      />
    </Box>
  );
};

export default CounterPage;
