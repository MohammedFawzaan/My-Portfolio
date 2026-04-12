"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  link: string;
  duration: string;
  responsibilities: string[];
}

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-12 bg-background relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 drop-shadow-md"
          >
            Career
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Experience
          </motion.h3>
        </div>

        <div className="relative pl-7 sm:pl-8 md:pl-10 lg:pl-12" ref={ref}>
          {/* Animated Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-border rounded-full" />
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-accent rounded-full origin-top"
            style={{ scaleY }}
          />

          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="mb-12 sm:mb-16 relative last:mb-0 group"
            >
              <div className="absolute -left-12 sm:-left-13 md:-left-14 lg:-left-16 w-10 h-10 bg-section-alt border-2 border-purple-500 rounded-full flex items-center justify-center text-purple-400 z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-125 transition-transform duration-300">
                <Briefcase size={20} />
              </div>

              <div className="glass p-6 sm:p-8 rounded-2xl flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 group-hover:border-purple-500/50 transition-colors duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                <div className="lg:w-1/3 relative z-10">
                  {item.duration && (
                    <span className="text-purple-400 font-bold tracking-wider uppercase text-sm block mb-2">
                      {item.duration}
                    </span>
                  )}
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-primary-text drop-shadow-sm">{item.role}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-purple-400 font-bold text-lg drop-shadow-sm">
                      {item.company}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-background border border-border/50 hover:border-purple-400 rounded-lg text-purple-400 transition-all duration-300 hover:scale-110 shadow-sm"
                        title="Visit Site"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:w-2/3 relative z-10">
                  <ul className="space-y-4">
                    {item.responsibilities.map((resp, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="text-primary-text font-medium leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-sm before:bg-purple-500 before:shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      >
                        {resp}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
