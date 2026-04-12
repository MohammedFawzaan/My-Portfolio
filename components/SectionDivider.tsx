"use client";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative w-full h-24 -mt-1 z-30 overflow-hidden">
      {/* Animated glowing line */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #3B82F6 25%, #7C3AED 50%, #3B82F6 75%, transparent 100%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Glowing pulse behind the line */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-16 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scaleX: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Top gradient bleed from hero */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-background to-transparent" />
      {/* Bottom gradient bleed into skills */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
