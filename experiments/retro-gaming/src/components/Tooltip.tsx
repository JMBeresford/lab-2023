import { useStore } from "../store";
import styles from "./Tooltip.module.scss";

export function Tooltip() {
  const tooltipDismissed = useStore((s) => s.tooltipDismissed);

  return (
    <div className={`${styles.tooltip} ${tooltipDismissed ? styles.hidden : ""}`}>
      <p>
        Check out the <button onClick={() => useStore.setState({ menuOpen: true })}>menu</button>{" "}
        for control options!
      </p>
      <button
        className={styles.close}
        onClick={() => useStore.setState({ tooltipDismissed: true })}
      ></button>
    </div>
  );
}
