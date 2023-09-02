import styles from "./SourceButton.module.scss";

export function SourceButton(props: { experiment: string }) {
  return (
    <div className={styles.sourceButton}>
      <a
        rel="noreferrer"
        target="_blank"
        href={`https://github.com/JMBeresford/lab-2023/tree/main/experiments/${props.experiment}`}
      >
        {"</>"}
      </a>
    </div>
  );
}
