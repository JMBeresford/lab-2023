"use client";

import { ReactNode, Suspense, forwardRef, useImperativeHandle, useRef } from "react";
import { SceneTunnel } from "./tunnel";
import { usePathname } from "next/navigation";

export function ScenePortal(props: { children: ReactNode }) {
  const path = usePathname();

  if (!["/", "/experiments"].includes(path)) {
    return null;
  }

  return (
    <>
      <Suspense fallback={null}>
        <SceneTunnel.In>{props.children}</SceneTunnel.In>
      </Suspense>
    </>
  );
}
