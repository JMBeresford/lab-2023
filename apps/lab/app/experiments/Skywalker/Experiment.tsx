"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const Skywalker = dynamic(() => import("skywalker").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <Skywalker />
    </Suspense>
  );
}
