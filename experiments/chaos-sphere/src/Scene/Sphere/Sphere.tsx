import { animated, useSpring } from "@react-spring/three";
import { SphereMaterial, SphereMaterialProps } from "./shader";
import { useEffect, useRef } from "react";
import { BufferGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useLighting } from "../useLighting";

export function Sphere() {
  const ref = useRef<Mesh<BufferGeometry, SphereMaterialProps>>(null);

  const resolution = 300;

  const { scale } = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [1, 1, 1] },
  });

  const { amplitude, detail, speed, dimensionality } = useControls(
    "Sphere",
    {
      amplitude: {
        value: 0.3,
        min: 0,
        max: 1,
        step: 0.05,
      },
      detail: {
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.05,
      },
      speed: {
        value: 0.9,
        min: 0,
        max: 2,
        step: 0.1,
      },
      dimensionality: {
        value: 2,
        min: 0,
        max: 3,
        step: 1,
      },
    },
    { collapsed: true },
  );

  const { light1Intensity, light2Intensity, light1Color, light2Color, highlightColor } =
    useLighting();

  useEffect(() => {
    ref.current?.geometry.computeTangents();
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.material.uTime =
      (clock.elapsedTime * 0.25 * speed) / Math.max(dimensionality - 1, 1.0);
  });

  return (
    <animated.mesh ref={ref} scale={scale as unknown as [number, number, number]} renderOrder={2}>
      <sphereGeometry args={[3, resolution, resolution]} />
      <SphereMaterial
        uAmp={amplitude / Math.max(dimensionality - 1, 1.0)}
        uDetail={(detail * 0.25) / Math.max(dimensionality - 1, 1.0)}
        uResolution={[resolution, resolution]}
        uColor={"#656565"}
        uFresnelColor={highlightColor}
        uLight2Color={light2Color}
        uLight1Color={light1Color}
        uFbmOctaves={dimensionality}
        uLightIntensity={[light1Intensity, light2Intensity]}
      />
    </animated.mesh>
  );
}
