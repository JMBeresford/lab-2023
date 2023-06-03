import { shaderMaterial } from "@react-three/drei";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { ShaderMaterial, Vector2 } from "three";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uMouse?: Vector2;
  uResolution?: Vector2 | [number, number];
};

const uniforms: Uniforms = {
  uTime: 0,
  uMouse: new Vector2(),
  uResolution: new Vector2(),
};

const BaseReticleMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (m) => {
  m.transparent = true;
  m.premultipliedAlpha = true;
  m.depthTest = false;
});

extend({ BaseReticleMaterial });

export type ReticleMaterialProps = Uniforms & ShaderMaterial;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      baseReticleMaterial: MaterialNode<ReticleMaterialProps, typeof BaseReticleMaterial>;
    }
  }
}

export const ReticleMaterial = (props: Uniforms) => <baseReticleMaterial {...props} />;
