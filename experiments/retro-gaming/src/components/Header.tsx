import { useState } from "react";
import { useStore } from "../store";

function hexToBrightness(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  return (r + g + b) / 3;
}

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
  const pauseGame = useStore((s) => s.pauseGame);
  const uiContext = useStore((s) => s.uiContext);
  const colors = useStore((s) => s.colors);

  const textColor = hexToBrightness(colors.floor) > 0.5 ? "#000" : "#fff";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100dvw",
        display: "grid",
        placeItems: "center",
        opacity: menuOpen ? 0 : 1,
        pointerEvents: menuOpen ? "none" : "all",
        touchAction: menuOpen ? "none" : "auto",
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
        <h1>retro gaming</h1>

        <div style={{ display: "flex", gap: "2rem" }}>
          {uiContext === "game" && <Button onClick={async () => await pauseGame()}>pause</Button>}
          <Button onClick={() => useStore.setState({ menuOpen: true })}>menu</Button>
        </div>
      </nav>
    </div>
  );
}
