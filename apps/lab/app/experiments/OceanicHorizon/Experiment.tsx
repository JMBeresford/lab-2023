"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const OceanicHorizon = dynamic(() => import("oceanic-horizon").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <OceanicHorizon />
    </Suspense>
  );
}
