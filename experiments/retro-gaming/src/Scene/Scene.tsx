import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Gameboy } from "../components/Gameboy";
import {
  PerspectiveCamera,
  Stage,
  StatsGl,
  useKeyboardControls,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { ACESFilmicToneMapping, PerspectiveCamera as PerspectiveCameraProps } from "three";
import { Cartridges } from "./Cartridges";
import { Emulator } from "../utils/Emulator";
import { damp } from "three/src/math/MathUtils";
import { Controls } from "../utils/KeyboardHandlers";
import { useStore } from "../store";

const SCREEN_POS = { x: -0.01259, y: 0.02504, z: -0.23333 };
const CAM_POS = { x: 0.00001, y: 2.15, z: 1.15 };

export function Scene() {
  const colors = useStore((s) => s.colors);

  return (
    <Canvas dpr={[1, 2]} gl={{ toneMapping: ACESFilmicToneMapping }}>
      <Keyboard />
      <Suspense fallback={null}>
        <Stage
          adjustCamera={false}
          shadows={{
            type: "contact",
            opacity: 0.65,
            blur: 1,
            resolution: 512,
            depthWrite: false,
          }}
          environment={"dawn"}
          intensity={0.45}
        >
          <Gameboy position={[0, 0.2, 0]} />
          <Cartridges position={[0, 0.75, -SCREEN_POS.z / 2]} />
        </Stage>
      </Suspense>

      <mesh scale={50} rotation-x={-Math.PI / 2} position-y={-0.35}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={colors.floor} transparent={false} />
      </mesh>

      <Camera />

      {window.location.hash.includes("debug") && (
        <>
          <StatsGl />
          <OrbitControls />
        </>
      )}
    </Canvas>
  );
}

function Camera() {
  const ref = useRef<PerspectiveCameraProps>(null);
  const viewport = useThree((s) => s.viewport);
  const lookAtPos = useMemo(() => [0, 0, 0], []);
  const uiContext = useStore((s) => s.uiContext);

  useEffect(() => {
    if (viewport.aspect < 1.1) {
      CAM_POS.z = 1.25;
      CAM_POS.y = 3.5;
    }
  }, [viewport]);

  useFrame(({ clock }, dt) => {
    if (!ref.current) return;

    ref.current.rotation.order = "XZY";
    let { x: sx, y: sy, z: sz } = SCREEN_POS;
    let { x: cx, y: cy, z: cz } = CAM_POS;

    if (["game", "customizing"].includes(uiContext)) {
      ref.current.position.x = damp(ref.current.position.x, sx, 8, dt);
      ref.current.position.y = damp(ref.current.position.y, sy + 0.65, 8, dt);
      ref.current.position.z = damp(ref.current.position.z, sz, 8, dt);

      lookAtPos[0] = damp(lookAtPos[0], sx, 8, dt);
      lookAtPos[1] = damp(lookAtPos[1], 0, 8, dt);
      lookAtPos[2] = damp(lookAtPos[2], sz - 0.01, 8, dt);
    } else {
      let cx2 = cx + Math.sin(clock.elapsedTime * 0.1) * 0.2;
      ref.current.position.x = damp(ref.current.position.x, cx2, 8, dt);
      ref.current.position.y = damp(ref.current.position.y, cy, 8, dt);
      ref.current.position.z = damp(ref.current.position.z, cz, 8, dt);

      lookAtPos[0] = damp(lookAtPos[0], sx, 8, dt);
      lookAtPos[1] = damp(lookAtPos[1], sy, 8, dt);
      lookAtPos[2] = damp(lookAtPos[2], sz + 0.225, 8, dt);
    }

    ref.current.lookAt(lookAtPos[0], lookAtPos[1], lookAtPos[2]);
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[CAM_POS.x, CAM_POS.y, CAM_POS.z]} />;
}

function Keyboard() {
  const [_, get] = useKeyboardControls<Controls>();

  useFrame(() => {
    if (!Emulator.isLoadedAndStarted() || Emulator.ResponsiveGamepad.isEnabled()) return;
    const keymap = get();

    Emulator.setJoypadState(keymap);
  });

  return null;
}
