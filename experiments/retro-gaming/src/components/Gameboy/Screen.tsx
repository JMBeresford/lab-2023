import { useEffect, useMemo, useRef } from "react";
import { BufferGeometry, DataTexture, Mesh, MeshBasicMaterial } from "three";
import { useStore } from "../../store";
import { SCALE } from "../../utils/Emulator";

export function Screen(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<Mesh<BufferGeometry, MeshBasicMaterial>>(null);
  const renderBuffer = useMemo(() => new Uint8Array(160 * SCALE * 144 * SCALE * 4), []);
  const dataTexture = useMemo(() => new DataTexture(renderBuffer, 160, 144), [renderBuffer]);
  dataTexture.flipY = true;
  const setOnFrameFinished = useStore((s) => s.setOnFrameFinished);

  useEffect(() => {
    async function setRenderFrame() {
      await setOnFrameFinished((imgData) => {
        if (ref.current?.material.map) {
          renderBuffer.set(imgData);
          ref.current.material.map.needsUpdate = true;
        }
      });
    }

    setRenderFrame();
  }, [renderBuffer, setOnFrameFinished]);

  return (
    <mesh ref={ref} {...props} scale={[0.39, 0.355, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={dataTexture} />
    </mesh>
  );
}
