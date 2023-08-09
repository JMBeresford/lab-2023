import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { MaterialNode, extend } from "@react-three/fiber";
import { AdditiveBlending, Color, ShaderMaterial } from "three";

type Uniforms = {
  uTime?: number;
  uColor?: Color | number;
};
const uniforms: Uniforms = {
  uTime: 0,
  uColor: new Color(1, 1, 1),
};

const BaseGridMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (m) => {
  if (!m) return;
  m.transparent = true;
  m.premultipliedAlpha = true;
  m.blending = AdditiveBlending;
  m.toneMapped = true;
});

extend({ BaseGridMaterial });

export type GridMaterialProps = Uniforms & ShaderMaterial;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      baseGridMaterial: MaterialNode<GridMaterialProps, typeof BaseGridMaterial>;
    }
  }
}

export const GridMaterial = (props: Uniforms) => <baseGridMaterial {...props} />;
