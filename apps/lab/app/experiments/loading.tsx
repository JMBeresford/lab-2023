"use client";

import { useProgress } from "@react-three/drei";
import styles from "./loading.module.scss";

export default function Loading() {
  const { progress } = useProgress();
  return <div className={styles.loading} style={{ transform: `scaleX(${progress / 100})` }} />;
}
