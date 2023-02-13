import { Button, Paper, Typography } from "@mui/material";

const SingleTodo = ({ todo, isDone, id, handleTodoIsDone }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "white",
        borderRadius: "0.25rem",
        margin: "1rem 0 1rem 0",
        padding: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Typography>{todo}</Typography>
      <Button
        variant="outlined"
        color={isDone ? "error" : "success"}
        onClick={() => handleTodoIsDone(id)}>
        {isDone ? "Undone" : "Done"}
      </Button>
    </Paper>
  );
};

export default SingleTodo;
