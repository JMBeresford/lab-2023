import { useControls } from "leva";

export function useLighting() {
  return useControls(
    "Lighting",
    {
      light1Intensity: {
        value: 0.4,
        min: 0,
        max: 1,
        step: 0.01,
      },
      light2Intensity: {
        value: 0.4,
        min: 0,
        max: 1,
        step: 0.01,
      },
      light1Color: "#d600ff",
      light2Color: "#00f5ff",
      highlightColor: "#ffffff",
    },
    { collapsed: true },
  );
}
