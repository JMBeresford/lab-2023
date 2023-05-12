import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Sky } from "./Sky";
import { ACESFilmicToneMapping } from "three";
import { Platform } from "./Platform";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export function Scene() {
  return (
    <Canvas gl={{ toneMapping: ACESFilmicToneMapping }}>
      <Sky />
      <Platform />

      <PerspectiveCamera makeDefault position={[0, 5, 30.5]} />
      <OrbitControls
        target={[0, 3, 0]}
        maxDistance={50}
        minDistance={10}
        enablePan={false}
        enableDamping={true}
      />

      <EffectComposer multisampling={8}>
        {/* @ts-expect-error broken lib types */}
        <Bloom intensity={0.85} smoothing={0.9} threshold={0.3} height={200} />
      </EffectComposer>
    </Canvas>
  );
}
