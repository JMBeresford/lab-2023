import Link from "next/link";
import styles from "./page.module.scss";
import { Button } from "@/components/Button";
import { Bebas_Neue, Exo } from "next/font/google";
import { PageWrapper } from "@/components/PageWrapper";
import { getMetadata } from "@/helpers/metadata";

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
          <hr />

          <div className={styles.subHeadline}>
            <h5>Graphics</h5>
            <h5>•</h5>
            <h5>Web</h5>
            <h5>•</h5>
            <h5>Design</h5>
          </div>
        </div>

        <Button>
          <Link href="/experiments" className={exo.className}>
            VIEW EXPERIMENTS
          </Link>
        </Button>
      </div>
    </PageWrapper>
  );
}

export const metadata = getMetadata({});
