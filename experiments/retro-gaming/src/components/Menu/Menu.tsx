import { Fragment, ReactNode, useRef, useState } from "react";
import { useStore, Store } from "../../store";
import styles from "./Menu.module.scss";

type MenuContext = "main" | "customize" | "emulator" | "controls" | "graphics";

const MenuLink = (props: JSX.IntrinsicElements["h3"]) => {
  const { children, ...rest } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <h3
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{
        cursor: "pointer",
        fontSize: "1.35rem",
        color: hovered ? "red" : "white",
        transition: "color 0.25s ease-in-out",
      }}
      {...rest}
    >
      {children}
    </h3>
  );
};

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

const BackButtonPadded = (props: JSX.IntrinsicElements["h5"]) => {
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
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: "1rem 2rem",
      }}
      {...rest}
    >
      {children}
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
      {children}
    </div>
  );
};

const MenuItemsGrid = (props: JSX.IntrinsicElements["div"]) => {
  const { children, ...rest } = props;
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "row",
        gap: "1rem",
        alignItems: "center",
        gridTemplateColumns: "max-content 1fr",
        gridAutoRows: "min-content",
        placeItems: "center start",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

const Footer = (props: JSX.IntrinsicElements["div"]) => {
  const { children, ...rest } = props;
  return (
    <div style={{ display: "flex", gap: "1.5rem" }} {...rest}>
      {children}
    </div>
  );
};

export function Menu() {
  const menuOpen = useStore((s) => s.menuOpen);
  const backHome = useStore((s) => s.backHome);
  const prevUIContext = useRef<Store["uiContext"]>(useStore.getState().uiContext);
  const uiContext = useStore((s) => s.uiContext);
  const [context, setContext] = useState<MenuContext>("main");
  const RenderMenuContext: Record<MenuContext, ReactNode> = {
    main: <MainMenu />,
    customize: <CustomizeMenu />,
    emulator: <EmulatorMenu />,
    controls: <ControlsMenu />,
    graphics: <GraphicsMenu />,
  } as const;

  function MainMenu() {
    return (
      <>
        <h1>Menu</h1>

        <MenuItems>
          <MenuLink
            onClick={() => {
              setContext("customize");
              prevUIContext.current = uiContext;
              useStore.setState({ uiContext: "customizing" });
            }}
          >
            Customize
          </MenuLink>
          <MenuLink onClick={() => setContext("emulator")}>Emulator Settings</MenuLink>
          <MenuLink onClick={() => setContext("controls")}>Keybinding Settings</MenuLink>
          {/* <MenuLink onClick={() => setContext("graphics")}>Graphics Settings</MenuLink> */}
        </MenuItems>

        <Footer>
          <BackButton onClick={() => useStore.setState({ menuOpen: false })}>Close</BackButton>
          {uiContext === "game" && (
            <BackButton
              onClick={async () => {
                backHome("paused");
              }}
            >
              Pause Game
            </BackButton>
          )}
        </Footer>
      </>
    );
  }

  function CustomizeMenu() {
    const { colors: initialColors } = useStore.getState();

    return (
      <>
        <div style={{ backgroundColor: "rgba(0,0,0,0.85)", padding: "2rem" }}>
          <MenuItemsGrid>
            <label htmlFor="shell">Shell Color</label>
            <input
              name="shell"
              type="color"
              defaultValue={initialColors.shell}
              style={{ cursor: "pointer" }}
              onChange={(e) =>
                useStore.setState((prev) => ({ colors: { ...prev.colors, shell: e.target.value } }))
              }
            />

            <label htmlFor="buttons">Buttons Color</label>
            <input
              name="buttons"
              type="color"
              defaultValue={initialColors.buttons}
              style={{ cursor: "pointer" }}
              onChange={(e) =>
                useStore.setState((prev) => ({
                  colors: { ...prev.colors, buttons: e.target.value },
                }))
              }
            />

            <label htmlFor="bezel">Bezel Color</label>
            <input
              name="bezel"
              type="color"
              defaultValue={initialColors.bezel}
              style={{ cursor: "pointer" }}
              onChange={(e) =>
                useStore.setState((prev) => ({ colors: { ...prev.colors, bezel: e.target.value } }))
              }
            />

            <label htmlFor="floor">Floor Color</label>
            <input
              name="floor"
              type="color"
              defaultValue={initialColors.floor}
              style={{ cursor: "pointer" }}
              onChange={(e) =>
                useStore.setState((prev) => ({ colors: { ...prev.colors, floor: e.target.value } }))
              }
            />
          </MenuItemsGrid>
        </div>

        <Footer>
          <BackButtonPadded
            onClick={() => {
              useStore.setState({ colors: initialColors, uiContext: prevUIContext.current });
              setContext("main");
            }}
          >
            Back
          </BackButtonPadded>
          <BackButtonPadded
            onClick={() => {
              useStore.setState({ uiContext: prevUIContext.current });
              setContext("main");
            }}
          >
            Apply
          </BackButtonPadded>
        </Footer>
      </>
    );
  }

  function EmulatorMenu() {
    const setMuted = useStore((s) => s.setMuted);
    const setSpeed = useStore((s) => s.setSpeed);
    const setVolume = useStore((s) => s.setVolume);
    const initialState = useStore.getState();
    return (
      <>
        <h1>Emulator Options</h1>

        <MenuItemsGrid>
          <label htmlFor="volume">Volume</label>
          <input
            name="volume"
            type="range"
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            defaultValue={initialState.volume}
            min={0}
            max={2}
            step={0.1}
          />

          <label htmlFor="muted">Muted</label>
          <input
            name="muted"
            type="checkbox"
            defaultChecked={initialState.muted}
            onChange={(e) => setMuted(e.target.checked)}
          />

          <label htmlFor="speed">Speed</label>
          <input
            name="speed"
            type="number"
            defaultValue={initialState.emulatorSpeed}
            step={0.25}
            min={0.25}
            max={3}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </MenuItemsGrid>

        <Footer>
          <BackButton
            onClick={() => {
              setContext("main");
              useStore.setState({ ...initialState });
            }}
          >
            Back
          </BackButton>
          <BackButton
            onClick={() => {
              setContext("main");
            }}
          >
            Apply
          </BackButton>
          {/* <BackButton
            onClick={(e) => {
              const target = e.target as HTMLButtonElement;
              target.disabled = true;
              const req = indexedDB.deleteDatabase("wasmboy");
              req.onerror = () => {
                console.log("Error deleting saves database");
                target.disabled = false;
              };
              req.onsuccess = () => {
                console.log("Saves database deleted successfully");
                target.disabled = false;
              };
            }}
          >
            Clear Saves
          </BackButton> */}
        </Footer>
      </>
    );
  }

  function ControlsMenu() {
    const initialKeymap = [...useStore.getState().keymap];

    return (
      <>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "center" }}
        >
          <h1>Keybinding Settings</h1>
          <h3>Click on a button input and enter the key you would like to bind.</h3>
        </div>

        <MenuItemsGrid>
          {initialKeymap.map((entry, i) => {
            return (
              <Fragment key={i}>
                <label style={{ textTransform: "capitalize" }} htmlFor={entry.name}>
                  {entry.name.toLowerCase()}
                </label>
                <input
                  name={entry.name}
                  type="text"
                  value={entry.keys[0]}
                  onKeyDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.target as HTMLInputElement).value = e.code;
                    useStore.setState((s) => {
                      const newKeyMap = [...s.keymap];
                      const index = newKeyMap.findIndex((e) => e.name === entry.name);
                      newKeyMap[index].keys[0] = e.code;
                      return { keymap: newKeyMap };
                    });
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </Fragment>
            );
          })}
        </MenuItemsGrid>

        <Footer>
          <BackButton
            onClick={() => {
              setContext("main");
              useStore.setState({ keymap: initialKeymap });
            }}
          >
            Back
          </BackButton>
          <BackButton
            onClick={() => {
              setContext("main");
            }}
          >
            Apply
          </BackButton>
        </Footer>
      </>
    );
  }

  function GraphicsMenu() {
    return (
      <>
        <h1>Graphics Menu</h1>

        <BackButton onClick={() => setContext("main")}>Back</BackButton>
      </>
    );
  }

  return (
    <div
      className={styles.menu}
      style={{
        position: "absolute",
        zIndex: 100,
        inset: 0,
        backgroundColor: context === "customize" ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        color: "white",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        touchAction: menuOpen ? "all" : "none",
        transition: "opacity 0.25s ease-in-out, background-color 0.25s ease-in-out",
      }}
    >
      {RenderMenuContext[context]}
    </div>
  );
}
