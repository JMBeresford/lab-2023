import styles from "./layout.module.scss";

export default function ExperimentLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.experimentList}>{children}</div>;
}
