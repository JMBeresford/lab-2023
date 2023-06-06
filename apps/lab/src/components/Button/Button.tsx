"use client";

import { hoverHandlers } from "@/helpers/utils";
import styles from "./Button.module.scss";

export function Button(props: JSX.IntrinsicElements["div"]) {
  const { children, ...restProps } = props;

  return (
    <div className={styles.outer} {...hoverHandlers}>
      <div className={styles.inner}>
        <div className={styles.button} {...restProps}>
          {children}
        </div>
      </div>
    </div>
  );
}
