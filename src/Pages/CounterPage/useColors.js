import { useState } from "react";

const useColors = () => {
  const [randomColors, setRandomColors] = useState({
    r: [0, 255],
    g: [0, 255],
    b: [0, 255],
  });
  const minDistanceSliderColors = 15;
  const handleSetRandomColors = (event, newValue, activeThumb, color) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistanceSliderColors) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 255 - minDistanceSliderColors);
        setRandomColors((prevState) => ({
          ...prevState,
          [color]: [clamped, clamped + minDistanceSliderColors],
        }));
      } else {
        const clamped = Math.max(newValue[1], minDistanceSliderColors);
        setRandomColors((prevState) => ({
          ...prevState,
          [color]: [clamped - minDistanceSliderColors, clamped],
        }));
      }
    } else {
      setRandomColors((prevState) => ({
        ...prevState,
        [color]: newValue,
      }));
    }
  };
  return { randomColors, handleSetRandomColors };
};

export default useColors;
