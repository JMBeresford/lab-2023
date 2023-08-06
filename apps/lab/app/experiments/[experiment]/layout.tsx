import { ReactNode } from "react";
import styles from "./layout.module.scss";

export default function ExperimentLayout({ children }: { children: ReactNode }) {
  return <div className={styles.experimentWrapper}>{children}</div>;
}
