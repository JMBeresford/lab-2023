import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { ACESFilmicToneMapping, PerspectiveCamera as PerspectiveCameraProps } from "three";
import { Sphere } from "./Sphere";
import { Sky } from "./Sky";

function Camera() {
  const camRef = useRef<PerspectiveCameraProps>(null);
  const { viewport, controls } = useThree();

  useEffect(() => {
    if (viewport.width < 5 && camRef.current) {
      camRef.current.position.z = 15;
    }
  }, [viewport]);

  console.log(controls);

  return (
    <>
      <PerspectiveCamera makeDefault ref={camRef} position={[1.65, -2.3, 10.1]} />
      <OrbitControls
        makeDefault
        enablePan={false}
        maxDistance={20}
        minDistance={6}
        enableDamping={true}
        dampingFactor={0.025}
      />
    </>
  );
}

export function Scene() {
  return (
    <Canvas gl={{ toneMapping: ACESFilmicToneMapping }}>
      <color attach="background" args={["#000"]} />

      {/* <HeroText /> */}

      <Sphere />
      <Sky />
      <Camera />
    </Canvas>
  );
}
