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
      {props.children}
    </h5>
  );
};

const MenuItems = (props: JSX.IntrinsicElements["div"]) => {
  const { children, ...rest } = props;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}
      {...rest}
    >
      {props.children}
    </div>
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
        gap: "1rem",
        paddingTop: "4rem",
        color: "white",
        opacity: aboutOpen ? 1 : 0,
        pointerEvents: aboutOpen ? "all" : "none",
        touchAction: aboutOpen ? "auto" : "none",
        transition: "opacity 0.25s ease-in-out, background-color 0.25s ease-in-out",
      }}
    >
      <h1>about this project</h1>

      <MenuItems>
        <div>
          <h3>Credit Where Credit Is Due</h3>
        </div>
      </MenuItems>

      <BackButton onClick={() => backHome()}>back</BackButton>
    </div>
  );
}
