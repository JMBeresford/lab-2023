"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageWrapper(props: { children: ReactNode }) {
  return (
    <motion.div
      style={{ width: "min(90%, 1750px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {props.children}
    </motion.div>
  );
}
