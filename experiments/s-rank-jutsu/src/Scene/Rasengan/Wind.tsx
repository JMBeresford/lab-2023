import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DoubleSide,
  Mesh,
  ShaderMaterial,
  Vector3,
} from "three";
import { vertexShader, fragmentShader } from "./shaders/wind";
import { animated, useSpring } from "@react-spring/three";

const uniforms = {
  uTime: 0,
  uOpacity: 0,
  uNoiseScale: 1,
  uNoiseSize: 1,
  uOuterRadius: 1,
  uInnerRadius: 1,
  uCurveColor1: new Color(1, 1, 1),
  uCurveColor2: new Color(1, 1, 1),
  uStretch: new Vector3(1, 1, 1),
};

const WindMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (mat) => {
  if (!mat) return;
  mat.transparent = true;
  mat.side = DoubleSide;
  mat.depthWrite = false;
  // mat.blending = AdditiveBlending;
});

extend({ WindMaterial });

type WindProps = Partial<
  Record<keyof typeof uniforms, number | Color | Vector3 | string | [number, number, number]>
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    windMaterial: JSX.IntrinsicElements["shaderMaterial"] & WindProps;
  }
}

const AnimWindMaterial = animated("windMaterial");

const Wind = ({ stage }: { stage: number }) => {
  const ref = useRef<Mesh<BufferGeometry, ShaderMaterial & WindProps>>(null);

  const { windScale, windSize, outerRadius, innerRadius, windColor1, windColor2, windStretch } =
    useControls(
      "Wind",
      {
        windScale: { value: 0.49, min: 0, max: 1, step: 0.01 },
        windSize: { value: 0.4, min: 0, max: 1, step: 0.01 },
        outerRadius: { value: 3.34, min: 0, max: 5, step: 0.01 },
        innerRadius: { value: 1.38, min: 0, max: 5, step: 0.01 },
        windColor1: { value: "#ffffff" },
        windColor2: { value: "#ffffff" },
        windStretch: {
          value: [0.15, 2, 0.15],
        },
      },
      { collapsed: true },
    );

  const { opacity } = useSpring({
    opacity: stage === 4 ? 1 : 0,
  });

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <group renderOrder={2}>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, 0]} renderOrder={1}>
        <ringGeometry args={[innerRadius, outerRadius, 64, 64]} />
        {/* @ts-expect-error false positive infinite depth error */}
        <AnimWindMaterial
          uNoiseScale={windScale}
          uNoiseSize={windSize}
          uOuterRadius={outerRadius}
          uInnerRadius={innerRadius}
          uCurveColor1={windColor1}
          uCurveColor2={windColor2}
          uStretch={windStretch}
          uOpacity={opacity}
        />
      </mesh>
    </group>
  );
};

export default Wind;
