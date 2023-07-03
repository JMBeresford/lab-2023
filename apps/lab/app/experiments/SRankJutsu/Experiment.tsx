"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const SRankJutsu = dynamic(() => import("s-rank-jutsu").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <SRankJutsu />
    </Suspense>
  );
}
