"use client";

import { Camera } from "./Camera";
// import { Bloom, EffectComposer, SMAA } from "@react-three/postprocessing";
import { Sky } from "./Sky";
import { Grid } from "./Grid";

export function HomeScene() {
  return (
    <>
      <Sky />
      <Grid />
      <Camera />
    </>
  );
}
