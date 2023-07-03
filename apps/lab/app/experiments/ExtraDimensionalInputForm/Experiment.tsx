"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const ExtraDimensionalInputForm = dynamic(
  () => import("extra-dimensional-input-form").then((mod) => mod.Experiment),
  {
    ssr: false,
  },
);

export function Experiment() {
  return (
    <Suspense fallback={null}>
      <ExtraDimensionalInputForm />
    </Suspense>
  );
}
