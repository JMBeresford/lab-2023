/// <reference types="vite/client" />

declare module "*.glsl" {
  const value: string;
  export default value;
}

declare module "wasmboy" {
  type WasmBoyOptions = {
    headless: boolean;
    useGbcWhenOptional: boolean;
    disablePauseOnHidden: boolean;
    isAudioEnabled: boolean;
    frameSkip: number;
    audioBatchProcessing: boolean;
    timersBatchProcessing: boolean;
    audioAccumulateSamples: boolean;
    graphicsBatchProcessing: boolean;
    graphicsDisableScanlineRendering: boolean;
    tileRendering: boolean;
    tileCaching: boolean;
    gameboyFrameRate: number;
    updateGraphicsCallback: (imgData: Uint8ClampedArray) => void;
    updateAudioCallback: (ctx: AudioContext, sourceNode: AudioBufferSourceNode) => void;
    saveStateCallback: (saveState: SaveState) => void;
    onReady: boolean;
    onPlay: boolean;
    onPause: boolean;
    onLoadedAndStarted: boolean;
  };

  export type WasmBoyJoypadState = {
    UP: boolean;
    RIGHT: boolean;
    DOWN: boolean;
    LEFT: boolean;
    A: boolean;
    B: boolean;
    SELECT: boolean;
    START: boolean;
  };

  interface ResponsiveGamepadState {
    A: boolean;
    B: boolean;
    DOWN: boolean;
    DPAD_DOWN: boolean;
    DPAD_LEFT: boolean;
    DPAD_RIGHT: boolean;
    DPAD_UP: boolean;
    LEFT: boolean;
    LEFT_ANALOG_DOWN: boolean;
    LEFT_ANALOG_HORIZONTAL_AXIS: number;
    LEFT_ANALOG_LEFT: boolean;
    LEFT_ANALOG_RIGHT: boolean;
    LEFT_ANALOG_UP: boolean;
    LEFT_ANALOG_VERTICAL_AXIS: number;
    LEFT_BUMPER: boolean;
    LEFT_TRIGGER: boolean;
    RIGHT: boolean;
    RIGHT_ANALOG_DOWN: boolean;
    RIGHT_ANALOG_HORIZONTAL_AXIS: number;
    RIGHT_ANALOG_LEFT: boolean;
    RIGHT_ANALOG_RIGHT: boolean;
    RIGHT_ANALOG_UP: boolean;
    RIGHT_ANALOG_VERTICAL_AXIS: number;
    RIGHT_BUMPER: boolean;
    RIGHT_TRIGGER: boolean;
    SELECT: boolean;
    SPECIAL: boolean;
    START: boolean;
    UP: boolean;
    X: boolean;
    Y: boolean;
  }

  type SaveState = {
    wasmBoyMemory: {
      wasmBoyInternalState: [];
      wasmBoyPaletteMemory: [];
      gameBoyMemory: [];
      cartridgeRam: [];
    };
    date: unknown;
    isAuto: boolean;
  };

  export const WasmBoy: {
    config: (options: Partial<WasmBoyOptions>, canvas?: HTMLCanvasElement) => Promise<void>;
    getConfig: () => Promise<WasmBoyOptions>;
    getCanvas: () => Promise<HTMLCanvasElement>;
    loadROM: (
      rom: Uint8Array | File | string,
      opts?: { headers?: Headers; fileName?: string },
    ) => Promise<void>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    reset: () => Promise<void>;
    isReady: () => boolean;
    isPlaying: () => boolean;
    isPaused: () => boolean;
    isLoadedAndStarted: () => boolean;
    setSpeed: (speed: number) => Promise<void>;
    disableDefaultJoypad: () => Promise<void>;
    enableDefaultJoypad: () => Promise<void>;
    setJoypadState: (state: WasmBoyJoypadState) => void;
    resumeAudioContext: () => Promise<void>;
    ResponsiveGamepad: {
      getState: () => ResponsiveGamepadState;
      isEnabled: () => boolean;
      _enabled: boolean;
    };
  };
}
