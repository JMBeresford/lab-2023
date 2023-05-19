import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { clamp } from "three/src/math/MathUtils";

export function Post() {
  const { size } = useThree();

  return (
    <EffectComposer multisampling={4}>
      {/* @ts-expect-error lib type error */}
      <Bloom luminanceThreshold={1} height={clamp(size.height / 3, 200, 400)} intensity={0.75} />
    </EffectComposer>
  );
}
