import React from "react";
import Home from "./pages/Home-version-1";

const App = () => {
  return (
    <div className="conatiner">
      <div className="form-control">
        <h2 className="text">Todo App with Typescript</h2>
        <div className="form">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default App;
