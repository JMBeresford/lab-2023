"use client";

import dynamic from "next/dynamic";
const Experiment = dynamic(() => import("cosmic-platform").then((mod) => mod.Experiment), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Experiment />
    </>
  );
}
