import { Environment } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
// import { useControls } from "leva";
// import colors from "nice-color-palettes/1000.json";
import { BufferGeometry, Color, Mesh, ShaderMaterial } from "three";
import { WorldMaterial } from "./shader";
import { useFrame } from "@react-three/fiber";

const colorsOptions = [
  ["#9e1e4c", "#ff1168", "#25020f", "#8f8f8f", "#ececec"],
  ["#130912", "#3e1c33", "#602749", "#b14623", "#f6921d"],
  ["#368986", "#e79a32", "#f84339", "#d40f60", "#005c81"],
  ["#85847e", "#ab6a6e", "#f7345b", "#353130", "#cbcfb4"],
  ["#27191c", "#2d3839", "#114d4d", "#6e9987", "#e0e4ce"],
  ["#ff3366", "#c74066", "#8f4d65", "#575a65", "#1f6764"],
];

export function World(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null);
  const [renderEnv, setRenderEnv] = useState<boolean>(true);

  const palette = useMemo(() => {
    return colorsOptions[Math.floor(Math.random() * colorsOptions.length)];
  }, []);

  const colors = useMemo(() => palette.map((c) => new Color(c)), [palette]);

  useFrame(() => {
    if (ref.current) {
      ref.current.material.uniforms.uColor1.value.lerp(colors[0], 0.2);
      ref.current.material.uniforms.uColor2.value.lerp(colors[1], 0.2);
      ref.current.material.uniforms.uColor3.value.lerp(colors[2], 0.2);
      ref.current.material.uniforms.uColor4.value.lerp(colors[3], 0.2);
      ref.current.material.uniforms.uColor5.value.lerp(colors[4], 0.2);

      if (
        colorsEqual(ref.current.material.uniforms.uColor1.value, colors[0]) &&
        colorsEqual(ref.current.material.uniforms.uColor2.value, colors[1]) &&
        colorsEqual(ref.current.material.uniforms.uColor3.value, colors[2]) &&
        colorsEqual(ref.current.material.uniforms.uColor4.value, colors[3]) &&
        colorsEqual(ref.current.material.uniforms.uColor5.value, colors[4])
      ) {
        if (renderEnv) {
          setRenderEnv(false);
        }
      } else if (!renderEnv) {
        setRenderEnv(true);
      }
    }
  });

  return (
    <>
      <Environment frames={renderEnv ? Infinity : 1} background blur={1}>
        <mesh
          ref={ref}
          scale={10}
          // onClick={() => console.log(palette, ref.current)}
          rotation-z={-0.5}
          {...props}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <WorldMaterial />
        </mesh>
      </Environment>
    </>
  );
}

function colorsEqual(a: Color, b: Color) {
  const epsilon = 0.0001;
  return (
    Math.abs(a.r - b.r) < epsilon && Math.abs(a.g - b.g) < epsilon && Math.abs(a.b - b.b) < epsilon
  );
}
