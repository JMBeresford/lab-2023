import { Text, useCursor } from "@react-three/drei";
import { Euler, Vector3, useThree } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import { useControls } from "leva";
import { clamp } from "three/src/math/MathUtils.js";
import { Input, Label } from "r3f-form";
import { Text as InputText } from "r3f-form/dist/Input";

type Props = {
  position?: Vector3;
  rotation?: Euler;
  width?: number;
};

export function Login(props: Props) {
  const { width = 1.5, position, rotation } = props;
  const [hovered, setHovered] = useState(false);
  const viewport = useThree((s) => s.viewport);

  const { buttonSize } = useSpring({
    buttonSize: hovered ? 1.025 : 1,
  });

  const { fontSize } = useControls(
    "text",
    {
      fontSize: { value: 0.0825, min: 0.01, max: 0.6, step: 0.01 },
    },
    { collapsed: true },
  );

  const w = useMemo(
    () => clamp(width, 0.55, (viewport.width / viewport.distance) * 0.9),
    [viewport, width],
  );

  const labelFontSize = fontSize * (w < 1.2 ? 0.5 : 0.85);
  const inputFontSize = fontSize * (w < 1.2 ? 0.55 : 1);

  useCursor(hovered);

  return (
    <group position={position} rotation={rotation}>
      <Label text="Username" fontSize={labelFontSize} />
      <Input width={w} type="text">
        <InputText fontSize={inputFontSize} />
      </Input>

      <group position={[0, -0.3, 0]}>
        <Label text="Password" fontSize={labelFontSize} />
        <Input width={w} type="password">
          <InputText fontSize={inputFontSize} />
        </Input>
      </group>

      <group
        position-y={-0.6}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <animated.mesh scale={buttonSize} renderOrder={1}>
          <boxGeometry args={[w, 0.15, 0.01]} />
          <meshBasicMaterial color={"#7777ff"} transparent depthWrite={false} />
        </animated.mesh>

        <Text
          position={[0, -0.03, 0.0]}
          depthOffset={0.2}
          fontSize={0.0825}
          anchorY="bottom-baseline"
          renderOrder={2}
        >
          Login
          <meshBasicMaterial color="black" transparent />
        </Text>
      </group>
    </group>
  );
}
