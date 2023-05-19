import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { damp } from "three/src/math/MathUtils";
import { useMaxWidth } from "../hooks/useMaxWidth";
import font from "experiment-assets/fonts/MontserratLight.ttf";

export function HeroText() {
  const headerRef = useRef<Mesh<BufferGeometry, Material>>(null);
  const maxWidth = useMaxWidth();
  const size = useThree((s) => s.size);

  useFrame((_, delta) => {
    if (headerRef.current) {
      headerRef.current.material.opacity = damp(headerRef.current.material.opacity, 0.8, 1, delta);
    }
  });

  return (
    <>
      <group position={[-maxWidth / 2, -1.65, 0]} rotation-y={0}>
        <Text
          ref={headerRef}
          maxWidth={maxWidth}
          font={font}
          fontSize={size.width > 768 ? 0.6 : 0.4}
          anchorX="left"
          anchorY="bottom"
        >
          METABALLS
          <meshBasicMaterial color={"white"} opacity={0} />
        </Text>
      </group>
    </>
  );
}
