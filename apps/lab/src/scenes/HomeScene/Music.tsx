"use client";

import { useLabStore } from "@/helpers/store";
import { PositionalAudio } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PositionalAudio as PositionalAudioType } from "three";

type Props = JSX.IntrinsicElements["positionalAudio"] & { startTime?: number };

export function Music(props: Props) {
  const ref = useRef<PositionalAudioType>();
  const muted = useLabStore((s) => s.muted);
  const entered = useLabStore((s) => s.entered);
  const path = usePathname();
  const { startTime, ...restProps } = props;

  const [inFocus, setInFocus] = useState<boolean>(true);

  useEffect(() => {
    const handler = (e: Event) => {
      setInFocus(!document.hidden);
    };

    document.addEventListener("visibilitychange", handler);

    return () => {
      document.removeEventListener("visibilitychange", handler);
    };
  }, []);

  useLayoutEffect(() => {
    if (entered && !ref.current.isPlaying) {
      ref.current.gain.gain.value = 0;

      ref.current.play(startTime ?? 0);
    }
  }, [entered, startTime]);

  useEffect(() => {
    if (!ref.current.isPlaying) return;
    if (!muted && inFocus && ["/", "/experiments"].includes(path)) {
      const gain = ref.current.gain.gain;

      gain.setValueAtTime(gain.value, ref.current.context.currentTime);
      gain.linearRampToValueAtTime(0.25, ref.current.context.currentTime + 2);
    } else {
      const gain = ref.current.gain.gain;

      gain.setValueAtTime(gain.value, ref.current.context.currentTime);
      gain.linearRampToValueAtTime(0, ref.current.context.currentTime + 2);
    }
  }, [muted, inFocus, path]);

  return (
    // @ts-expect-error upstream types are wrong
    <PositionalAudio
      ref={ref}
      url="/audio/music.mp3"
      loop
      distance={100}
      position={[0, 0, -1]}
      {...restProps}
    />
  );
}
