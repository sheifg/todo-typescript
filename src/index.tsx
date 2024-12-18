import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TodoProvider } from "./context/TodoContext";
// import reportWebVitals from './reportWebVitals';

// When it is used "as" keyboard is a garanty for typescript
// Here it is being tried to access the root element from index.html
// If it doesn't exist, it will throw an error
// It is needed to be sure that in the html file it is had a div with this id
// Now it is needed to gurantee that it exists to TypeScript
// To gurantee that it is needed to use as keyword
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TodoProvider>
    <App />
  </TodoProvider>
);

// If it is wanted to start measuring performance in the app, pass a function to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
