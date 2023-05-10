import { shaderMaterial } from "@react-three/drei";
import { Color, ShaderMaterial } from "three";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uAmp?: number;
  uLight1Color?: Color | string;
  uLight2Color?: Color | string;
  uFresnelColor?: Color | string;
  uLightIntensity?: [number, number];
  uColor?: Color | string;
  uDetail?: number;
  uFbmOctaves?: number;
  uResolution?: [number, number];
};

export type SphereMaterialProps = ShaderMaterial & Uniforms;

const uniforms: Uniforms = {
  uTime: 0,
  uAmp: 0.4,
  uLight1Color: new Color(),
  uLight2Color: new Color(),
  uFresnelColor: new Color(),
  uLightIntensity: [1, 1],
  uColor: new Color(),
  uDetail: 0.2,
  uFbmOctaves: 4,
  uResolution: [1, 1],
};

// @ts-expect-error cuz
const BaseSphereMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, (m) => {
  if (!m) return;

  m.defines.USE_TANGENT = 1;
});

extend({ BaseSphereMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseSphereMaterial: MaterialNode<SphereMaterialProps, typeof BaseSphereMaterial>;
  }
}

export const SphereMaterial = (props: Uniforms) => <baseSphereMaterial {...props} />;
