"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  size?: "display" | "compact";
}

export default function SectionHeading({ eyebrow, title, intro, align = "left", size = "display" }: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`${size === "compact" ? "mb-8 sm:mb-10" : "mb-12 sm:mb-16"} ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -24 },
          visible: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] } },
        }}
        className={`eyebrow ${align === "center" ? "justify-center before:hidden" : ""}`}
      >
        {eyebrow}
      </motion.span>
      <div className="mt-5 overflow-hidden pb-[0.16em]">
        <motion.h2
          variants={{
            hidden: { y: "108%", rotate: 1.5 },
            visible: { y: 0, rotate: 0, transition: { duration: reduceMotion ? 0 : 0.82, ease: [0.16, 1, 0.3, 1] } },
          }}
          className={`font-semibold text-primary-text ${size === "compact" ? "text-[clamp(2.25rem,5vw,4rem)] leading-[1.06] tracking-[-0.045em]" : "text-[clamp(2.6rem,7vw,5.8rem)] leading-[1] tracking-[-0.055em]"}`}
        >
          {title}
        </motion.h2>
      </div>
      {intro && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="mt-6 max-w-2xl text-[1.0625rem] leading-7 text-secondary-text sm:text-lg"
        >
          {intro}
        </motion.p>
      )}
    </motion.header>
  );
}
