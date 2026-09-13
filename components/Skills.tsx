"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Boxes, Braces, CloudCog, Sparkles } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const iconUrls: Record<string, string> = {
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "C/C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  Expo: "https://cdn.simpleicons.org/expo/14211D",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg",
  Electron: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "ShadCN UI": "https://cdn.simpleicons.org/shadcnui/14211D",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.simpleicons.org/express/14211D",
  NestJS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  "Prisma ORM": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  TypeORM: "https://cdn.simpleicons.org/typeorm/FE0803",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  Nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  LangChain: "https://cdn.simpleicons.org/langchain/1C3C3C",
  LangGraph: "https://cdn.simpleicons.org/langgraph/1C3C3C",
  "Gemini SDK": "https://cdn.simpleicons.org/googlegemini/4E75A3",
  "Claude SDK": "https://cdn.simpleicons.org/claude/D97757",
  RAG: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/networkx/networkx-original.svg",
  QdrantDB: "https://cdn.simpleicons.org/qdrant/DC244C",
};

const groups = [
  {
    title: "Product interfaces",
    note: "Web, mobile & desktop",
    description: "Responsive interfaces and cross-platform product experiences.",
    icon: Braces,
    className: "lg:col-span-7",
    accent: "bg-[#e4f1ed] text-[#0f7668]",
    names: ["JavaScript", "TypeScript", "React.js", "Next.js", "React Native", "Expo", "Vite", "Electron", "Tailwind CSS", "ShadCN UI"],
  },
  {
    title: "Backend systems",
    note: "APIs & application logic",
    description: "Reliable services, APIs, and strongly structured application logic.",
    icon: Boxes,
    className: "lg:col-span-5",
    accent: "bg-[#f8e8e1] text-[#c65335]",
    names: ["Node.js", "Express.js", "NestJS", "Java", "Python", "C/C++"],
  },
  {
    title: "Data & infrastructure",
    note: "Persistence, delivery & scale",
    description: "Data layers and infrastructure for dependable production systems.",
    icon: CloudCog,
    className: "lg:col-span-8",
    accent: "bg-[#e9edf5] text-[#4b628c]",
    names: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma ORM", "TypeORM", "Docker", "Nginx", "Git"],
  },
  {
    title: "Applied intelligence",
    note: "Agents & AI products",
    description: "LLM workflows grounded in useful, real-world product behavior.",
    icon: Sparkles,
    className: "lg:col-span-4",
    accent: "bg-[#f1eadb] text-[#9a6a22]",
    names: ["LangChain", "LangGraph", "Gemini SDK", "Claude SDK", "RAG", "QdrantDB"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills({ skills }: { skills: string[] }) {
  const reduceMotion = useReducedMotion();
  const available = new Set(skills);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.2 });
  const statsX = useTransform(progress, [0, 1], [34, -18]);

  return (
    <section ref={sectionRef} id="skills" className="section-pad border-y border-border bg-[#e9ede7]/72">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Engineering stack / 03"
            title="Tools chosen with intent."
            intro="A broad, practical stack for taking products from interface and application logic through data, infrastructure, and intelligent automation."
          />

          <motion.div style={{ x: statsX }} className="mb-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-surface/75 shadow-[var(--shadow-sm)] will-change-transform motion-reduce:!transform-none sm:mb-16">
            <div className="min-w-28 px-5 py-4">
              <strong className="block text-2xl font-semibold text-primary-text">30+</strong>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.12em] text-secondary-text">Technologies</span>
            </div>
            <div className="min-w-28 border-l border-border px-5 py-4">
              <strong className="block text-2xl font-semibold text-primary-text">04</strong>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.12em] text-secondary-text">Systems</span>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {groups.map((group, groupIndex) => {
            const Icon = group.icon;
            const items = group.names.filter((name) => available.has(name));

            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0.35, clipPath: groupIndex % 2 ? "inset(0 0 0 22% round 1.75rem)" : "inset(0 22% 0 0 round 1.75rem)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0 round 1.75rem)" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : groupIndex * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className={`group rounded-[1.75rem] border border-border bg-surface/90 p-5 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[0_20px_54px_rgba(31,51,44,0.10)] sm:p-7 ${group.className}`}
              >
                <header className="flex items-start gap-4 border-b border-border pb-5">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${group.accent}`}>
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold text-primary-text sm:text-2xl">{group.title}</h3>
                      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary-text">{group.note}</span>
                    </div>
                    <p className="mt-2 max-w-xl text-[0.95rem] leading-6 text-secondary-text">{group.description}</p>
                  </div>
                </header>

                <motion.div
                  variants={{
                    ...containerVariants,
                    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.045 } },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className={`mt-5 grid grid-cols-2 gap-2.5 ${items.length > 6 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
                >
                  {items.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={itemVariants}
                      transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className="group/skill flex min-h-16 items-center gap-3 rounded-2xl border border-transparent bg-[#f3f3ee] px-3 py-2.5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-white"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/[0.07] bg-white p-2 shadow-[0_3px_10px_rgba(20,33,29,0.05)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={iconUrls[skill]} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-contain transition-transform duration-200 group-hover/skill:scale-110" />
                      </div>
                      <span className="text-sm font-semibold leading-tight text-primary-text sm:text-[0.95rem]">{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
