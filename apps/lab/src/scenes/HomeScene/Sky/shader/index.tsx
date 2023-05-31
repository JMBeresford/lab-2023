import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { MaterialNode, extend } from "@react-three/fiber";
import { BackSide, Color, ShaderMaterial } from "three";

type Uniforms = {
  uTime?: number;
  uColor1?: Color | number;
  uColor2?: Color | number;
};
const uniforms: Uniforms = {
  uTime: 0,
  uColor1: new Color(),
  uColor2: new Color(),
};

const BaseSkyMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (m) => {
  m.transparent = false;
  m.depthWrite = false;
  m.side = BackSide;
});

extend({ BaseSkyMaterial });

export type SkyMaterialProps = Uniforms & ShaderMaterial;

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseSkyMaterial: MaterialNode<SkyMaterialProps, typeof BaseSkyMaterial>;
  }
}

export const SkyMaterial = (props: Uniforms) => <baseSkyMaterial {...props} />;
