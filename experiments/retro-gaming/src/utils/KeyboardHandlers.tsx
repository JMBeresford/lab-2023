import { KeyboardControls as KeyboardControlsImpl, useKeyboardControls } from "@react-three/drei";
import { useStore } from "../store";
import { ReactNode, useEffect } from "react";
import { WasmBoyJoypadState } from "wasmboy";

export type Controls = keyof WasmBoyJoypadState | "MENU";

function HandleMenuPress() {
  const [sub] = useKeyboardControls<Controls>();

  useEffect(() => {
    return sub(
      (state) => state.MENU,
      (pressed) => {
        if (pressed) {
          useStore.setState((prev) => ({ ...prev, menuOpen: !prev.menuOpen }));
        }
      },
    );
  }, [sub]);

  return null;
}

export function KeyboardControls(props: { children: ReactNode }) {
  const keymap = useStore((s) => s.keymap);

  return (
    <KeyboardControlsImpl map={keymap}>
      {props.children}
      <HandleMenuPress />
    </KeyboardControlsImpl>
  );
}
