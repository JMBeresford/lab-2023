import { Scene } from "./Scene";
import "./App.css";
import { Leva } from "leva";
import { Menu } from "./components/Menu";
import { KeyboardControls } from "./utils/KeyboardHandlers";
import { Header } from "./components/Header";
import { About } from "./components/About";
import { Tooltip } from "./components/Tooltip";

export function Experiment() {
  return (
    <KeyboardControls>
      <div
        className="jb-retro-gaming"
        style={{ height: "100%", width: "100%", position: "relative", fontSize: "20px" }}
      >
        <Header />
        <Menu />
        <About />
        <Tooltip />
        <Scene />

        <Leva collapsed={true} hidden={!window.location.hash.includes("debug")} />
      </div>
    </KeyboardControls>
  );
}
