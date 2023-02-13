import { Box, Button, CircularProgress, TextField, Typography, keyframes } from "@mui/material";
import React, { useState } from "react";
import useFetch from "../../CustomHooks/useFetch";
import Town from "./Town";

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

const WeatherPage = () => {
  const [town, setTown] = useState("");

  const { sendRequest, data, loading } = useFetch(
    process.env.REACT_APP_WeatherURL1 + town + process.env.REACT_APP_WeatherURL2
  );

  return (
    <Box
      sx={{
        backgroundColor: "#F1EDEB",
        borderRadius: ".5rem",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "3rem",
        animation: `${render} 400ms ease`,
      }}>
      <Typography
        variant="h4"
        sx={{
          padding: "4rem 0 2rem 0",
          fontWeight: "bold",
          color: "#414141",
          textAlign: "center",
        }}>
        Weather App
      </Typography>
      <form onSubmit={sendRequest}>
        <Box sx={{ display: "flex", marginBottom: data ? "3rem" : "0" }}>
          <TextField
            label="Enter a town"
            variant="outlined"
            value={town}
            onChange={(e) => {
              setTown(e.target.value);
            }}
            sx={{ width: "15rem", marginRight: "1rem" }}
          />
          <Button variant="contained" onClick={sendRequest}>
            Submit
          </Button>
        </Box>
      </form>
      {loading ? <CircularProgress></CircularProgress> : null}
      {data && data.cod !== "404" ? (
        <Town name={data?.name} temp={data?.main?.temp} weather={data?.weather[0]?.main}></Town>
      ) : null}
      {data?.cod === "404" ? <Typography>Wrong town name entered</Typography> : null}
    </Box>
  );
};

export default WeatherPage;
