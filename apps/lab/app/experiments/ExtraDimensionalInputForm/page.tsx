"use client";

import dynamic from "next/dynamic";
const Experiment = dynamic(
  () => import("extra-dimensional-input-form").then((mod) => mod.Experiment),
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <>
      <Experiment />
    </>
  );
}
