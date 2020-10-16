import React from "react";
import "./App.css";
import Sketch from "react-p5";
import { setup, draw,preload } from "./modules/sketch";

function App() {
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} preload={preload}></Sketch>
    </div>
  );
}

export default App;
