"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const Experiment = dynamic(() => import("chaos-sphere").then((mod) => mod.Experiment), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Experiment />
    </Suspense>
  );
}
