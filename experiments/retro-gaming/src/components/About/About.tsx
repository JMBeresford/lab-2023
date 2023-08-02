import { useState } from "react";
import { useStore } from "../../store";
import styles from "./About.module.scss";

const BackButton = (props: JSX.IntrinsicElements["h5"]) => {
  const { children, ...rest } = props;
  const [hovered, setHovered] = useState(false);
  return (
    <h5
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{
        cursor: "pointer",
        fontSize: "1.125rem",
        textDecoration: "underline",
        color: hovered ? "red" : "white",
        transition: "color 0.25s ease-in-out",
      }}
      {...rest}
    >
      {children}
    </h5>
  );
};

export function About() {
  const aboutOpen = useStore((s) => s.aboutOpen);
  const backHome = useStore((s) => s.backHome);

  return (
    <div
      className={styles.about}
      style={{
        position: "absolute",
        zIndex: 100,
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4rem 0",
        color: "white",
        opacity: aboutOpen ? 1 : 0,
        pointerEvents: aboutOpen ? "all" : "none",
        touchAction: aboutOpen ? "auto" : "none",
        transition: "opacity 0.25s ease-in-out, background-color 0.25s ease-in-out",
      }}
    >
      <div style={{ maxWidth: "90%" }}>
        <h1>about this project</h1>

        <p>Click on a cartridge to play a demo! Or, upload your own GB/GBC rom file!</p>
        <p>Customize the look, feel, and cotrols of the experience in the menu.</p>

        <div className={styles.credits}>
          <h3>Credit Where Credit Is Due</h3>
          <p>This project would not have been possible without the following resources:</p>

          <div className={styles.subsection}>
            <h4>Homebrew Demos</h4>
            <p>
              Each of these playable cartridges are free demos for homebrew GB/GBC games. Make sure
              to support the developers of these games if you enjoyed the demos!
            </p>

            <ul>
              <li>
                <a href="https://incube8games.com/products/2021-moon-escape-gb">
                  2021: Moon Escape
                </a>{" "}
                by <strong>Mike Yamato</strong>
              </li>

              <li>
                <a href="https://www.bitmapsoft.co.uk/product/far-after-limited-collectors-edition/">
                  Far After
                </a>{" "}
                by <strong>Brent Lattery (SuitNtie)</strong>
              </li>

              <li>
                <a href="https://www.themachinegame.com/">The Machine</a> by{" "}
                <strong>Ben Jelter</strong>
              </li>
            </ul>
          </div>

          <div className={styles.subsection}>
            <h4>The Emulator</h4>
            <p>
              In order to play the demo cartridges, the{" "}
              <a href="https://github.com/torch2424/wasmboy">WASMBoy emulator</a> under the hood.
            </p>
          </div>
        </div>
      </div>

      <BackButton onClick={() => backHome()}>back</BackButton>
    </div>
  );
}
