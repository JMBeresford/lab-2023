/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 -t -p 5 cartridge.glb
*/

import { useCursor, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import model from "experiment-assets/retro-gaming/cartridge.glb?url";
import cart_ao_img from "experiment-assets/retro-gaming/cart_body_AO.jpg?url";
import sticker_ao_img from "experiment-assets/retro-gaming/cart_sticker_AO.jpg?url";
import { DoubleSide, Group, Mesh, Texture } from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useStore } from "../store";
import { damp } from "three/src/math/MathUtils";
import { gsap, Linear } from "gsap";
import { useFileUpload } from "../hooks/useFileUpload";
import { Emulator } from "../utils/Emulator";

type GLTFResult = GLTF & {
  nodes: {
    cart_body: Mesh;
    Plane: Mesh;
  };
};

export function Cartridge(
  props: JSX.IntrinsicElements["group"] & {
    game: { stickerImage: string; rom?: string; cartNum: number };
  },
) {
  const { game, ...rest } = props;
  const [hovered, setHovered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const insertedCart = useStore((s) => s.insertedCart);
  const inserted = insertedCart === game.cartNum;
  const ref = useRef<Group>(null);
  const outerRef = useRef<Group>(null);
  const tlRef = useRef<gsap.core.Timeline>();
  const defaultColors = useStore((s) => s.colors);
  const uiContext = useStore((s) => s.uiContext);
  const setRom = useStore((s) => s.setRom);
  const { openFile } = useFileUpload(setRom);
  const offset = useRef(Math.random() * 100000);

  useCursor(hovered && !inserted && !animating);

  useEffect(() => {
    if (!tlRef.current) return;
    if (!inserted) {
      setAnimating(true);
      tlRef.current.reverse();
    } else {
      gsap.to(
        {},
        {
          duration: useStore.getState().uiContext === "idle" ? 0 : 1,
          onComplete: () => {
            tlRef.current?.play().then(() => {
              if (typeof game.rom === "string") {
                setRom(game.rom);
              } else {
                openFile();
              }
            });
          },
        },
      );
    }
  }, [inserted]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const duration = 0.35;

      if (!outerRef.current || !ref.current) return;
      tlRef.current = gsap
        .timeline({ paused: true })
        .to(outerRef.current.position, {
          x: -0.01,
          z: -0.74,
          onReverseComplete: () => {
            setAnimating(false);
          },
          onStart: () => {
            setAnimating(true);
          },
          ease: Linear.easeIn,
          duration,
        })
        .to(
          outerRef.current.position,
          {
            y: -0.07,
            ease: Linear.easeOut,
            duration,
          },
          ">",
        )
        .to(
          ref.current.rotation,
          {
            x: 0,
            y: 0,
            z: Math.PI,
            duration,
          },
          "<",
        )
        .to(
          ref.current.position,
          {
            x: 0,
            y: 0,
            z: 0,
            duration,
          },
          "<",
        )
        .to(ref.current.position, {
          z: 0.465,
          duration,
          onComplete: () => {
            setAnimating(false);
          },
        });
    });

    return () => ctx.revert();
  }, []);

  const [cart_ao_tex, sticker_ao_tex] = useTexture([cart_ao_img, sticker_ao_img], (t) => {
    if (t instanceof Array) {
      t.forEach((tex: Texture) => {
        tex.flipY = false;
      });
    }
  });

  const stickerTex = useTexture(game.stickerImage);

  const { color } = useControls(
    "cartridge",
    {
      color: defaultColors.cartridge,
    },
    { collapsed: true },
  );

  const handleClick = useCallback(() => {
    if (animating || inserted || !["idle", "paused"].includes(uiContext)) return;
    useStore.setState({ insertedCart: game.cartNum });
  }, [game.cartNum, animating, inserted, uiContext]);

  useFrame(({ clock }, dt) => {
    if (!ref.current) return;
    if (Emulator.isPlaying() && !inserted) {
      ref.current.scale.x = damp(ref.current.scale.x, 0, 4, dt);
      ref.current.scale.y = damp(ref.current.scale.y, 0, 4, dt);
      ref.current.scale.z = damp(ref.current.scale.z, 0, 4, dt);
    } else {
      ref.current.scale.x = damp(ref.current.scale.x, 1, 4, dt);
      ref.current.scale.y = damp(ref.current.scale.y, 1, 4, dt);
      ref.current.scale.z = damp(ref.current.scale.z, 1, 4, dt);
    }
    if (animating || inserted) return;
    const t = offset.current + clock.elapsedTime;
    ref.current.rotation.x = Math.cos(t / 4) / 8;
    ref.current.rotation.y = Math.sin(t / 4) / 8;
    ref.current.rotation.z = Math.sin(t / 4) / 20;

    const y = Math.sin(t / 4) * 0.1 + (hovered ? 0.075 : 0);
    ref.current.position.y = damp(ref.current.position.y, y, 12, dt);
  });

  const { nodes } = useGLTF(model) as GLTFResult;
  return (
    <group {...rest} dispose={null} ref={outerRef}>
      <group ref={ref}>
        <mesh
          geometry={nodes.cart_body.geometry}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
          renderOrder={1}
        >
          <meshStandardMaterial
            color={game.rom ? color : "#cccc00"}
            roughness={game.rom ? 1 : 0.1}
            metalness={game.rom ? 0 : 1}
            aoMap={cart_ao_tex}
            side={DoubleSide}
            transparent
          />
        </mesh>
        <mesh
          geometry={nodes.Plane.geometry}
          position={[0.00184, 0.00713, 0.04311]}
          scale-x={-1}
          renderOrder={2}
        >
          <meshStandardMaterial aoMap={sticker_ao_tex} map={stickerTex} transparent />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(model);
