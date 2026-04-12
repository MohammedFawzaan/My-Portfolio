"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 mt-auto overflow-hidden bg-background">
      {/* Top glowing border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center gap-8">

        <div className="flex gap-4 items-center">
          <div className="w-16 h-[1px] bg-border" />
          <p className="text-secondary-text text-sm font-bold uppercase tracking-widest text-center">
            Designed & Developed by
          </p>
          <div className="w-16 h-[1px] bg-border" />
        </div>

        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-3xl font-extrabold tracking-tighter text-primary-text drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all hover:scale-110"
        >
          Mohammed Fawzaan
        </motion.a>
      </div>
    </footer>
  );
}
