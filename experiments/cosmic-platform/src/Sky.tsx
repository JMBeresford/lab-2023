import { BackSide } from "three";

export function Sky() {
  return (
    <>
      <hemisphereLight args={["#111", "#550165", 0.5]} />
      <mesh position={[0, 0, -20]} rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
        <sphereGeometry args={[200, 20, 20]} />
        <meshPhongMaterial side={BackSide} />
      </mesh>
    </>
  );
}
