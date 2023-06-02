import { useLabStore } from "@/helpers/store";
import styles from "./Nav.module.scss";

export function MuteButton() {
  const muted = useLabStore((s) => s.muted);

  const handleClick = () => {
    useLabStore.setState((s) => ({ ...s, muted: !s.muted }));
  };

  const handlePointerEnter = () => {
    useLabStore.setState({ hovering: true });
  };

  const handlePointerLeave = () => {
    useLabStore.setState({ hovering: false });
  };

  return (
    <div className={`${styles.muteButton} ${muted ? styles.muted : ""}`}>
      <button
        name="mute"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <div className={styles.bar} style={{ animationDelay: "0.6s" }} />
        <div className={styles.bar} style={{ animationDelay: "0.2s" }} />
        <div className={styles.bar} style={{ animationDelay: "0.8s" }} />
        <div className={styles.bar} style={{ animationDelay: "0.4s" }} />
      </button>
    </div>
  );
}
