import { useFrame, useThree } from "@react-three/fiber";
import { ReticleMaterial, ReticleMaterialProps } from "./shader";
import { useEffect, useRef } from "react";
import { BufferGeometry, Mesh } from "three";
import { damp } from "three/src/math/MathUtils";
import { useLabStore } from "@/helpers/store";
import { useSpring } from "@react-spring/three";
import { useTexture } from "@react-three/drei";

export function Reticle() {
  const ref = useRef<Mesh<BufferGeometry, ReticleMaterialProps>>(null);
  const { width, height } = useThree((state) => state.size);
  const hovering = useLabStore((state) => state.hovering);
  const mobile = useLabStore((state) => state.mobile);

  const baseTexture = useTexture("/reticle/base.png");
  const dashedTexture = useTexture("/reticle/dashed.png");
  const halfTexture = useTexture("/reticle/half.png");
  const crosshairTexture = useTexture("/reticle/cross.png");

  const { hovered, visible } = useSpring({
    hovered: hovering ? 1 : 0,
    visible: mobile ? 0 : 1,
  });

  useFrame(({ mouse, clock }, dt) => {
    if (!ref.current) return;
    const mx = ((mouse.x + 1.0) / 2) * width;
    const my = ((mouse.y + 1.0) / 2) * height;

    const lambdaMouse = 6;
    const lambdaInnerCluster = 4;

    ref.current.material.uTime = clock.elapsedTime;

    ref.current.material.uniforms.uMouse.value.x = damp(
      ref.current.material.uniforms.uMouse.value.x,
      mx,
      lambdaMouse,
      dt,
    );
    ref.current.material.uniforms.uMouse.value.y = damp(
      ref.current.material.uniforms.uMouse.value.y,
      my,
      lambdaMouse,
      dt,
    );

    ref.current.material.uniforms.uMouseInnerCluster.value.x = damp(
      ref.current.material.uniforms.uMouseInnerCluster.value.x,
      mx,
      lambdaInnerCluster,
      dt,
    );
    ref.current.material.uniforms.uMouseInnerCluster.value.y = damp(
      ref.current.material.uniforms.uMouseInnerCluster.value.y,
      my,
      lambdaInnerCluster,
      dt,
    );
  });

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      if (e.pointerType === "mouse" && useLabStore.getState().mobile) {
        useLabStore.setState({ mobile: false });
      }
    }

    document.body.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <mesh ref={ref} position-z={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-expect-error bad lib types */}
      <ReticleMaterial
        uResolution={[width, height]}
        uHovered={hovered}
        uReticleBase={baseTexture}
        uReticleDashed={dashedTexture}
        uReticleHalf={halfTexture}
        uCrosshair={crosshairTexture}
        uVisible={visible}
      />
    </mesh>
  );
}
