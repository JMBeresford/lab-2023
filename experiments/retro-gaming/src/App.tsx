import { Scene } from "./Scene";
import "./App.css";
import { Leva } from "leva";
import { Menu } from "./components/Menu";
import { KeyboardControls } from "./utils/KeyboardHandlers";
import { Header } from "./components/Header";
import { About } from "./components/About";

export function Experiment() {
  return (
    <KeyboardControls>
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        <Header />
        <Menu />
        <About />
        <Scene />

        <Leva collapsed={true} hidden={!window.location.hash.includes("debug")} />
      </div>
    </KeyboardControls>
  );
}
