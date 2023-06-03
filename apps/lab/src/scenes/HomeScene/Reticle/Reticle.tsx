import { useFrame, useThree } from "@react-three/fiber";
import { ReticleMaterial, ReticleMaterialProps } from "./shader";
import { useRef } from "react";
import { BufferGeometry, Mesh } from "three";
import { damp } from "three/src/math/MathUtils";

export function Reticle() {
  const ref = useRef<Mesh<BufferGeometry, ReticleMaterialProps>>(undefined);
  const { width, height } = useThree((state) => state.size);

  useFrame(({ mouse, clock, size }, dt) => {
    const mx = ((mouse.x + 1.0) / 2) * width;
    const my = ((mouse.y + 1.0) / 2) * height;

    ref.current.material.uniforms.uMouse.value.x = damp(
      ref.current.material.uniforms.uMouse.value.x,
      mx,
      8,
      dt,
    );
    ref.current.material.uniforms.uMouse.value.y = damp(
      ref.current.material.uniforms.uMouse.value.y,
      my,
      8,
      dt,
    );
  });

  return (
    <mesh ref={ref} position-z={-1}>
      <planeGeometry args={[2, 2]} />
      <ReticleMaterial uResolution={[width, height]} />
    </mesh>
  );
}
