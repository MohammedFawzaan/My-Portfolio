"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Building2, CalendarDays, Sparkles } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

interface ExperienceItem {
  role: string;
  company: string;
  link: string;
  duration: string;
  current?: boolean;
  responsibilities: string[];
}

function RoleMilestone({ item, index }: { item: ExperienceItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "center 48%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.18 });
  const opacity = useTransform(progress, [0, 0.3, 1], [0.32, 1, 1]);
  const x = useTransform(progress, [0, 1], [36, 0]);
  const titleY = useTransform(progress, [0, 1], [22, 0]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity, x }}
      className="relative pb-14 pl-12 will-change-transform motion-reduce:!transform-none motion-reduce:!opacity-100 sm:pb-20 sm:pl-20"
    >
      <span className={`absolute left-[0.7rem] top-1 z-10 grid h-7 w-7 place-items-center rounded-full border bg-background sm:left-[1.65rem] ${item.current ? "border-accent" : "border-[#89948e]"}`}>
        <span className={`h-2 w-2 rounded-full ${item.current ? "bg-accent" : "bg-[#89948e]"}`} />
        {item.current && !reduceMotion && <span className="absolute inset-0 animate-ping rounded-full border border-accent/35" />}
      </span>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent">Milestone 0{index + 1}</span>
        <span className="h-px w-10 bg-border" />
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-text">
          <CalendarDays size={15} aria-hidden="true" /> {item.duration}
        </span>
      </div>

      <motion.div style={{ y: titleY }} className="mt-5 will-change-transform motion-reduce:!transform-none">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className={`font-semibold leading-[0.98] text-primary-text ${item.current ? "text-[clamp(2.7rem,6vw,5.3rem)]" : "text-[clamp(2.25rem,5vw,4.3rem)]"}`}>
            {item.role}
          </h3>
          <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${item.current ? "bg-[#dff0ea] text-accent" : "bg-[#eceee9] text-secondary-text"}`}>
            {item.current ? "Current role" : "Starting point"}
          </span>
        </div>
      </motion.div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } } }}
        className="mt-8 max-w-3xl"
      >
        {item.responsibilities.map((responsibility, responsibilityIndex) => (
          <motion.li
            key={responsibility}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="group flex gap-4 border-t border-border py-4 sm:gap-6 sm:py-5"
          >
            <span className="pt-0.5 font-mono text-xs font-bold text-accent/75">{String(responsibilityIndex + 1).padStart(2, "0")}</span>
            <p className="text-base font-medium leading-7 text-[#34423c] transition-transform duration-300 group-hover:translate-x-1 sm:text-[1.05rem]">{responsibility}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const roles = experience;
  const company = roles[0];
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 72%", "end 32%"] });
  const timelineProgress = useSpring(scrollYProgress, { stiffness: 95, damping: 28, mass: 0.2 });
  const watermarkX = useTransform(timelineProgress, [0, 1], ["8%", "-10%"]);
  const promotionOpacity = useTransform(timelineProgress, [0.2, 0.36, 1], [0, 1, 1]);
  const promotionScale = useTransform(timelineProgress, [0.2, 0.38, 1], [0.88, 1, 1]);

  if (!company) return null;

  return (
    <section ref={sectionRef} id="experience" className="section-pad relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ x: watermarkX }}
        className="pointer-events-none absolute right-0 top-28 hidden select-none whitespace-nowrap text-[10vw] font-bold leading-none text-primary-text/[0.075] will-change-transform motion-reduce:hidden lg:block"
      >
        Managix Technology
      </motion.div>

      <div className="section-shell relative grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Experience / 04"
            title="Learning by shipping."
            intro="A growing engineering career shaped by ownership across backend systems, mobile products, and production infrastructure."
          />

          <div className="border-t border-border pt-6">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Company</span>
            <p className="mt-2 text-xl font-semibold text-primary-text">{company.company}</p>
            {company.link && (
              <motion.a
                href={company.link}
                target="_blank"
                rel="noreferrer"
                whileHover={reduceMotion ? undefined : { x: 4 }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-secondary-text transition-colors hover:text-accent"
              >
                Visit company <ArrowUpRight size={15} aria-hidden="true" />
              </motion.a>
            )}
          </div>
        </aside>

        <div className="relative pt-2">
          <div className="absolute bottom-16 left-6 top-4 w-px bg-border sm:left-10" />
          <motion.div
            className="absolute bottom-16 left-6 top-4 w-[2px] origin-top bg-gradient-to-b from-[#89948e] via-accent to-signal sm:left-10"
            style={{ scaleY: timelineProgress }}
          />

          {roles.map((item, index) => (
            <div key={item.role}>
              <RoleMilestone item={item} index={index} />
              {index < roles.length - 1 && (
                <motion.div
                  style={{ opacity: promotionOpacity, scale: promotionScale }}
                  className="relative mb-14 ml-1 flex origin-left items-center gap-4 pl-12 will-change-transform motion-reduce:!transform-none motion-reduce:!opacity-100 sm:mb-20 sm:ml-4 sm:pl-20"
                >
                  <span className="absolute left-0 grid h-12 w-12 place-items-center rounded-full border border-accent/25 bg-[#e4f1ed] text-accent shadow-[0_10px_28px_rgba(15,118,104,0.12)]">
                    <ArrowDown size={19} aria-hidden="true" />
                  </span>
                  <div className="h-px w-8 bg-accent/35" />
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-signal"><Sparkles size={14} /> Career progression</span>
                    <p className="mt-1 text-sm font-semibold text-primary-text">Promoted from Software Development Intern into Software Engineer</p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}

          <div className="ml-12 flex items-center gap-3 border-t border-border pt-6 sm:ml-20">
            <Building2 size={18} className="text-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-secondary-text">Continuing the journey at {company.company}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
