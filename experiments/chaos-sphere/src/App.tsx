import { Scene } from "./Scene";
import styles from "./App.module.scss";

export function Experiment() {
  return (
    <div className={styles.root}>
      <Scene />
    </div>
  );
}
