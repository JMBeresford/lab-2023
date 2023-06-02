import styles from "./Button.module.scss";

export function Button(props: { href?: string; children: React.ReactNode }) {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.button}>{props.children}</div>
      </div>
    </div>
  );
}
