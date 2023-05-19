import { Canvas, extend } from "@react-three/fiber";
import { Metaballs } from "./Metaballs";
import { Camera } from "./Camera";
import { World } from "./World";
import { Suspense } from "react";
import { CineonToneMapping } from "three";
import { SMAAPass } from "three-stdlib";
import { EffectComposer, SMAA, Vignette } from "@react-three/postprocessing";
import { HeroText } from "./HeroText";

extend({ SMAAPass });

export function Scene() {
  return (
    <Canvas gl={{ antialias: false, toneMapping: CineonToneMapping }} dpr={[1, 1.5]}>
      <World />
      <Camera />
      <HeroText />

      <Suspense fallback={null}>
        <Metaballs />
        <EffectComposer multisampling={0} disableNormalPass>
          <SMAA />
          <Vignette offset={0.4} darkness={0.5} eskil={true} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
