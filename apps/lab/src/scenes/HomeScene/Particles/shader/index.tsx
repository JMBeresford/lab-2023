import vertShader from "./vert.glsl";
import fragShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { ShaderMaterial, Texture } from "three";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uMask?: Texture;
  uDpr?: number;
};

const uniforms: Uniforms = {
  uTime: 0,
  uMask: undefined,
  uDpr: 1,
};

const BaseParticlesMaterial = shaderMaterial(uniforms, vertShader, fragShader, (m) => {
  if (!m) return;
  m.transparent = true;
  m.depthTest = false;
});

extend({ BaseParticlesMaterial });

export type ParticlesMaterialProps = Uniforms & ShaderMaterial;

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseParticlesMaterial: MaterialNode<ParticlesMaterialProps, typeof BaseParticlesMaterial>;
  }
}

export const ParticlesMaterial = (props: Uniforms) => <baseParticlesMaterial {...props} />;
