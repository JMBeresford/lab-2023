"use client";

import { ExperimentData } from "experiment-data";
import { redirect } from "next/navigation";

export default function ExperimentFrame(props: { experiment: string }) {
  const experimentDatum = Object.values(ExperimentData).find(
    (e) => e.pathName === props.experiment,
  );

  if (!experimentDatum) redirect("/404");

  return <iframe src={`https://${experimentDatum.pathName}.jmberesford.vercel.app`} />;
}
