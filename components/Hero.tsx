"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import ThreeBackground from "./ThreeBackground";

interface HeroProps {
  hero: {
    name: string;
    title: string;
    tagline: string;
    summary: string;
  };
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
};

export default function Hero({ hero }: HeroProps) {
  const nameChars = hero.name.split("");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      <ThreeBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden aspect-square shadow-[0_0_40px_rgba(6,182,212,0.4)] border-2 border-accent"
            >
              <Image src="/avatar.jpeg" alt={hero.name} fill className="object-cover" priority sizes="(max-width: 768px) 128px, 160px" />
            </motion.div>
            <div className="flex flex-col">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-primary-text drop-shadow-lg flex flex-wrap"
              >
                {hero.name}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.8 }}
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500 mt-2"
              >
                {hero.title}
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-light text-primary-text leading-tight drop-shadow-md"
          >
            {hero.tagline}
          </motion.p>
        </motion.div>

        {/* Right Side - Custom About Me */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative group flex flex-col gap-6"
        >
          <h3 className="text-sm font-bold tracking-[0.2em] text-accent uppercase drop-shadow-sm">About Me</h3>
          <p className="text-primary-text leading-relaxed text-lg lg:text-xl font-medium relative z-10 drop-shadow-sm">
            I am a passionate software engineer dedicated to building resilient, high-performance systems and intuitive user interfaces. I thrive at the intersection of complex backend architecture and sleek, engaging frontend design. My focus is on crafting digital experiences that are robust, scalable, and visually compelling.
          </p>
          <h3 className="text-sm font-bold tracking-[0.2em] text-accent uppercase drop-shadow-sm">I am Good at</h3>
          <ul className="space-y-3 mt-2">
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-3 text-primary-text font-bold text-lg drop-shadow-sm"
            >
              <span className="text-purple-500">▹</span> Data Structures & Algorithms (Problem Solving)
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-3 text-primary-text font-bold text-lg drop-shadow-sm"
            >
              <span className="text-purple-500">▹</span> Full-Stack Web Development
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="flex items-center gap-3 text-primary-text font-bold text-lg drop-shadow-sm"
            >
              <span className="text-purple-500">▹</span> Mobile App Development
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
              className="flex items-center gap-3 text-primary-text font-bold text-lg drop-shadow-sm"
            >
              <span className="text-purple-500">▹</span> Backend API & System Design
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
