import { shaderMaterial, useTexture, Points } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { vertexShader, fragmentShader } from "./shaders/particles";
import particleMaskImg from "experiment-assets/s-rank-jutsu/particleMask.png";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points as PointsImpl,
  ShaderMaterial,
  Texture,
} from "three";
import { useControls } from "leva";
import { animated, useSpring } from "@react-spring/three";

const uniforms = {
  uTime: 0,
  uPower: 0,
  uMask: null,
  uSize: 1,
  uSpeed: 1,
  uDpr: 1,
  uInnerColor: new Color(),
  uOuterColor: new Color(),
};

const ParticleMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (mat) => {
  if (!mat) return;
  mat.transparent = true;
  mat.depthTest = false;
  mat.blending = AdditiveBlending;
});

extend({ ParticleMaterial });

type ParticlesProps = Partial<Record<keyof typeof uniforms, number | Color | string | Texture>>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    particleMaterial: JSX.IntrinsicElements["shaderMaterial"] & ParticlesProps;
  }
}

const AnimatedParticlesMaterial = animated("particleMaterial");

const Particles = ({ count = 2000, stage }: { count?: number; stage: number }) => {
  const ref = useRef<PointsImpl<BufferGeometry, ShaderMaterial & ParticlesProps>>(null);

  const maskTex = useTexture(particleMaskImg);

  const { viewport } = useThree();

  const { power } = useSpring({
    power: stage === 0 ? 0 : stage === 1 ? 0.25 : stage === 2 ? 0.5 : stage === 3 ? 0.75 : 1,
  });

  const { outerColor, innerColor, size, speed } = useControls(
    "Particles",
    {
      outerColor: { value: "#161c38" },
      innerColor: { value: "#7dacff" },
      size: { value: 50, min: 0, max: 50, step: 0.5 },
      speed: { value: 0.26, min: 0, max: 2, step: 0.01 },
    },
    {
      collapsed: true,
    },
  );

  const positions = useMemo(() => {
    const pos = [];

    for (let i = 0; i < count; i++) {
      let x = Math.random() * 2 - 1;
      let y = Math.random() * 2 - 1;
      let z = Math.random() * 2 - 1;

      const mag = 1 / Math.sqrt(x * x + y * y + z * z);

      x *= mag;
      y *= mag;
      z *= mag;

      pos.push(x, y, z);
    }

    return new Float32Array(pos);
  }, [count]);

  const offset = useMemo(() => {
    const off = [];

    for (let i = 0; i < count; i++) {
      off.push(Math.random() * 0.5 + 0.5);
    }

    return new Float32Array(off);
  }, [count]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.geometry.setAttribute("aOffset", new BufferAttribute(offset, 1));
  }, [offset]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // ref.current.material.uDelta = delta * 1000;
    ref.current.material.uTime = clock.elapsedTime + 100;
  });

  return (
    <>
      <Points ref={ref} positions={positions}>
        {/* @ts-expect-error false positive infinite depth error */}
        <AnimatedParticlesMaterial
          uMask={maskTex}
          uDpr={viewport.dpr}
          uSize={(size * viewport.height) / viewport.distance}
          uInnerColor={innerColor}
          uOuterColor={outerColor}
          uSpeed={speed}
          uPower={power}
        />
      </Points>
    </>
  );
};

export default Particles;
