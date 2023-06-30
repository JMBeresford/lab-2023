import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Euler, Group, PerspectiveCamera as PerspectiveCameraProps, Vector3 } from "three";
import { damp } from "three/src/math/MathUtils";

const Scenes = ["/", "/experiments"] as const;

type Scenes = typeof Scenes[number];

type Rig = {
  position: Vector3 | { x: number; y: number; z: number };
  rotation: Euler | { x: number; y: number; z: number };
};

const Rigs: Record<Scenes, Rig> = {
  "/": {
    position: { x: 0, y: 1.5, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  "/experiments": {
    position: { x: 0, y: 5, z: 0 },
    rotation: { x: Math.PI / 4, y: 0, z: 0 },
  },
};

export function Camera() {
  const groupRef = useRef<Group>(undefined);
  const ref = useRef<PerspectiveCameraProps>(undefined);
  const path = usePathname();
  const size = useThree((state) => state.size);
  const [rig, setRig] = useState<Rig>(undefined);

  useEffect(() => {
    if (size.width <= 768) {
      ref.current.fov = 75;
    } else {
      ref.current.fov = 50;
    }
  }, [size]);

  useEffect(() => {
    let newRig = Rigs[path];
    if (rig == undefined) {
      groupRef.current.position.set(newRig.position.x, newRig.position.y, newRig.position.z);
      groupRef.current.rotation.set(newRig.rotation.x, newRig.rotation.y, newRig.rotation.z);
    }
    setRig(newRig);
  }, [path, rig]);

  useFrame(({ mouse }, dt) => {
    if (!rig) return;

    const x = mouse.x * 0.1;
    const y = mouse.y * 0.1;

    const position = rig.position;
    const rotation = rig.rotation;
    const lambda = 2;

    if (position && rotation) {
      groupRef.current.position.x = damp(groupRef.current.position.x, position.x, lambda, dt);
      groupRef.current.position.y = damp(groupRef.current.position.y, position.y, lambda, dt);
      groupRef.current.position.z = damp(groupRef.current.position.z, position.z, lambda, dt);

      groupRef.current.rotation.x = damp(groupRef.current.rotation.x, rotation.x, lambda, dt);
      groupRef.current.rotation.y = damp(groupRef.current.rotation.y, rotation.y, lambda, dt);
      groupRef.current.rotation.z = damp(groupRef.current.rotation.z, rotation.z, lambda, dt);
    }

    ref.current.position.x = damp(ref.current.position.x, x, 2, dt);
    ref.current.position.y = damp(ref.current.position.y, y, 2, dt);
  });

  return (
    <group ref={groupRef}>
      <PerspectiveCamera ref={ref} makeDefault near={0.01} far={1000} />
    </group>
  );
}
