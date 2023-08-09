import { useLabStore } from "@/helpers/store";
import { PositionalAudio } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import { PositionalAudio as PositionalAudioType } from "three";
import { randFloat } from "three/src/math/MathUtils";

type Props = JSX.IntrinsicElements["positionalAudio"];

export function HoverSound(props: Props) {
  const ref = useRef<PositionalAudioType>();
  const muted = useLabStore((s) => s.muted);
  const hovering = useLabStore((s) => s.hovering);

  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.setVolume(0.25);
  }, []);

  useLayoutEffect(() => {
    if (hovering && !muted && ref.current != undefined) {
      if (ref.current.isPlaying) {
        ref.current.stop();
      }

      ref.current.setPlaybackRate(randFloat(1.0, 1.55));
      ref.current.play();
    }
  }, [hovering, muted]);

  return (
    // @ts-expect-error upstream type error
    <PositionalAudio ref={ref} url="/audio/button.mp3" loop={false} distance={1000} {...props} />
  );
}
