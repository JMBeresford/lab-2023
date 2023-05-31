"use client";

import { Leva } from "leva";
import styles from "./layout.module.scss";

export default function ExperimentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.experimentContainer}>
      <Leva titleBar={{ position: { x: 0, y: 50 } }} />
      {children}
    </div>
  );
}
