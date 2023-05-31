"use client";

import { Canvas } from "@react-three/fiber";
import { SceneTunnel } from "./tunnel";
import { ReactNode, useRef } from "react";

export function SceneRoot(props: { children: ReactNode }) {
  const ref = useRef();
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        touchAction: "auto",
      }}
    >
      {props.children}
      <Canvas
        gl={{ antialias: false }}
        style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
        eventSource={ref}
        eventPrefix="client"
      >
        <SceneTunnel.Out />
      </Canvas>
    </div>
  );
}
