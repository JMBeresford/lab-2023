"use client";
import "regenerator-runtime/runtime";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const RetroGaming = dynamic(() => import("retro-gaming").then((mod) => mod.Experiment), {
  ssr: false,
});

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <RetroGaming />
    </Suspense>
  );
}
