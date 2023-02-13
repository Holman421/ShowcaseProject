import { Box, Button, keyframes, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext";
import RenderTodos from "./RenderTodos";

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

const TodoPage = () => {
  const todoContext = useContext(TodoContext);

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
        animation: `${render} 400ms ease`
      }}>
      <Typography
        variant="h4"
        sx={{
          padding: "4rem 0 2rem 0",
          fontWeight: "bold",
          color: "#414141",
          textAlign: "center",
        }}>
        Todo App
      </Typography>
      <form onSubmit={todoContext.addTodo}>
        <Box sx={{ display: "flex", marginBottom: "4rem" }}>
          <TextField
            label="Enter a task"
            variant="outlined"
            value={todoContext.todo}
            onChange={(e) => {
              todoContext.setTodo(e.target.value);
            }}
            sx={{ width: "15rem", marginRight: "1rem" }}
          />
          <Button variant="contained" onClick={todoContext.addTodo}>
            Submit
          </Button>
        </Box>
      </form>

      <RenderTodos />
    </Box>
  );
};

export default TodoPage;
