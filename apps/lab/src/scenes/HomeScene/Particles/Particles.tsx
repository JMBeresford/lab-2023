import { Points, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import { randFloat } from "three/src/math/MathUtils";
import particleMaskImg from "experiment-assets/images/particleMask.png";
import { ParticlesMaterial, ParticlesMaterialProps } from "./shader";
import { BufferAttribute, BufferGeometry, Points as PointsImpl } from "three";
import { useFrame } from "@react-three/fiber";

const BOX_WIDTH = 10;

export function Particles() {
  const ref = useRef<PointsImpl<BufferGeometry, ParticlesMaterialProps>>(undefined);
  const maskTex = useTexture(particleMaskImg as unknown as string);

  const { count } = useControls({
    count: { value: 750, min: 500, max: 3000, step: 100 },
  });

  const positions = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      const x = randFloat(-BOX_WIDTH, BOX_WIDTH);
      const y = randFloat(0, BOX_WIDTH);
      const z = -100;

      arr.push(x, y, z);
    }

    return new Float32Array(arr);
  }, [count]);

  const endPositions = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      const x = randFloat(-BOX_WIDTH, BOX_WIDTH);
      const y = randFloat(0, BOX_WIDTH);
      const z = 1;

      arr.push(x, y, z);
    }

    return new BufferAttribute(new Float32Array(arr), 3);
  }, [count]);

  useEffect(() => {
    ref.current.geometry.setAttribute("aPositionEnd", endPositions);
  }, [endPositions]);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime + 1000;
  });

  return (
    <Points ref={ref} limit={count} range={count} positions={positions}>
      <ParticlesMaterial uMask={maskTex} />
    </Points>
  );
}
