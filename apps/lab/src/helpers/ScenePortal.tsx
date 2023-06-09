"use client";

import { ReactNode, Suspense } from "react";
import { SceneTunnel } from "./tunnel";

export function ScenePortal(props: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <SceneTunnel.In>{props.children}</SceneTunnel.In>
      </Suspense>
    </>
  );
}
