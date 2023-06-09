"use client";

import { Camera } from "./Camera";
import { EffectComposer, SMAA } from "@react-three/postprocessing";
import { Sky } from "./Sky";
import { Grid } from "./Grid";
import { Particles } from "./Particles";
import { Suspense } from "react";
import { Reticle } from "./Reticle";
import { Music } from "./Music";
import { usePathname } from "next/navigation";
import { HoverSound } from "./HoverSound";

export function HomeScene() {
  const path = usePathname();

  return (
    <>
      <Suspense fallback={null}>
        <Music />
        <HoverSound />
      </Suspense>

      {[`/`, `/experiments`].includes(path) && (
        <>
          <Sky />
          <Particles />
          <Grid />
          <Reticle />
          <Camera />

          <Suspense fallback={null}>
            <EffectComposer disableNormalPass multisampling={0}>
              <SMAA />
            </EffectComposer>
          </Suspense>
        </>
      )}
    </>
  );
}
