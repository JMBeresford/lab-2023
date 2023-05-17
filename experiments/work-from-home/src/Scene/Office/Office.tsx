/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 --types -p 5 ./beresford_design.glb
*/

import { Mesh, Texture } from "three";
import { useCursor, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import model from "experiment-assets/work-from-home/models/beresford_design.glb?url";
import { OfficeMaterial } from "./shader";
import { Emissives } from "./Emissives";
import map1 from "experiment-assets/work-from-home/img/bake1.jpg";
import map2 from "experiment-assets/work-from-home/img/bake2.jpg";
import lightmap1_1 from "experiment-assets/work-from-home/img/lightmap1_1.jpg";
import lightmap1_2 from "experiment-assets/work-from-home/img/lightmap1_2.jpg";
import lightmap2_1 from "experiment-assets/work-from-home/img/lightmap2_1.jpg";
import lightmap2_2 from "experiment-assets/work-from-home/img/lightmap2_2.jpg";
import { useSpring } from "react-spring";
import { useMemo } from "react";
import { useExperimentStore } from "../store";

export type OfficeModel = GLTF & {
  nodes: {
    phone_emissive: Mesh;
    monitor_emissive: Mesh;
    ipad_emissive001: Mesh;
    ipad_emissive002: Mesh;
    shelving_emissive: Mesh;
    lamp_emissives: Mesh;
    wall_emissive: Mesh;
    ipad_emissive003: Mesh;
    wallsFloorsMerge: Mesh;
    itemsMerge: Mesh;
    email_emissive: Mesh;
    insta_emissive: Mesh;
    github_emissive: Mesh;
    mac_pro_emissive: Mesh;
    linkedin_emissive: Mesh;
    table_emissive: Mesh;
  };
};

function normalizeTextures(textures: Texture | Texture[]) {
  Object.values(textures).forEach((t: Texture) => {
    t.flipY = false;
  });
}

export function Office(props: JSX.IntrinsicElements["group"]) {
  const scene = useGLTF(model) as OfficeModel;
  const { nodes } = scene;

  const emailHovered = useExperimentStore((s) => s.emailHovered);
  const instaHovered = useExperimentStore((s) => s.instaHovered);
  const linkedinHovered = useExperimentStore((s) => s.linkedinHovered);
  const githubHovered = useExperimentStore((s) => s.githubHovered);
  const ipadTopHovered = useExperimentStore((s) => s.ipadTopHovered);
  const ipadMiddleHovered = useExperimentStore((s) => s.ipadMiddleHovered);
  const ipadBottomHovered = useExperimentStore((s) => s.ipadBottomHovered);
  const view = useExperimentStore((s) => s.view);

  const hovering = useMemo(
    () =>
      emailHovered ||
      instaHovered ||
      linkedinHovered ||
      githubHovered ||
      ipadTopHovered ||
      ipadMiddleHovered ||
      ipadBottomHovered,
    [
      emailHovered,
      instaHovered,
      linkedinHovered,
      githubHovered,
      ipadTopHovered,
      ipadMiddleHovered,
      ipadBottomHovered,
    ],
  );

  useCursor(hovering);

  const intensities = useSpring({
    uEmailIntensity: emailHovered ? 3 : 1,
    uInstaIntensity: instaHovered ? 3 : 1,
    uLinkedinIntensity: linkedinHovered ? 3 : 1,
    uGithubIntensity: githubHovered ? 3 : 1,
  });

  const textures1 = useTexture(
    {
      uMap: map1,
      uLightMap: lightmap1_1,
      uLightMap2: lightmap1_2,
    },
    normalizeTextures,
  );

  const textures2 = useTexture(
    {
      uMap: map2,
      uLightMap: lightmap2_1,
      uLightMap2: lightmap2_2,
    },
    normalizeTextures,
  );

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.itemsMerge.geometry} position={[-1.34119, 0.93352, -0.83501]}>
        {/* @ts-expect-error false positive infinitely deep error */}
        <OfficeMaterial {...textures1} {...intensities} />
      </mesh>
      <mesh
        onClick={() => {
          if (view === "main") return;
          useExperimentStore.setState({ view: "main" });
        }}
        geometry={nodes.wallsFloorsMerge.geometry}
        position={[0.12731, 0.04368, 0.49887]}
      >
        <OfficeMaterial {...textures2} {...intensities} />
      </mesh>

      <Emissives model={scene} />
    </group>
  );
}
