"use client";

import { Leva } from "leva";
import { useSearchParams } from "next/navigation";

export function Debug() {
  "use client";
  const params = useSearchParams();
  return <Leva hidden={!params.get("debug")} />;
}
