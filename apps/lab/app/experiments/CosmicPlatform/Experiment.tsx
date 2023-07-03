"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const CosmicPlatform = dynamic(() => import("cosmic-platform").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <CosmicPlatform />
    </Suspense>
  );
}
