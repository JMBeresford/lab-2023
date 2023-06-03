"use client";

import { Leva } from "leva";
import { useEffect, useState } from "react";

export function Debug() {
  const [debug, setDebug] = useState(false);

  useEffect(() => setDebug(window.location.hash.includes("debug")), []);

  return <Leva hidden={!debug} titleBar={{ position: { x: 0, y: 50 } }} />;
}
