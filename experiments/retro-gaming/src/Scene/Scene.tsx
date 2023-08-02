import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Gameboy } from "../components/Gameboy";
import {
  PerspectiveCamera,
  StatsGl,
  useKeyboardControls,
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { RefObject, Suspense, useEffect, useMemo, useRef } from "react";
import { Group, PerspectiveCamera as PerspectiveCameraProps, Quaternion, Vector3 } from "three";
import { Emulator } from "../utils/Emulator";
import { damp } from "three/src/math/MathUtils";
import { Controls } from "../utils/KeyboardHandlers";
import { useStore } from "../store";
import { hexToBrightness } from "../utils/colors";

const CAM_POS = { x: 0.00001, y: 2.25, z: 1.15 };
const GAMEBOY_ROT = Math.PI / 7;

export function Scene() {
  const gbRef = useRef(null);
  const colors = useStore((s) => s.colors);
  const uiContext = useStore((s) => s.uiContext);

  return (
    <Canvas
      gl={{ toneMappingExposure: 1, antialias: true, logarithmicDepthBuffer: true }}
      dpr={[1, 2]}
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
        touchAction: "none",
      }}
    >
      <fog
        attach="fog"
        args={[hexToBrightness(colors.floor) > 0.5 ? "#ababab" : "#121212", 1.2, 5]}
      />
      <Keyboard />
      <Suspense fallback={null}>
        <Environment preset={"forest"} background={false} resolution={512} />
        <ContactShadows
          opacity={0.85}
          blur={1}
          resolution={512}
          frames={uiContext === "game" ? 40 : Infinity}
        />
        <Gameboy ref={gbRef} position={[0, 0.5, 0]} rotation-x={GAMEBOY_ROT} />
      </Suspense>

      <mesh scale={50} rotation-x={-Math.PI / 2} position-y={-0.35}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color={colors.floor} />
      </mesh>

      <Camera target={gbRef} />

      {window.location.hash.includes("debug") && (
        <>
          <OrbitControls />
          <StatsGl />
        </>
      )}
    </Canvas>
  );
}

function Camera(props: { target: RefObject<Group> }) {
  const ref = useRef<PerspectiveCameraProps>(null);
  const viewport = useThree((s) => s.viewport);
  const lookAtPos = useMemo(() => [0, 0, 0], []);
  const uiContext = useStore((s) => s.uiContext);
  const tempVec = useMemo(() => new Vector3(), []);
  const tempQuat = useMemo(() => new Quaternion(), []);

  useEffect(() => {
    if (viewport.aspect < 1.1) {
      CAM_POS.z = 1.25;
      CAM_POS.y = 3.5;
    }
  }, [viewport]);

  useFrame(({ clock }, dt) => {
    const target = props.target?.current;
    if (!ref.current || !target?.position) return;

    ref.current.rotation.order = "XZY";
    const { x: sx, y: sy, z: sz } = target.position;
    const { x: cx, y: cy, z: cz } = CAM_POS;
    let [toX, toY, toZ]: [number, number, number] = [0, 0, 0];

    if (["game", "customizing"].includes(uiContext)) {
      tempQuat.setFromAxisAngle(tempVec.set(1, 0, 0), GAMEBOY_ROT);
      tempVec.set(0, 1, 0).applyQuaternion(tempQuat);
      const { x: dx, y: dy, z: dz } = tempVec;
      toX = damp(ref.current.position.x, sx + dx * 1.45, 8, dt);
      toY = damp(ref.current.position.y, sy + dy * 1.45, 8, dt);
      toZ = damp(ref.current.position.z, sz + dz * 1.45, 8, dt);

      lookAtPos[0] = damp(lookAtPos[0], sx, 8, dt);
      lookAtPos[1] = damp(lookAtPos[1], sy, 8, dt);
      lookAtPos[2] = damp(lookAtPos[2], sz - 0.05, 8, dt);
    } else {
      const cx2 = cx + Math.sin(clock.elapsedTime * 0.25) * 0.2;
      toX = damp(ref.current.position.x, cx2, 8, dt);
      toY = damp(ref.current.position.y, cy, 8, dt);
      toZ = damp(ref.current.position.z, cz, 8, dt);

      lookAtPos[0] = damp(lookAtPos[0], sx, 8, dt);
      lookAtPos[1] = damp(lookAtPos[1], sy, 8, dt);
      lookAtPos[2] = damp(lookAtPos[2], sz, 8, dt);
      ref.current.lookAt(lookAtPos[0], lookAtPos[1], lookAtPos[2]);
    }

    ref.current.lookAt(lookAtPos[0], lookAtPos[1], lookAtPos[2]);
    ref.current.position.set(toX, toY, toZ);
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
