import { shaderMaterial } from "@react-three/drei";
import { Vector3, extend } from "@react-three/fiber";
import { NormalBlending, ShaderMaterial, Vector3 as Vec3 } from "three";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { MaterialNode } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uMouse?: Vector3;
};

const uniforms: Uniforms = {
  uTime: 0,
  uMouse: new Vec3(0, 0, 0),
};

export type PointsMaterialProps = Uniforms & ShaderMaterial;

const BasePointsMaterial = shaderMaterial(uniforms as any, vertexShader, fragmentShader, (m) => {
  if (!m) return;

  m.vertexColors = true;
  m.transparent = true;
  m.depthWrite = false;
  m.blending = NormalBlending;
});

extend({ BasePointsMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    basePointsMaterial: MaterialNode<PointsMaterialProps, typeof BasePointsMaterial>;
  }
}

export const PointsMaterial = (props: Uniforms) => <basePointsMaterial {...props} />;
