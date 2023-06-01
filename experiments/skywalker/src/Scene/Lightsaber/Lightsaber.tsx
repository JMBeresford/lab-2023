/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useEffect, useRef, useState } from "react";
import { PositionalAudio, shaderMaterial, useCursor, useGLTF } from "@react-three/drei";
import model from "experiment-assets/skywalker/lightsaber_luke.glb?url";
import { vertexShader, fragmentShader } from "./shaders/saber";
import { extend, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  Color,
  Group,
  PointLight,
  PositionalAudio as PositionalAudioProps,
} from "three";
import { useSpring, animated } from "@react-spring/three";
import { damp } from "three/src/math/MathUtils";
import OnSound from "experiment-assets/skywalker/sounds/on.mp3";
import OffSound from "experiment-assets/skywalker/sounds/off.mp3";
import HumSound from "experiment-assets/skywalker/sounds/hum.mp3";
import { useControls } from "leva";
// import Glow from "./Glow";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    lightMetal: THREE.Mesh;
    dark_metal: THREE.Mesh;
    copper: THREE.Mesh;
    blade: THREE.Mesh;
  };
  materials: {
    ["base metal"]: THREE.MeshPhysicalMaterial;
    ["dark metal"]: THREE.MeshStandardMaterial;
    copper: THREE.MeshStandardMaterial;
    saber: THREE.MeshStandardMaterial;
  };
};

const uniforms = { uColor: new Color() };

type SaberProps = Partial<Record<keyof typeof uniforms, number | Color | string>>;

const SaberMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (m) => {
  if (!m) return;
  // m.depthTest = false;
  m.transparent = true;
  m.toneMapped = true;
  m.blending = AdditiveBlending;
});

extend({ SaberMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    saberMaterial: SaberProps;
  }
}

export const Lightsaber = () => {
  const ref = useRef<Group>(null);
  const bladeRef = useRef<Group>(null);
  const lightRef = useRef<PointLight>(null);
  const hiltRef = useRef<Group>(null);
  const onSoundRef = useRef<PositionalAudioProps>(null);
  const offSoundRef = useRef<PositionalAudioProps>(null);
  const humSoundRef = useRef<PositionalAudioProps>(null);

  const [on, setOn] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sound, setSound] = useState(false);

  useCursor(hovered);

  const { color } = useControls("Saber", {
    color: { value: "#43ff64" },
  });

  const { length, lightIntensity } = useSpring({
    length: on ? 1 : 0,
    lightIntensity: on ? 0.25 : 0,
    config: {
      duration: on ? 150 : 500,
    },
  });

  useEffect(() => {
    if (!sound || !onSoundRef.current || !humSoundRef.current || !offSoundRef.current) return;

    if (on) {
      onSoundRef.current.play();
      onSoundRef.current.setVolume(0.5);
      humSoundRef.current.play();
      humSoundRef.current.setVolume(0.5);
    } else {
      offSoundRef.current.play();
      humSoundRef.current.pause();
    }
  }, [on, sound]);

  useFrame(({ clock }, delta) => {
    if (!ref.current || !bladeRef.current) return;
    const rx = Math.PI * 2 + Math.cos(clock.elapsedTime * 0.25) * 2;

    if (on) {
      ref.current.rotation.z = damp(ref.current.rotation.z, Math.PI / 2, 4, delta);

      ref.current.rotation.x = damp(ref.current.rotation.x, Math.PI * 2, 4, delta);

      ref.current.position.y = damp(ref.current.position.y, -3, 4, delta);
    } else {
      ref.current.position.x = damp(ref.current.position.x, 0, 4, delta);
      ref.current.position.y = damp(ref.current.position.y, 0, 4, delta);
      ref.current.position.z = damp(ref.current.position.z, 0, 4, delta);

      ref.current.rotation.x = damp(ref.current.rotation.x, rx, 4, delta);
      ref.current.rotation.y = damp(ref.current.rotation.y, 0, 4, delta);
      ref.current.rotation.z = damp(ref.current.rotation.z, 0, 4, delta);
    }

    if (bladeRef.current.scale.x > 0) {
      bladeRef.current.visible = true;
    } else {
      bladeRef.current.visible = false;
    }
  });

  const { nodes, materials } = useGLTF(model) as GLTFResult;
  return (
    <group ref={ref} dispose={null}>
      <group
        ref={hiltRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (!onSoundRef.current) return;
          setSound(true);
          onSoundRef.current.context.resume();
          setOn((prev) => !prev);
        }}
      >
        <mesh
          geometry={nodes.lightMetal.geometry}
          material={materials["base metal"]}
          position={[-0.6194, -0.00798, 0.00015]}
        />
        <mesh
          geometry={nodes.dark_metal.geometry}
          material={materials["dark metal"]}
          position={[-6.11296, 0.11445, -0.00308]}
        />
        <mesh
          geometry={nodes.copper.geometry}
          material={materials.copper}
          position={[1.1202, 0.07744, -0.00012]}
        />
      </group>
      <group>
        <animated.pointLight
          ref={lightRef}
          position={[4.75, 0, 0]}
          color={color}
          intensity={lightIntensity}
        />
        {/* @ts-expect-error 'load' type error in @react-three/drei */}
        <PositionalAudio ref={onSoundRef} loop={false} url={OnSound} autoplay={false} />
        {/* @ts-expect-error 'load' type error in @react-three/drei */}
        <PositionalAudio ref={offSoundRef} loop={false} url={OffSound} autoplay={false} />
        {/* @ts-expect-error 'load' type error in @react-three/drei */}
        <PositionalAudio ref={humSoundRef} loop={true} url={HumSound} autoplay={false} />
        <animated.group ref={bladeRef} scale-x={length} position={[2.39, 0.00556, 0.00031]}>
          <mesh renderOrder={2} geometry={nodes.blade.geometry}>
            <saberMaterial uColor={color} />
          </mesh>
          <mesh renderOrder={1} geometry={nodes.blade.geometry} scale={[1, 1.2, 1.2]}>
            <meshBasicMaterial
              depthWrite={false}
              transparent={true}
              toneMapped={true}
              color={color}
            />
          </mesh>
          {/* <Glow /> */}
        </animated.group>
      </group>
    </group>
  );
};

useGLTF.preload(model);