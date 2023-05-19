import { useThree } from "@react-three/fiber";
import { useMemo } from "react";

export function useMaxWidth() {
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);
  const maxWidth = useMemo(() => {
    // ratio of THREE units to pixels
    const ratio = viewport.width / size.width;

    // max out at 1750px, else 90% of viewport
    return Math.min(viewport.width * 0.9, ratio * 1750);
  }, [viewport, size]);

  return maxWidth;
}
