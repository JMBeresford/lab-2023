import React from "react";
import ReactDOM from "react-dom/client";
import { Experiment } from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Experiment />
  </React.StrictMode>,
);
