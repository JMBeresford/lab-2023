"use client";

import dynamic from "next/dynamic";
const Experiment = dynamic(() => import("chaos-sphere").then((mod) => mod.Experiment), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Experiment />
    </>
  );
}
