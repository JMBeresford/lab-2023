import vertShader from "./vert.glsl";
import fragShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { ShaderMaterial, Texture } from "three";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uMask?: Texture;
};

const uniforms: Uniforms = {
  uTime: 0,
  uMask: undefined,
};

const BaseParticlesMaterial = shaderMaterial(uniforms, vertShader, fragShader, (m) => {
  m.transparent = true;
  m.depthTest = false;
});

extend({ BaseParticlesMaterial });

export type ParticlesMaterialProps = Uniforms & ShaderMaterial;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      baseParticlesMaterial: MaterialNode<ParticlesMaterialProps, typeof BaseParticlesMaterial>;
    }
  }
}

export const ParticlesMaterial = (props: Uniforms) => <baseParticlesMaterial {...props} />;
