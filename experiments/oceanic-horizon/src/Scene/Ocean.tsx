import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { vertexShader, fragmentShader } from "./shaders/Ocean";
import { BufferGeometry, Mesh, ShaderMaterial } from "three";

const OceanMaterial = shaderMaterial({ uTime: 0 }, vertexShader, fragmentShader);

extend({ OceanMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    oceanMaterial: JSX.IntrinsicElements["shaderMaterial"];
  }
}

const Ocean = () => {
  const ref = useRef<Mesh<BufferGeometry, ShaderMaterial & { uTime: number }>>(null);

  useFrame(({ clock }) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uTime = clock.elapsedTime;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} scale={[1.1, 1.1, 1.1]}>
      <planeGeometry args={[100, 100, 30, 30]} />
      <oceanMaterial />
    </mesh>
  );
};

export default Ocean;
