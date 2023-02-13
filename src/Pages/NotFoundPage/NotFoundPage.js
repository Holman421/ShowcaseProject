import { Box, Typography, Button, keyframes } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../Context/TodoContext";

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

const NotFoundPage = () => {
  let navigate = useNavigate();

  const context = useContext(TodoContext);

  const redirectHome = () => {
    context.setSelectedLink("");
    navigate("");
  };

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
        Not found page
      </Typography>

      <Button onClick={redirectHome} variant="contained">
        Got to home
      </Button>
    </Box>
  );
};

export default NotFoundPage;