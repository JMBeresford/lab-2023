import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { Emulator } from "../utils/Emulator";
import { KeyboardControlsEntry } from "@react-three/drei";
import { Controls } from "../utils/KeyboardHandlers";

type Actions = {
  setRom: (rom: Uint8Array | File | string, fileName?: string) => void;
  pauseGame: () => Promise<void>;
  resumeGame: () => Promise<void>;
  setSpeed: (speed: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setAudioCallback: () => Promise<void>;
  setOnFrameFinished: (callback: (imgData: Uint8ClampedArray) => void) => Promise<void>;
  backHome: (ctx?: Store["uiContext"]) => void;
};

export type Store = {
  readonly emulator: Emulator;
  menuOpen: boolean;
  aboutOpen: boolean;
  colors: {
    shell: string;
    buttons: string;
    bezel: string;
    cartridge: string;
    floor: string;
  };
  volume: number;
  muted: boolean;
  gainNode?: GainNode;
  emulatorSpeed: number;
  insertedCart?: number;
  uiContext: "idle" | "game" | "paused" | "customizing";
  keymap: KeyboardControlsEntry<Controls>[];
} & Actions;

const PersistedKeys: readonly Partial<keyof Store>[] = [
  "colors",
  "volume",
  "muted",
  "emulatorSpeed",
  "keymap",
] as const;
type PersistedKeys = typeof PersistedKeys[keyof typeof PersistedKeys];

export const useStore = create<Store>()(
  subscribeWithSelector(
    persist(
      (_set, _get) => {
        return {
          emulator: Emulator,
          menuOpen: false,
          aboutOpen: false,
          colors: {
            shell: "#5E629C",
            buttons: "#B94C1D",
            bezel: "#350D3A",
            cartridge: "#798389",
            floor: "#ACB4DC",
          },
          volume: 0.5,
          muted: false,
          emulatorSpeed: 1,
          gainNode: undefined,
          insertedCart: undefined,
          uiContext: "idle",
          keymap: [
            { name: "LEFT", keys: ["ArrowLeft"] },
            { name: "RIGHT", keys: ["ArrowRight"] },
            { name: "UP", keys: ["ArrowUp"] },
            { name: "DOWN", keys: ["ArrowDown"] },
            { name: "A", keys: ["KeyX"] },
            { name: "B", keys: ["KeyZ"] },
            { name: "START", keys: ["Enter"] },
            { name: "SELECT", keys: ["ShiftRight"] },
            { name: "MENU", keys: ["Escape"] },
          ],
          setRom: async (rom: Uint8Array | File | string, fileName?: string) => {
            const { emulator: emu, emulatorSpeed, setAudioCallback } = _get();
            await setAudioCallback();
            await emu.loadROM(rom, { fileName });
            await emu.disableDefaultJoypad();
            await emu.play();
            await emu.resumeAudioContext();
            await emu.setSpeed(emulatorSpeed);
            _set({ uiContext: "game" });
          },
          setSpeed: async (speed: number) => {
            const { emulator: emu } = _get();
            await emu.setSpeed(speed);
            _set({ emulatorSpeed: speed });
          },
          setVolume: (volume: number) => {
            _set({ volume });
          },
          setMuted: (muted: boolean) => {
            _set({ muted });
          },
          setAudioCallback: async () => {
            const { emulator: emu } = _get();
            const config = await emu.getConfig();
            const canvas = await emu.getCanvas();

            await emu.config(
              {
                ...config,
                updateAudioCallback: (ctx, sourceNode) => {
                  const { muted, volume } = _get();
                  if (!_get().gainNode) {
                    _set({ gainNode: ctx.createGain() });
                  }
                  const gainNode = _get().gainNode;
                  if (!gainNode) return;
                  gainNode.gain.value = muted ? 0 : volume * 0.2;
                  sourceNode.connect(gainNode);
                  return gainNode;
                },
              },
              canvas,
            );
          },
          setOnFrameFinished: async (callback) => {
            const emu = _get().emulator;
            const config = await emu.getConfig();
            const canvas = await emu.getCanvas();
            await emu.config({ ...config, updateGraphicsCallback: callback }, canvas);
            await emu.play();
          },
          pauseGame: async () => {
            const emu = _get().emulator;
            await emu.pause();
            _set({ uiContext: "paused" });
          },
          resumeGame: async () => {
            const { uiContext, emulator: emu } = _get();
            if (uiContext !== "paused" || !emu.isPaused()) return;
            await emu.play();
            _set({ uiContext: "game" });
          },
          backHome: (ctx?: Store["uiContext"]) => {
            const { emulator: emu } = _get();
            if (emu.isPlaying()) emu.pause();

            if (ctx != undefined) {
              _set({ uiContext: ctx });
            }
            _set({ menuOpen: false, aboutOpen: false });
          },
        };
      },
      {
        name: "jberesford-retro-gaming",
        version: 18,
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) =>
              PersistedKeys.includes(key as keyof PersistedKeys),
            ),
          ),
      },
    ),
  ),
);
