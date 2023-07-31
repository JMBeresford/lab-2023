import { WasmBoy } from "wasmboy";

export const SCALE = 3;
// default config
const canvas = document.createElement("canvas");
canvas.width = 160 * SCALE;
canvas.height = 144 * SCALE;

await WasmBoy.config(
  {
    isAudioEnabled: true,
    gameboyFrameRate: 60,
    disablePauseOnHidden: true,
  },
  canvas,
);

await WasmBoy.disableDefaultJoypad();

export const Emulator = WasmBoy;
export type Emulator = typeof WasmBoy;
