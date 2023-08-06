"use client";

import { Canvas } from "@react-three/fiber";
import { SceneTunnel } from "./tunnel";
import { ReactNode, useRef } from "react";
import { ACESFilmicToneMapping } from "three";

export function SceneRoot(props: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100dvh",
        touchAction: "auto",
      }}
    >
      {props.children}
      <Canvas
        gl={{ antialias: false, toneMappingExposure: 1, toneMapping: ACESFilmicToneMapping }}
        style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
        eventSource={ref != null ? ref.current! : undefined}
        eventPrefix="client"
      >
        <SceneTunnel.Out />
      </Canvas>
    </div>
  );
}
