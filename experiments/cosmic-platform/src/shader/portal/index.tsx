import { shaderMaterial } from "@react-three/drei";
import { Color, extend } from "@react-three/fiber";
import { Color as ColorImpl, ShaderMaterial } from "three";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { MaterialNode } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uColor1?: Color;
  uColor2?: Color;
};

const uniforms: Uniforms = {
  uTime: 0,
  uColor1: new ColorImpl(),
  uColor2: new ColorImpl(),
};

export type PortalMaterialProps = Uniforms & ShaderMaterial;

// @ts-expect-error broken lib types
const BasePortalMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader);

extend({ BasePortalMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    basePortalMaterial: MaterialNode<PortalMaterialProps, typeof BasePortalMaterial>;
  }
}

export const PortalMaterial = (props: Uniforms) => <basePortalMaterial {...props} />;
