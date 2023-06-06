import { shaderMaterial } from "@react-three/drei";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { ShaderMaterial, Texture, Vector2 } from "three";
import { MaterialNode, extend } from "@react-three/fiber";
import { animated } from "@react-spring/three";

type Uniforms = {
  uTime?: number;
  uHovered?: number;
  uMouse?: Vector2;
  uResolution?: Vector2 | [number, number];
  uMouseInnerCluster?: Vector2 | [number, number];
  uMouseOuterCluster?: Vector2 | [number, number];
  uReticleBase?: Texture;
  uReticleDashed?: Texture;
  uReticleHalf?: Texture;
};

const uniforms: Uniforms = {
  uTime: 0,
  uHovered: 0,
  uMouse: new Vector2(),
  uMouseInnerCluster: new Vector2(),
  uMouseOuterCluster: new Vector2(),
  uResolution: new Vector2(),
  uReticleBase: undefined,
  uReticleDashed: undefined,
  uReticleHalf: undefined,
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

export const ReticleMaterial = animated("baseReticleMaterial");
