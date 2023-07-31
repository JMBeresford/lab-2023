import { SpringValue, useSpring } from "@react-spring/three";
import { useKeyboard } from "../utils/KeyboardHandlers";

const KEY_DOWN = -0.005;
const PAD_ROT = -0.065;

type Buttons = {
  dpadX: SpringValue<number>;
  dpadY: SpringValue<number>;
  a: SpringValue<number>;
  b: SpringValue<number>;
  start: SpringValue<number>;
  select: SpringValue<number>;
  menu: SpringValue<number>;
};

const getRot = (pos: boolean, neg: boolean) => {
  if (pos && neg) return 0;
  if (pos) return PAD_ROT;
  if (neg) return -PAD_ROT;
  return 0;
};

export function useButtons() {
  const keysPressed = useKeyboard();

  const buttons: Record<keyof Buttons, SpringValue> = useSpring({
    dpadX: getRot(keysPressed.right, keysPressed.left),
    dpadY: getRot(keysPressed.up, keysPressed.down),
    a: keysPressed.a ? KEY_DOWN : 0,
    b: keysPressed.b ? KEY_DOWN : 0,
    start: keysPressed.start ? KEY_DOWN : 0,
    select: keysPressed.select ? KEY_DOWN : 0,
    menu: keysPressed.menu ? KEY_DOWN : 0,
    config: {
      mass: 0.08,
      tension: 500,
    },
  });

  return buttons;
}
