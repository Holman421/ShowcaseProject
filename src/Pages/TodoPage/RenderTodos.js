import { Box, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext";
import SingleTodo from "./SingleTodo";

const RenderTodos = () => {
  const todoContext = useContext(TodoContext);

  const doneTodos = todoContext.todos.filter((todo) => todo.isDone === true);
  const unDoneTodos = todoContext.todos.filter((todo) => todo.isDone === false);

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
      <Paper elevation={3} sx={{ height:"auto", width: "40%", padding: "1rem", backgroundColor: "#ef5350", borderRadius: ".5em" }}>
        <Typography variant="h6" sx={{textAlign:"center"}}>Uncompleted tasks</Typography>
        {unDoneTodos.map((todo) => (
          <SingleTodo
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            isDone={todo.isDone}
            handleTodoIsDone={todoContext.handleTodoIsDone}></SingleTodo>
        ))}
      </Paper>
      <Paper elevation={3} sx={{height:"auto", width: "40%", padding: "1rem", backgroundColor: "#4caf50", borderRadius: ".5em" }}>
        <Typography variant="h6" sx={{textAlign:"center"}}>Completed tasks</Typography>

        {doneTodos.map((todo) => (
          <SingleTodo
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            isDone={todo.isDone}
            handleTodoIsDone={todoContext.handleTodoIsDone}></SingleTodo>
        ))}
      </Paper>
    </Box>
  );
};

export default RenderTodos;
