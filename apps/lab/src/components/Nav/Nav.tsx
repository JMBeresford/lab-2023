"use client";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import styles from "./Nav.module.scss";
import Link from "next/link";

export function Nav() {
  const path = usePathname();
  const parts = useMemo(() => path.split("/").filter((x) => x !== ""), [path]);

  console.log(path, parts);

  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <div>
          <button>mute</button>
        </div>

        <div className={styles.path}>
          <Link href="/" className={styles.root}>
            /
          </Link>
          {parts.map((part, i) => (
            <Link key={i} href={parts.slice(0, i + 1).join("/")}>
              {part}
              <div className={styles.slash}>/</div>
            </Link>
          ))}
        </div>

        <a className={styles.portfolioLink} type="button" href="https://john-beresford.com">
          Portfolio
        </a>
      </div>
    </nav>
  );
}
