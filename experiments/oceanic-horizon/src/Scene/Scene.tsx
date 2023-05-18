import { Canvas } from "@react-three/fiber";
import Sky from "./Sky";
import Ocean from "./Ocean";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export function Scene() {
  return (
    <Canvas>
      <Sky />
      <Ocean />

      <PerspectiveCamera makeDefault={true} />

      <OrbitControls
        position={[0, 2.5, 0]}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.025}
        target={[0, 2.5, 0]}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
