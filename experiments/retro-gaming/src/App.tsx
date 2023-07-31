import { Scene } from "./Scene";
import "./App.css";
import { Leva } from "leva";
import { Menu } from "./components/Menu";
import { KeyboardControls } from "./utils/KeyboardHandlers";
import { Header } from "./components/Header";

export function Experiment() {
  return (
    <KeyboardControls>
      <div style={{ height: "100dvh", width: "100dvw" }}>
        <Header />
        <Menu />
        <Scene />

        <Leva collapsed={true} hidden={!window.location.hash.includes("debug")} />
      </div>
    </KeyboardControls>
  );
}
