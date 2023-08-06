import { Mesh, BufferGeometry } from "three";
import { useRef } from "react";
import { SkyMaterial, SkyMaterialProps } from "./shader";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export function Sky() {
  const ref = useRef<Mesh<BufferGeometry, SkyMaterialProps>>(null);

  const { color1, color2 } = useControls("sky", {
    color1: "#2a0048",
    color2: "#660050",
  });

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <sphereGeometry args={[50, 32, 32]} />
      <SkyMaterial
        uColor1={parseInt(color1.slice(1, 7), 16)}
        uColor2={parseInt(color2.slice(1, 7), 16)}
      />
    </mesh>
  );
}
