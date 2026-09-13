"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["-14%", "8%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["14%", "-8%"]);
  const labelY = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

  return (
    <div ref={ref} aria-hidden="true" className="section-shell flex items-center gap-5 overflow-hidden py-5 text-secondary-text/55">
      <motion.span className="h-px flex-1 bg-border will-change-transform motion-reduce:!transform-none" style={{ x: leftX }} />
      <motion.span className="font-mono text-[10px] uppercase tracking-[0.28em] will-change-transform motion-reduce:!transform-none" style={{ y: labelY }}>
        Design · Develop · Deliver
      </motion.span>
      <motion.span className="h-px flex-1 bg-border will-change-transform motion-reduce:!transform-none" style={{ x: rightX }} />
    </div>
  );
}
