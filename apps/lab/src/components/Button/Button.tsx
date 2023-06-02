import styles from "./Button.module.scss";

export function Button(props: JSX.IntrinsicElements["div"]) {
  const { children, ...restProps } = props;

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.button} {...restProps}>
          {children}
        </div>
      </div>
    </div>
  );
}
