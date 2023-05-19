import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Lightsaber } from "./Lightsaber";
import { Sky } from "./Sky";
import { Text } from "./Text";
import { Post } from "./Post";

function Camera() {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, size.width > 1000 ? 6 : 10);
    camera.lookAt(0, 0, 0);
  }, [camera, size]);

  return null;
}

export function Scene() {
  return (
    <Canvas>
      <Sky />
      <Text />

      <Lightsaber />
      <Post />

      <Camera />
      <OrbitControls
        enableDamping={true}
        maxDistance={20}
        minDistance={3}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.2}
        enablePan={false}
      />
    </Canvas>
  );
}
