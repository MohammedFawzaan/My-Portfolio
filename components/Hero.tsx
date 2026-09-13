"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { useRef } from "react";

interface HeroProps {
  hero: { name: string; title: string; tagline: string; summary: string };
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ hero }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.2 });
  const copyY = useTransform(progress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(progress, [0, 0.78, 1], [1, 0.92, 0.25]);
  const portraitY = useTransform(progress, [0, 1], [0, 120]);
  const portraitRotate = useTransform(progress, [0, 1], [0, -3]);
  const portraitScale = useTransform(progress, [0, 1], [1, 0.92]);

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-hidden pt-24 sm:pt-32 lg:min-h-[100svh]">
      <div className="section-shell grid items-start gap-10 pb-20 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10 lg:pb-14">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 will-change-transform motion-reduce:!translate-y-0 motion-reduce:!opacity-100">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="eyebrow">Available for opportunities</span>
            <a href="https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20India" target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-full border border-accent/25 bg-[#e4f3ec]/85 px-3.5 py-1.5 text-xs font-bold text-accent shadow-[0_8px_24px_rgba(15,118,104,0.10)] transition-transform hover:-translate-y-0.5 sm:inline-flex"><MapPin size={13} /> Hyderabad, India <ArrowUpRight size={12} /></a>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-[clamp(3.5rem,9.7vw,8.6rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
          >
            <span className="block overflow-hidden pb-[0.08em]"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }} className="block">Building</motion.span></span>
            <span className="ml-[8vw] block overflow-hidden pb-[0.08em] sm:ml-20"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }} className="editorial-serif block italic text-accent">Softwares</motion.span></span>
            <span className="block overflow-hidden pb-[0.08em]"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.16, ease }} className="block">that ships.</motion.span></span>
          </motion.h1>

          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease }} className="mt-7 flex max-w-2xl flex-col gap-6 border-l border-border pl-5 sm:mt-9 sm:flex-row sm:items-end sm:justify-between sm:pl-7">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-signal">{hero.name}</p>
              <p className="mt-2 max-w-xl text-base leading-7 text-secondary-text sm:text-lg">{hero.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a href="#projects" className="button-primary">Explore work <ArrowDownRight size={17} /></a>
              <a href="/Resume.pdf" target="_blank" className="button-secondary" aria-label="Open resume">Résumé <ArrowUpRight size={16} /></a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: portraitY, rotate: portraitRotate, scale: portraitScale }} className="relative mx-auto w-full max-w-[430px] will-change-transform motion-reduce:!transform-none lg:justify-self-end">
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.35, ease }} className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-border bg-[#dce7e1] p-3 shadow-[var(--shadow-lg)]">
            <div className="relative h-full overflow-hidden rounded-[1.65rem]">
              <Image src="/avatar.jpeg" alt={hero.name} fill priority sizes="(max-width: 1024px) 90vw, 430px" className="object-cover grayscale-[15%] transition-transform duration-700 hover:scale-[1.025]" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#14211d]/65 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">Current focus</p><p className="mt-1 text-lg font-semibold">AI Engineering</p></div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-white/10 backdrop-blur"><ArrowUpRight size={18} /></span>
              </div>
            </div>
          </motion.div>
          <motion.div animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="paper-card absolute -left-6 top-10 rounded-2xl px-4 py-3 sm:-left-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary-text">Engineer mode</p>
            <p className="mt-1 text-sm font-semibold">Idea → Production</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
