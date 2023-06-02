"use client";

import { Camera } from "./Camera";
import { Autofocus, EffectComposer, Glitch, SMAA } from "@react-three/postprocessing";
import { Sky } from "./Sky";
import { Grid } from "./Grid";
import { Particles } from "./Particles";
import { Suspense, useState } from "react";
import { Vector2 } from "three";

export function HomeScene() {
  const [glitch, setGlitch] = useState(true);

  return (
    <>
      <Sky />
      <Particles />
      <Grid />
      <Camera />

      <Suspense fallback={null}>
        <EffectComposer disableNormalPass multisampling={0}>
          <SMAA />
        </EffectComposer>
      </Suspense>
    </>
  );
}
