import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, PerspectiveCamera as PerspectiveCameraType } from "three";
import { damp } from "three/src/math/MathUtils";

export function Camera() {
  const ref = useRef<PerspectiveCameraType>(null);
  const outerRef = useRef<Group>(null);

  useFrame(({ mouse }, delta) => {
    if (!ref.current || !outerRef.current) return;

    // outerRef.current.rotation.y = clock.elapsedTime * 0.1;

    ref.current.position.x = damp(ref.current.position.x, -mouse.x, 4, delta);
    ref.current.position.y = damp(ref.current.position.y, -mouse.y, 4, delta);

    ref.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={outerRef}>
      <PerspectiveCamera ref={ref} near={0.0001} far={100} position={[0, 0, 5]} makeDefault />
    </group>
  );
}
