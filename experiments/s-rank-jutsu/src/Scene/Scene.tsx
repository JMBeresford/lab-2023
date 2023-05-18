import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import Floor from "./Floor";
import Rasengan from "./Rasengan";
import { Canvas, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { useEffect } from "react";

function Fog() {
  const gl = useThree((s) => s.gl);

  const { fogColor } = useControls(
    "Scene",
    {
      fogColor: { value: "#131317" },
    },
    { collapsed: true },
  );

  useEffect(() => {
    gl.setClearColor(fogColor);
  }, [fogColor, gl]);

  return <fog attach="fog" args={[fogColor, 1, 17]} />;
}

export function Scene() {
  return (
    <Canvas gl={{ toneMapping: ACESFilmicToneMapping }}>
      <Fog />

      <Rasengan />
      <Floor />
      <ambientLight intensity={0.25} />

      <PerspectiveCamera makeDefault={true} position={[0, 0, 4.5]} />

      <OrbitControls
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.075}
        maxDistance={5}
        minDistance={2}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
