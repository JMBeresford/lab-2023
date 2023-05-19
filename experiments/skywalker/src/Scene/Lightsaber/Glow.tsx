import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { BufferGeometry, Color, Mesh, ShaderMaterial } from "three";
import { fragmentShader, vertexShader } from "./shaders/glow";

const uniforms = {
  uColor: new Color(),
  uTime: 0,
  uPointHeight: 0,
  uGlowCenterFalloff: 0.5,
  uGlowFalloff: 0.5,
  uGlowMax: 1.0,
};

type GlowProps = Partial<Record<keyof typeof uniforms, number | Color | string>>;

const GlowMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (mat) => {
  if (!mat) return;
  mat.depthWrite = false;
  mat.transparent = true;
});

extend({ GlowMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    glowMaterial: GlowProps;
  }
}

const Glow = ({ height = 12 }) => {
  const ref = useRef<Mesh<BufferGeometry, ShaderMaterial & GlowProps>>(null);

  const { color } = useControls("Saber", {
    color: { value: "#43ff64" },
    // glowMax: { value: 1.0, min: 0.0, max: 1.0, step: 0.01 },
  });

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={ref} rotation={[0, 0, -Math.PI / 2]} position={[height / 2 + 0.5, 0, 0]}>
      <capsuleGeometry args={[0.65, height, 20, 20]} />
      <glowMaterial uColor={color} uGlowFalloff={1.75} uGlowMax={0.3} />
    </mesh>
  );
};

export default Glow;
