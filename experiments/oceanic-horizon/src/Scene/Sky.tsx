import { shaderMaterial, useDetectGPU } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { vertexShader, fragmentShader } from "./shaders/Sky";
import { BackSide, BufferGeometry, Mesh, ShaderMaterial } from "three";

type Uniforms = {
  uTime?: number;
  uFbmOctaves?: number;
};

const uniforms: Uniforms = { uTime: 0, uFbmOctaves: 0 };

const SkyMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (mat) => {
  if (mat) mat.side = BackSide;
});

extend({ SkyMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    skyMaterial: JSX.IntrinsicElements["shaderMaterial"] & Uniforms;
  }
}

const Sky = () => {
  const ref = useRef<Mesh<BufferGeometry, ShaderMaterial & Uniforms>>(null);

  const { gl } = useThree();

  const GPU = useDetectGPU({ glContext: gl.getContext() });

  useEffect(() => {
    if (!ref.current) return;
    switch (GPU.tier) {
      case 3: {
        ref.current.material.uniforms.uFbmOctaves.value = 6;
        break;
      }
      case 2: {
        ref.current.material.uniforms.uFbmOctaves.value = 3;
        break;
      }
      case 1: {
        ref.current.material.uniforms.uFbmOctaves.value = 2;
        break;
      }
      default: {
        ref.current.material.uniforms.uFbmOctaves.value = 1;
        break;
      }
    }
  }, [GPU]);

  useFrame(({ clock }) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uTime = clock.elapsedTime * 0.75;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[50, 20, 20]} />
      <skyMaterial />
    </mesh>
  );
};

export default Sky;
