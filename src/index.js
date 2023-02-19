import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { TodoContextProvider } from "./Context/TodoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </HashRouter>
);
