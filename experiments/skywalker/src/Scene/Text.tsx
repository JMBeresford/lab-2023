import { useRef, Suspense } from "react";
import { Text as TextImpl } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import font from "experiment-assets/fonts/MajorMonoDisplay.ttf";

export const Text = () => {
  const ref = useRef();

  const { size } = useThree();

  return (
    <Suspense fallback={null}>
      <TextImpl
        ref={ref}
        font={font}
        textAlign="center"
        position={[0, 0, -10]}
        letterSpacing={0.2}
        fontSize={size.width > 1000 ? 5 : 3.75}
        fillOpacity={0.2}
        strokeColor="black"
        outlineColor="black"
        // @ts-expect-error type error in drei missing 'text' prop
        text={`click${"\n"}drag${"\n"}zoom`}
      />
    </Suspense>
  );
};
