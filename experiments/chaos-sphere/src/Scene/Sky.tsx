import { BackSide } from "three";
import { useLighting } from "./useLighting";

export function Sky() {
  const { light1Color, light2Color } = useLighting();

  return (
    <group>
      <hemisphereLight args={[light2Color, light1Color, 0.5]} />
      <mesh>
        <sphereGeometry args={[100, 100, 100]} />
        <meshPhongMaterial side={BackSide} />
      </mesh>
    </group>
  );
}
