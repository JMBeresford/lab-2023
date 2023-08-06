import { useRef } from "react";
import { GridMaterial, GridMaterialProps } from "./shader";
import { BufferGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export function Grid() {
  const ref = useRef<Mesh<BufferGeometry, GridMaterialProps>>(null);

  const { color } = useControls("grid", {
    color: "#9d52fe",
  });

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} scale={100}>
      <planeGeometry args={[1, 1]} />
      <GridMaterial uColor={parseInt(color.slice(1, 7), 16)} />
    </mesh>
  );
}
