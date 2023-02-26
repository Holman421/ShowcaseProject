import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import fadeInAnimation from "../../Components/fadeInAnimation";
import useFetch from "../../CustomHooks/useFetch";
import Town from "./Town";

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
        animation: `${fadeInAnimation} 400ms ease`,
      }}>
      <Typography
        variant="h4"
        sx={{
          padding: "2rem 0 2rem 0",
          fontWeight: "bold",
          color: "#414141",
          textAlign: "center",
        }}>
        Weatherscape
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
