"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Mic, Terminal, WandSparkles } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

interface ProjectItem {
  title: string;
  problem: string;
  techStack: string[];
  description: string;
  keyFeatures: string[];
  links: { github: string; live: string };
  logo?: string;
}

const themes = [
  { bg: "#dfeee8", ink: "#0f7668", accent: "#a9d6c8" },
  { bg: "#f2e2d7", ink: "#b84e31", accent: "#e6b9a2" },
  { bg: "#e2e9f2", ink: "#315c8b", accent: "#b8cbe2" },
  { bg: "#eee7d5", ink: "#806527", accent: "#d9c99e" },
  { bg: "#e7e1ed", ink: "#69517c", accent: "#cdbed9" },
  { bg: "#dfecea", ink: "#266963", accent: "#aed4cf" },
];

const GithubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.02c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.75.4-1.27.74-1.56-2.58-.3-5.3-1.3-5.3-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.47.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.5 3.16-1.18 3.16-1.18.62 1.57.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.4-2.72 5.39-5.31 5.68.42.36.79 1.06.79 2.14v3.04c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

function ProjectVisual({ project, index }: { project: ProjectItem; index: number }) {
  const theme = themes[index % themes.length];
  const isAgent = project.title.toLowerCase().includes("desktop ai");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, mass: 0.2 });
  const visualY = useTransform(progress, [0, 1], [52, -42]);
  const previewScale = useTransform(progress, [0, 0.5, 1], [0.94, 1, 0.96]);
  const accentX = useTransform(progress, [0, 1], [28, -36]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(8% 4% 8% 4% round 2.4rem)", opacity: 0.45 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.8rem)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[330px] overflow-hidden rounded-[1.8rem] border border-black/10 p-5 sm:min-h-[430px] sm:p-7"
      style={{ background: theme.bg, y: visualY }}
    >
      <motion.div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-60 blur-2xl motion-reduce:!transform-none" style={{ background: theme.accent, x: accentX }} />
      <div className="relative flex items-center justify-between border-b border-black/10 pb-4 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: theme.ink }}>
        <span>Case study / 0{index + 1}</span>
        <span>Built by MF</span>
      </div>

      <motion.div style={{ scale: previewScale }} className="relative mt-6 h-[245px] overflow-hidden rounded-2xl border border-black/10 bg-[#fffefa]/80 shadow-[0_22px_50px_rgba(20,33,29,0.12)] will-change-transform motion-reduce:!transform-none sm:h-[320px]">
        <div className="flex h-9 items-center gap-1.5 border-b border-black/10 px-4">
          <span className="h-2 w-2 rounded-full bg-[#e56542]" /><span className="h-2 w-2 rounded-full bg-[#e7b94f]" /><span className="h-2 w-2 rounded-full bg-[#67a878]" />
          <span className="ml-3 h-4 w-2/5 rounded-full bg-black/[0.05]" />
        </div>

        {isAgent ? (
          <div className="grid h-[calc(100%-2.25rem)] grid-cols-[58px_1fr] sm:grid-cols-[78px_1fr]">
            <div className="border-r border-black/10 p-3">
              <div className="grid aspect-square place-items-center rounded-xl text-white" style={{ background: theme.ink }}><WandSparkles size={19} /></div>
              <div className="mt-4 space-y-2">{[1, 2, 3].map((item) => <span key={item} className="block h-2 rounded-full bg-black/[0.07]" />)}</div>
            </div>
            <div className="flex flex-col justify-between p-4 sm:p-6">
              <div>
                <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: theme.ink }}><WandSparkles size={15} /></span><div><p className="text-sm font-semibold">Friday</p><p className="text-[10px] text-secondary-text">Desktop agent · ready</p></div></div>
                <div className="mt-5 ml-auto max-w-[85%] rounded-2xl rounded-br-sm px-4 py-3 text-xs text-white sm:text-sm" style={{ background: theme.ink }}>Find my latest résumé and open it.</div>
                <div className="mt-3 max-w-[90%] rounded-2xl rounded-bl-sm border border-black/10 bg-white px-4 py-3 text-xs sm:text-sm"><span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider" style={{ color: theme.ink }}><Terminal size={12} /> Tool sequence</span>Located the file and opened it successfully.</div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 p-2.5 text-[10px] text-secondary-text"><Mic size={14} style={{ color: theme.ink }} /> Ask Friday to take an action…</div>
            </div>
          </div>
        ) : (
          <div className="relative flex h-[calc(100%-2.25rem)] items-center justify-center p-7 sm:p-10">
            <div className="absolute left-5 top-5 h-16 w-24 rounded-xl border border-black/10 bg-white/55 sm:h-20 sm:w-32" />
            <div className="absolute bottom-5 right-5 h-20 w-28 rounded-xl border border-black/10 bg-white/55 sm:h-24 sm:w-36" />
            <div className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-3 shadow-[0_16px_40px_rgba(20,33,29,0.13)] sm:h-40 sm:w-40">
              {project.logo ? <Image src={project.logo} alt="" fill sizes="160px" className="object-cover" /> : <span className="text-4xl font-semibold" style={{ color: theme.ink }}>{project.title.slice(0, 2)}</span>}
            </div>
            <span className="absolute bottom-7 left-7 rounded-full bg-white/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: theme.ink }}>Product preview</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="section-pad relative overflow-hidden">
      <div className="section-shell">
        <SectionHeading eyebrow="Selected work / 02" title="Products, not just projects." intro="A selection of full-stack, mobile, and AI systems—presented through the problems they solve and the engineering behind them." />

        <div className="space-y-20 sm:space-y-28">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 44 : -44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className={index % 2 ? "lg:order-2" : ""}><ProjectVisual project={project} index={index} /></div>
              <div className={index % 2 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-text"><span>0{index + 1}</span><span className="h-px flex-1 bg-border" /><span>{project.techStack[0]}</span></div>
                <h3 className="mt-6 text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.055em]">{project.title}</h3>
                <p className="mt-5 text-lg font-medium leading-7 text-accent">{project.problem}</p>
                <p className="mt-5 leading-7 text-secondary-text">{project.description}</p>

                <ul className="mt-7 grid gap-3 border-y border-border py-6 sm:grid-cols-2">
                  {project.keyFeatures.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm leading-6 text-primary-text"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{feature}</li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="rounded-full border border-[#b8d8c7] bg-[#e4f3ec] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#1f5f4f] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">{tech}</span>)}</div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="button-primary"><GithubIcon /> Source code</a>
                  {project.links.live && project.links.live !== "coming-soon" && <a href={project.links.live} target="_blank" rel="noreferrer" className="button-secondary">View product <ArrowUpRight size={17} /></a>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
