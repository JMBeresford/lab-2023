import { useFrame, type Camera, Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import { damp } from "three/src/math/MathUtils.js";
import { World } from "./World";
import { Login } from "./Login";
import { ACESFilmicToneMapping } from "three";

function Camera() {
  const camRef = useRef<Camera>(null);

  useFrame(({ mouse }, delta) => {
    const mx = -mouse.x * 0.1;
    const my = -mouse.y * 0.1;

    if (camRef.current) {
      camRef.current.position.x = damp(camRef.current.position.x, 0 + mx, 2, delta);
      camRef.current.position.y = damp(camRef.current.position.y, 0.9 + my, 2, delta);
      camRef.current.position.z = damp(camRef.current.position.z, 1.5, 2, delta);
      camRef.current.lookAt(0, 0.75, 0);
    }
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0.95, 1.95, 2.5]} far={100} />;
}

export function Scene() {
  return (
    <Canvas gl={{ toneMapping: ACESFilmicToneMapping }}>
      <Login position={[0, 0.9, 0]} rotation={[0, 0, 0]} />
      <World />
      <Camera />
    </Canvas>
  );
}
