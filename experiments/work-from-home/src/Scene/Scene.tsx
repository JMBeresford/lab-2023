import { Office } from "./Office";
import { Suspense } from "react";
import { Camera } from "./Camera";
import { Canvas } from "@react-three/fiber";

export function Scene() {
  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.setClearColor("black");
      }}
    >
      <mesh>
        <sphereGeometry args={[20, 5, 5]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <Suspense fallback={null}>
        <Office />
      </Suspense>

      <Camera />
    </Canvas>
  );
}
