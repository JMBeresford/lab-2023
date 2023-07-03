"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const ChaosSphere = dynamic(() => import("chaos-sphere").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <ChaosSphere />
    </Suspense>
  );
}
