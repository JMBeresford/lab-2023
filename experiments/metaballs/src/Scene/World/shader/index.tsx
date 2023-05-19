import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { BackSide, Color } from "three";
import { extend } from "@react-three/fiber";

const uniforms = {
  uColor1: new Color(0, 0, 0),
  uColor2: new Color(0, 0, 0),
  uColor3: new Color(0, 0, 0),
  uColor4: new Color(0, 0, 0),
  uColor5: new Color(0, 0, 0),
};

type WorldProps = Partial<Record<keyof typeof uniforms, Color>>;

const BaseWorldMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (m) => {
  if (!m) return;
  m.transparent = true;
  m.toneMapped = true;
  m.side = BackSide;
  m.depthWrite = false;
});

extend({ BaseWorldMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseWorldMaterial: WorldProps;
  }
}

export const WorldMaterial = (props: WorldProps) => <baseWorldMaterial {...props} />;
