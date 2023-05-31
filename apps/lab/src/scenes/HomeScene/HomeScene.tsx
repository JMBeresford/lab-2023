"use client";

import { Camera } from "./Camera";
import { Bloom, EffectComposer, SMAA } from "@react-three/postprocessing";
import { Sky } from "./Sky";
import { Grid } from "./Grid";

export function HomeScene() {
  return (
    <>
      <Sky />
      <Grid />

      <EffectComposer disableNormalPass multisampling={0}>
        {/* <SMAA /> */}
      </EffectComposer>
      <Camera />
    </>
  );
}
