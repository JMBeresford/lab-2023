import Link from "next/link";
import styles from "./page.module.scss";
import { HomeScene } from "@/scenes/HomeScene";
import { ScenePortal } from "@/helpers/ScenePortal";
import { Button } from "@/components/Button";
import { Bebas_Neue, Exo } from "next/font/google";
import { PageWrapper } from "@/components/PageWrapper";

const bebasNeue = Bebas_Neue({
  weight: "400",
  display: "swap",
  subsets: ["latin-ext"],
});

const exo = Exo({
  subsets: ["latin-ext"],
  display: "swap",
});

export default function Page() {
  return (
    <PageWrapper>
      <div className={styles.hero}>
        <div className={`${styles.text} ${bebasNeue.className}`}>
          <h3>John Beresford&apos;s</h3>
          <h1>Laboratory</h1>
        </div>

        <Button>
          <Link href="/experiments" className={exo.className}>
            VIEW EXPERIMENTS
          </Link>
        </Button>

        <ScenePortal>
          <HomeScene />
        </ScenePortal>
      </div>
    </PageWrapper>
  );
}
