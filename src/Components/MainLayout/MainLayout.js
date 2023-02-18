import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const MainLayout = (props) => {
  return (
    <Grid container sx={{ height: "calc(100vh - 4rem)"}}>
      <Grid item>
        <Sidebar></Sidebar>
      </Grid>
      <Grid item xs>
        <Box sx={{padding:"1rem"}}>{props.children}</Box>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
