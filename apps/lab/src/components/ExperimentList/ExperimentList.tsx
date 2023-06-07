"use client";

import { ExperimentData, ExperimentDatum } from "experiment-data";
import styles from "./ExperimentList.module.scss";
import { Bebas_Neue, Exo } from "next/font/google";
import { hoverHandlers } from "@/helpers/utils";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  weight: "400",
  display: "swap",
  subsets: ["latin-ext"],
});

const exo = Exo({
  subsets: ["latin-ext"],
  display: "swap",
});

function ListEntry({ experiment, idx }: { experiment: ExperimentDatum; idx: number }) {
  return (
    <li
      className={`${styles.listEntry} ${exo.className}`}
      style={{ animationDelay: `${0.5 + idx * 0.25}s` }}
      {...hoverHandlers}
    >
      <p>{`${idx}`.padStart(2, "0")}</p>
      <Link prefetch={false} href={`/experiments/${experiment.pathName}`}>
        {experiment.label}
      </Link>
    </li>
  );
}

export function ExperimentList() {
  return (
    <div className={styles.experiments}>
      <h1 className={bebasNeue.className}>EXPERIMENTS</h1>
      <ul className={styles.list}>
        {Object.values(ExperimentData).map((experiment, idx) => (
          <ListEntry key={experiment.name} experiment={experiment} idx={idx} />
        ))}
      </ul>
    </div>
  );
}
