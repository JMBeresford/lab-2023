"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const Metaballs = dynamic(() => import("metaballs").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <Metaballs />
    </Suspense>
  );
}
