"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const Experiment = dynamic(() => import("work-from-home").then((mod) => mod.Experiment), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <Suspense fallback={null}>
        <Experiment />
      </Suspense>
    </div>
  );
}
