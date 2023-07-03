"use client";

import { useLabStore } from "@/helpers/store";
import styles from "./LoadScreen.module.scss";
import { Bebas_Neue, Exo } from "next/font/google";
import { useProgress } from "@react-three/drei";

const bebasNeue = Bebas_Neue({
  weight: "400",
  display: "swap",
  subsets: ["latin-ext"],
});

const exo = Exo({
  subsets: ["latin-ext"],
  display: "swap",
});

export function LoadScreen() {
  const entered = useLabStore((state) => state.entered);

  const { progress } = useProgress();

  return (
    <div
      className={`${bebasNeue.className} ${styles.loadScreen} ${entered ? styles.entered : ""} ${
        progress >= 100 ? styles.loaded : ""
      }`}
    >
      <h1>Preparing the Lab</h1>

      <hr />
      <div className={styles.buttons}>
        <button
          className={`${exo.className} ${styles.primary}`}
          onClick={() => {
            useLabStore.setState({ entered: true });
            useLabStore.setState({ muted: false });
          }}
        >
          ENTER
        </button>
        <p className={exo.className}>
          this website contains audio but you can always{" "}
          <button
            onClick={() => {
              useLabStore.setState({ entered: true });
            }}
          >
            mute it
          </button>
        </p>
      </div>
    </div>
  );
}
