"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { MuteButton } from "./MuteButton";
import { Exo } from "next/font/google";

const exo = Exo({
  subsets: ["latin-ext"],
  display: "swap",
});

export function Nav() {
  const path = usePathname();
  const parts = useMemo(() => path.split("/").filter((x) => x !== ""), [path]);

  console.log(path, parts);

  return (
    <nav className={styles.nav}>
      <div className={`${styles.content} ${exo.className}`}>
        <MuteButton />

        <div className={styles.path}>
          <Link href="/">
            home
            <div className={styles.slash}>/</div>
          </Link>
          {parts.map((part, i) => (
            <Link key={i} href={parts.slice(0, i + 1).join("/")}>
              {part}
              <div className={styles.slash}>/</div>
            </Link>
          ))}
        </div>

        <a className={styles.portfolioLink} type="button" href="https://john-beresford.com">
          VISIT MY PORTFOLIO
        </a>
      </div>
    </nav>
  );
}
