/// <reference types="react" />
import { Color, ShaderMaterial } from "three";
import { MaterialNode } from "@react-three/fiber";
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
declare const BaseSphereMaterial: typeof ShaderMaterial & {
    key: string;
};
declare module "@react-three/fiber" {
    interface ThreeElements {
        baseSphereMaterial: MaterialNode<SphereMaterialProps, typeof BaseSphereMaterial>;
    }
}
export declare const SphereMaterial: (props: Uniforms) => JSX.Element;
export {};
