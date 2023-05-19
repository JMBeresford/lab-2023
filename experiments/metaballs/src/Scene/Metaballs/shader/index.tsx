import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Color, Texture, Vector2 } from "three";
import { MAX_SPHERES } from "../constants";

type UniformDatatypes = number | Color | string | number[] | Texture | null;

const uniformsMetaballs = {
  uResolution: new Vector2(),
  uTime: 0,
  uMouse: new Vector2(),
  uMouseRadius: 0,
  uSurfaceThreshold: 0.005,
  uLowRes: null,
  envMap: null,
  envMapIntensity: 1,
  uMix: 0.35,
  uSeeds: [],
  uEndPositions: [],
  uStartPositions: [],
  uFov: 3,
  uSpeeds: [],
  uRadii: [],
  uCount: 10,
  uAO: 5,
};

const BaseMetaBallsMaterial = shaderMaterial(
  uniformsMetaballs,
  vertexShader,
  fragmentShader,
  (m) => {
    if (!m) return;
    m.transparent = true;
    m.defines = { MAX_SPHERES };
    m.toneMapped = true;
  },
);

type MetaballsProps = Partial<Record<keyof typeof uniformsMetaballs, UniformDatatypes>>;

const uniformsIntersectionMetaballs = {
  uResolution: new Vector2(),
  uTime: 0,
  uMouse: new Vector2(),
  uMouseRadius: 0,
  envMap: null,
  envMapIntensity: 1,
  uMix: 0.35,
  uSeeds: [],
  uEndPositions: [],
  uStartPositions: [],
  uFov: 3,
  uSpeeds: [],
  uRadii: [],
  uCount: 10,
  uAO: 5,
};

const BaseIntersectionMetaBallsMaterial = shaderMaterial(
  uniformsIntersectionMetaballs,
  vertexShader,
  fragmentShader,
  (m) => {
    if (!m) return;
    m.transparent = true;
    m.defines = { MAX_SPHERES, INTERSECTION_ONLY: 1 };
    m.toneMapped = true;
  },
);

type IntersectionMetaballsProps = Partial<
  Record<keyof typeof uniformsIntersectionMetaballs, UniformDatatypes>
>;

extend({ BaseMetaBallsMaterial, BaseIntersectionMetaBallsMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseMetaBallsMaterial: MetaballsProps;
    baseIntersectionMetaBallsMaterial: IntersectionMetaballsProps;
  }
}

const MetaBallsMaterial = (props: MetaballsProps) => <baseMetaBallsMaterial {...props} />;
const IntersectionMetaBallsMaterial = (props: IntersectionMetaballsProps) => (
  <baseIntersectionMetaBallsMaterial {...props} />
);

export { MetaBallsMaterial, IntersectionMetaBallsMaterial, BaseIntersectionMetaBallsMaterial };
