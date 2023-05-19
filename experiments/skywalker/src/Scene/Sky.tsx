import { Environment } from "@react-three/drei";
import { BackSide } from "three";
import envMap from "experiment-assets/skywalker/env.hdr?url";

export const Sky = () => {
  return (
    <>
      <mesh>
        <sphereGeometry args={[30, 12, 12]} />
        <meshStandardMaterial side={BackSide} color="#666666" envMapIntensity={0.5}>
          {/* <GradientTexture stops={[1, 0]} colors={['#333366', '#443333']} /> */}
        </meshStandardMaterial>
      </mesh>
      <Environment files={envMap} />
    </>
  );
};
