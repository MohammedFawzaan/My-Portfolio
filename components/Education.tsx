"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarDays, GraduationCap } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

interface EducationItem {
  degree: string;
  college: string;
  link: string;
  duration: string;
  cgpa: string;
}

export default function Education({ education }: { education: EducationItem[] }) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 28, mass: 0.2 });
  const watermarkX = useTransform(progress, [0, 1], ["-8%", "8%"]);
  const college = education[0]?.college ?? "Lords Institute";

  return (
    <section ref={sectionRef} id="education" className="relative overflow-hidden border-y border-border bg-[#fffefa]/60 py-20 sm:py-24">
      <motion.div
        aria-hidden="true"
        style={{ x: watermarkX }}
        className="pointer-events-none absolute left-0 top-10 hidden select-none whitespace-nowrap text-[8vw] font-bold leading-none text-primary-text/[0.06] will-change-transform motion-reduce:hidden lg:block"
      >
        {college}
      </motion.div>
      <div className="section-shell relative">
        <SectionHeading eyebrow="Education / 05" title="Built on fundamentals." size="compact" />

        <div className="space-y-4">
          {education.map((item) => (
            <motion.article
              key={item.degree}
              initial={{ opacity: 0.4, clipPath: "inset(0 18% 0 0 round 1.6rem)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0 round 1.6rem)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              className="grid overflow-hidden rounded-[1.6rem] border border-border bg-surface/90 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[0_18px_46px_rgba(31,51,44,0.09)] lg:grid-cols-[1fr_auto] lg:items-stretch"
            >
              <div className="flex gap-4 p-5 sm:gap-5 sm:p-7">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e4f1ed] text-accent sm:h-14 sm:w-14">
                  <GraduationCap size={25} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Academic record</span>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-primary-text sm:text-2xl">{item.degree}</h3>
                  <a href={item.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-[0.95rem] font-medium text-secondary-text transition-colors hover:text-accent sm:text-base">
                    {item.college}<ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-border bg-[#f1f2ed] lg:min-w-[25rem] lg:border-l lg:border-t-0">
                <div className="flex flex-col justify-center px-5 py-4 sm:px-7">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.11em] text-secondary-text"><CalendarDays size={14} aria-hidden="true" /> Timeline</span>
                  <p className="mt-2 text-sm font-semibold leading-5 text-primary-text sm:text-base">{item.duration}</p>
                </div>
                <div className="flex flex-col justify-center border-l border-border px-5 py-4 sm:px-7">
                  <span className="text-xs font-bold uppercase tracking-[0.11em] text-secondary-text">CGPA</span>
                  <p className="mt-1 text-2xl font-semibold text-primary-text sm:text-3xl">{item.cgpa}<span className="ml-1 text-sm font-medium text-secondary-text">/ 10</span></p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
