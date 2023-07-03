"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const WorkFromHome = dynamic(() => import("work-from-home").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <WorkFromHome />
    </Suspense>
  );
}
