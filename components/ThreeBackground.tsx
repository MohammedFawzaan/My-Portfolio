"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ThreeBackground() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 72, damping: 24, mass: 0.22 });
  const gridY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const gridX = useTransform(progress, [0, 0.5, 1], ["0%", "2.5%", "-1.5%"]);
  const gridRotate = useTransform(progress, [0, 1], [-0.35, 0.65]);
  const geometryY = useTransform(progress, [0, 1], ["8%", "-32%"]);
  const geometryRotate = useTransform(progress, [0, 0.5, 1], [0, 16, -8]);
  const washColor = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#edf5f0", "#f5eee7", "#eaf2ef", "#f4eee8", "#e9f1ed", "#f1ebe4"],
  );

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div className="absolute inset-0" style={{ backgroundColor: washColor }} />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,254,250,0.88),rgba(255,254,250,0.32)_50%,rgba(255,254,250,0.76))]" />

      <motion.div
        className="site-grid absolute -inset-[18%] opacity-75 will-change-transform motion-reduce:transform-none"
        style={{ x: gridX, y: gridY, rotate: gridRotate, scale: 1.08 }}
      />

      <motion.svg
        viewBox="0 0 720 1100"
        className="absolute -right-32 top-0 h-[115vh] w-[min(55rem,68vw)] text-accent/[0.09] will-change-transform motion-reduce:hidden"
        fill="none"
        style={{ y: geometryY, rotate: geometryRotate }}
      >
        <circle cx="520" cy="290" r="250" stroke="currentColor" strokeWidth="1" strokeDasharray="8 16" />
        <circle cx="520" cy="290" r="170" stroke="currentColor" strokeWidth="1" />
        <path d="M36 948C186 686 298 580 698 434" stroke="currentColor" strokeWidth="1" />
        <path d="M110 1054C258 760 390 680 710 570" stroke="currentColor" strokeWidth="1" strokeDasharray="3 14" />
        <path d="M520 40V540M270 290H720" stroke="currentColor" strokeWidth="1" opacity=".5" />
      </motion.svg>

      <motion.div
        className="absolute left-[8vw] top-[24vh] h-px w-[34vw] origin-left bg-gradient-to-r from-accent/20 to-transparent motion-reduce:hidden"
        style={{ scaleX: useTransform(progress, [0, 0.35, 1], [0.3, 1, 0.55]) }}
      />
      <motion.div
        className="absolute bottom-[18vh] right-[7vw] h-[36vh] w-px origin-bottom bg-gradient-to-t from-signal/20 to-transparent motion-reduce:hidden"
        style={{ scaleY: useTransform(progress, [0, 0.55, 1], [0.25, 0.75, 1]) }}
      />

      <div className="noise absolute inset-0 opacity-[0.032] mix-blend-multiply" />
      <div className="absolute inset-y-0 right-0 w-px bg-primary-text/[0.06]" />
      <motion.div className="absolute right-0 top-0 h-full w-[2px] origin-top bg-accent/55" style={{ scaleY: progress }} />
    </div>
  );
}
