import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { PerspectiveCamera as PerspectiveCameraProps } from "three";
import { damp } from "three/src/math/MathUtils";

export function Camera() {
  const ref = useRef<PerspectiveCameraProps>(undefined);

  useEffect(() => {
    ref.current.lookAt(0, 1.5, -5);
  }, []);

  useFrame(({ mouse }, dt) => {
    const x = mouse.x * 0.1;
    const y = 1.5 + mouse.y * 0.1;

    ref.current.position.x = damp(ref.current.position.x, x, 2, dt);
    ref.current.position.y = damp(ref.current.position.y, y, 2, dt);
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[0, 1.5, 0]} near={0.01} far={1000} />;
}
