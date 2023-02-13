import React, { useState } from "react";
import {useLocation } from "react-router-dom";

export const TodoContext = React.createContext({
  todo: null,
  setTodo: () => {},
  todos: null,
  setTodos: () => {},
  addTodo: () => {},
  handleTodoIsDone: () => {},
  selectedLink: null,
  setSelectedLink: () => {},
});

export const TodoContextProvider = (props) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedLink, setSelectedLink] = useState(useLocation().pathname.slice(1));

  const addTodo = (e) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleTodoIsDone = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        todos,
        setTodos,
        addTodo,
        handleTodoIsDone,
        selectedLink,
        setSelectedLink,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
};
