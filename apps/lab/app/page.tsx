import Link from "next/link";
import styles from "./page.module.scss";
import { HomeScene } from "@/scenes/HomeScene";
import { ScenePortal } from "@/helpers/ScenePortal";

export default function Page() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h3>John Beresford`&apos;`s</h3>
        <h1>Laboratory</h1>
      </div>

      <Link href="/experiments" className={styles.button}>
        Enter
      </Link>

      <ScenePortal>
        <HomeScene />
      </ScenePortal>
    </div>
  );
}
