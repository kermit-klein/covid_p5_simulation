import React from "react";
import "./App.css";
import Sketch from "react-p5";
import { setup, draw } from "./modules/sketch";

function App() {
  return (
    <div className="App">
      <Sketch></Sketch>
    </div>
  );
}

export default App;
