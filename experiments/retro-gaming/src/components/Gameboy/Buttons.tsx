import { useControls } from "leva";
import { GameboyGLTFResult } from "./Gameboy";
import { useStore } from "../../store";
import { MeshStandardMaterial, Texture } from "three";
import { animated as a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { damp } from "three/src/math/MathUtils";
import { useKeyboardControls, useTexture } from "@react-three/drei";
import { Controls } from "../../utils/KeyboardHandlers";
import { MeshType } from "../../utils/types";
import aoImage from "experiment-assets/retro-gaming/buttons_AO.jpg?url";

function pressKey(key: Controls) {
  window.dispatchEvent(new KeyboardEvent("keydown", { code: key }));
}

function releaseKey(key: Controls) {
  window.dispatchEvent(new KeyboardEvent("keyup", { code: key }));
}

export function Buttons(props: { nodes: GameboyGLTFResult["nodes"] }) {
  const { nodes } = props;
  const [_, get] = useKeyboardControls<Controls>();
  const aRef = useRef<MeshType<MeshStandardMaterial>>(null);
  const bRef = useRef<MeshType<MeshStandardMaterial>>(null);
  const selectRef = useRef<MeshType<MeshStandardMaterial>>(null);
  const startRef = useRef<MeshType<MeshStandardMaterial>>(null);
  const dpadRef = useRef<MeshType<MeshStandardMaterial>>(null);
  const menuRef = useRef<MeshType<MeshStandardMaterial>>(null);
  const aoMap = useTexture(aoImage, (t) => {
    if (t instanceof Texture) {
      t.flipY = false;
    }
  });
  const refs = {
    A: aRef,
    B: bRef,
    SELECT: selectRef,
    START: startRef,
    DPAD: dpadRef,
    MENU: menuRef,
  } as const;

  const defaultColors = useStore((s) => s.colors);
  const keymap = useStore((s) => s.keymap);

  const { button_color } = useControls(
    "gameboy",
    {
      button_color: defaultColors.buttons,
    },
    { collapsed: true },
  );

  useEffect(() => {
    useStore.subscribe(
      (state) => state.colors,
      (colors) => {
        for (const ref of Object.values(refs)) {
          ref.current?.material.color.setStyle(colors.buttons);
        }
      },
    );
  }, []);

  useFrame((_, dt) => {
    const buttonState = get();

    // handle wasmboy button presses
    for (const [key, ref] of Object.entries(refs)) {
      if (!ref.current || buttonState[key as keyof typeof buttonState] == undefined) continue;
      const pressed = buttonState[key as keyof typeof buttonState];
      ref.current.position.y = damp(ref.current.position.y, pressed ? -0.01 : 0, 12, dt);
    }

    // handle menu button presses
    const menuPressed = get().MENU;
    if (menuRef.current) {
      menuRef.current.position.y = damp(
        menuRef.current.position.y,
        menuPressed ? -0.01 : 0,
        12,
        dt,
      );
    }

    // handle dpad rotation
    if (dpadRef.current) {
      const { UP, LEFT, DOWN, RIGHT } = buttonState;
      const x = damp(dpadRef.current.rotation.x, UP ? -0.1 : DOWN ? 0.1 : 0, 12, dt);
      const z = damp(dpadRef.current.rotation.z, LEFT ? 0.1 : RIGHT ? -0.1 : 0, 12, dt);
      dpadRef.current.rotation.set(x, 0, z);
    }
  });

  return (
    <>
      <a.mesh
        renderOrder={2}
        ref={dpadRef}
        geometry={nodes.dpad.geometry}
        position={[-0.15946, 0.04436, 0.09896]}
      >
        <meshStandardMaterial color={button_color} aoMap={aoMap} />

        <group visible={false}>
          <mesh
            position-z={-0.0375}
            onPointerDown={() =>
              pressKey(keymap.find((entry) => entry.name === "UP")?.keys[0] as Controls)
            }
            onPointerUp={() =>
              releaseKey(keymap.find((entry) => entry.name === "UP")?.keys[0] as Controls)
            }
          >
            <boxGeometry args={[0.02, 0.02, 0.02]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
          <mesh
            position-z={0.0375}
            onPointerDown={() =>
              pressKey(keymap.find((entry) => entry.name === "DOWN")?.keys[0] as Controls)
            }
            onPointerUp={() =>
              releaseKey(keymap.find((entry) => entry.name === "DOWN")?.keys[0] as Controls)
            }
          >
            <boxGeometry args={[0.02, 0.02, 0.02]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
          <mesh
            position-x={0.0375}
            onPointerDown={() =>
              pressKey(keymap.find((entry) => entry.name === "RIGHT")?.keys[0] as Controls)
            }
            onPointerUp={() =>
              releaseKey(keymap.find((entry) => entry.name === "RIGHT")?.keys[0] as Controls)
            }
          >
            <boxGeometry args={[0.02, 0.02, 0.02]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
          <mesh
            position-x={-0.0375}
            onPointerDown={() =>
              pressKey(keymap.find((entry) => entry.name === "LEFT")?.keys[0] as Controls)
            }
            onPointerUp={() =>
              releaseKey(keymap.find((entry) => entry.name === "LEFT")?.keys[0] as Controls)
            }
          >
            <boxGeometry args={[0.02, 0.02, 0.02]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </group>
      </a.mesh>
      <group position={[0.15946, 0.03806, 0.07897]}>
        <a.mesh
          renderOrder={2}
          ref={aRef}
          geometry={nodes.a.geometry}
          onPointerDown={() =>
            pressKey(keymap.find((entry) => entry.name === "A")?.keys[0] as Controls)
          }
          onPointerUp={() =>
            releaseKey(keymap.find((entry) => entry.name === "A")?.keys[0] as Controls)
          }
        >
          <meshStandardMaterial color={button_color} aoMap={aoMap} />
        </a.mesh>
      </group>
      <group position={[0.07275, 0.03806, 0.11061]}>
        <a.mesh
          renderOrder={2}
          ref={bRef}
          geometry={nodes.b.geometry}
          onPointerDown={() =>
            pressKey(keymap.find((entry) => entry.name === "B")?.keys[0] as Controls)
          }
          onPointerUp={() =>
            releaseKey(keymap.find((entry) => entry.name === "B")?.keys[0] as Controls)
          }
        >
          <meshStandardMaterial color={button_color} aoMap={aoMap} />
        </a.mesh>
      </group>
      <group position={[-0.05128, 0.03785, 0.23325]}>
        <a.mesh
          renderOrder={2}
          ref={selectRef}
          geometry={nodes.select.geometry}
          onPointerDown={() =>
            pressKey(keymap.find((entry) => entry.name === "SELECT")?.keys[0] as Controls)
          }
          onPointerUp={() =>
            releaseKey(keymap.find((entry) => entry.name === "SELECT")?.keys[0] as Controls)
          }
        >
          <meshStandardMaterial color={button_color} aoMap={aoMap} />
        </a.mesh>
      </group>
      <group position={[0.02513, 0.03785, 0.23333]}>
        <a.mesh
          renderOrder={2}
          ref={startRef}
          geometry={nodes.start.geometry}
          onPointerDown={() =>
            pressKey(keymap.find((entry) => entry.name === "START")?.keys[0] as Controls)
          }
          onPointerUp={() =>
            releaseKey(keymap.find((entry) => entry.name === "START")?.keys[0] as Controls)
          }
        >
          <meshStandardMaterial color={button_color} aoMap={aoMap} />
        </a.mesh>
      </group>
      <group position={[-0.01285, 0.02674, 0.02152]}>
        <a.mesh
          renderOrder={2}
          ref={menuRef}
          geometry={nodes.menu.geometry}
          onPointerDown={() =>
            pressKey(keymap.find((entry) => entry.name === "MENU")?.keys[0] as Controls)
          }
          onPointerUp={() =>
            releaseKey(keymap.find((entry) => entry.name === "MENU")?.keys[0] as Controls)
          }
        >
          <meshStandardMaterial color={button_color} aoMap={aoMap} />
        </a.mesh>
      </group>
    </>
  );
}
