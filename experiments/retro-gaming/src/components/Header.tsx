import { useState } from "react";
import { useStore } from "../store";
import styles from "./Header.module.scss";
import { hexToBrightness } from "../utils/colors";

function Button(props: JSX.IntrinsicElements["h3"]) {
  const { children, ...rest } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <h3
      {...rest}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{
        color: hovered ? "red" : "inherit",
        transition: "color 0.25s ease-in-out",
        cursor: "pointer",
      }}
    >
      {children}
    </h3>
  );
}

export function Header() {
  const menuOpen = useStore((s) => s.menuOpen);
  const aboutOpen = useStore((s) => s.aboutOpen);
  const uiOpen = menuOpen || aboutOpen;
  const backHome = useStore((s) => s.backHome);
  const pauseGame = useStore((s) => s.pauseGame);
  const uiContext = useStore((s) => s.uiContext);
  const colors = useStore((s) => s.colors);

  const textColor = hexToBrightness(colors.floor) > 0.5 ? "#000" : "#fff";

  return (
    <div
      className={styles.header}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100dvw",
        display: "grid",
        placeItems: "center",
        opacity: uiOpen ? 0 : 1,
        pointerEvents: uiOpen ? "none" : "all",
        touchAction: uiOpen ? "none" : "auto",
        zIndex: 99,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <nav
        style={{
          padding: "1rem 0",
          width: "min(95%, 1500px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: textColor,
        }}
      >
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => backHome(uiContext === "game" ? "paused" : undefined)}
        >
          retro gaming
        </h1>

        <div style={{ display: "flex", gap: "2rem" }}>
          {uiContext === "game" && <Button onClick={async () => await pauseGame()}>back</Button>}
          <Button onClick={() => useStore.setState({ menuOpen: true })}>menu</Button>
          <Button onClick={() => useStore.setState({ aboutOpen: true })}>about</Button>
        </div>
      </nav>
    </div>
  );
}
