import { shaderMaterial } from "@react-three/drei";
import { Color, ShaderMaterial } from "three";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uColor?: Color | [number, number, number];
};

const uniforms: Uniforms = {
  uTime: 0,
  uColor: new Color(1, 1, 1),
};

export type IpadMaterialProps = ShaderMaterial & Uniforms;

const BaseIpadMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (m) => {
  if (!m) return;
  m.transparent = true;
});

extend({ BaseIpadMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseIpadMaterial: MaterialNode<IpadMaterialProps, typeof BaseIpadMaterial>;
  }
}

export const IpadMaterial = (props: Uniforms) => <baseIpadMaterial {...props} />;
