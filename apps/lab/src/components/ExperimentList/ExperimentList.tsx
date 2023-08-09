"use client";

import { ExperimentData, ExperimentDatum } from "experiment-data";
import { ExperimentImages } from "experiment-images";
import styles from "./ExperimentList.module.scss";
import { Bebas_Neue, Exo } from "next/font/google";
import { hoverHandlers } from "@/helpers/utils";
import Link from "next/link";
import { useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

const bebasNeue = Bebas_Neue({
  weight: "400",
  display: "swap",
  subsets: ["latin-ext"],
});

const exo = Exo({
  subsets: ["latin-ext"],
  display: "swap",
});

function ListEntry({ experiment, idx }: { experiment: ExperimentDatum; idx: number }) {
  const ref = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const style = useSpring({
    opacity: hovered ? 1 : 0,
  });

  return (
    <li
      className={`${styles.listEntry} ${exo.className}`}
      style={{ animationDelay: `${0.5 + idx * 0.25}s` }}
      {...hoverHandlers}
      onMouseOver={(e) => {
        hoverHandlers.onMouseOver(e);
        setHovered(true);
      }}
      onMouseOut={(e) => {
        hoverHandlers.onMouseOut(e);
        setHovered(false);
      }}
      onPointerMove={(e) => {
        if (!ref.current) return;
        ref.current.style.transform = `translateX(calc(-50% + ${e.clientX}px)) translateY(calc(-50% + ${e.clientY}px))`;
      }}
    >
      <animated.img
        ref={ref}
        src={ExperimentImages[experiment.name]}
        className={styles.previewImg}
        alt={experiment.label}
        style={style}
      />
      <p>{`${idx}`.padStart(2, "0")}</p>
      <Link prefetch={false} href={`/experiments/${experiment.pathName}`}>
        {experiment.label}
      </Link>
    </li>
  );
}

export function ExperimentList() {
  return (
    <div className={styles.experiments}>
      <h1 className={bebasNeue.className}>EXPERIMENTS</h1>
      <ul className={styles.list}>
        {Object.values(ExperimentData).map((experiment, idx) => (
          <ListEntry key={experiment.name} experiment={experiment} idx={idx} />
        ))}
      </ul>
    </div>
  );
}
