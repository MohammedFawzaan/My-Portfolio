"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, ExternalLink } from "lucide-react";

interface EducationItem {
  degree: string;
  college: string;
  link: string;
  duration: string;
  cgpa: string;
}

export default function Education({ education }: { education: EducationItem[] }) {
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
    <section id="education" className="py-12 bg-transparent relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 drop-shadow-md"
          >
            Academic Journey
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Education
          </motion.h3>
        </div>

        <div className="relative pl-7 sm:pl-8 md:pl-10 lg:pl-12" ref={ref}>
          {/* Animated Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-border rounded-full" />
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-purple-500 rounded-full origin-top"
            style={{ scaleY }}
          />

          {education.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="mb-12 sm:mb-16 relative last:mb-0 group"
            >
              <div className="absolute -left-12 sm:-left-13 md:-left-14 lg:-left-16 w-10 h-10 bg-background border-2 border-accent rounded-full flex items-center justify-center text-accent z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform duration-300">
                <GraduationCap size={20} />
              </div>
              
              <div className="glass p-6 sm:p-8 rounded-2xl flex flex-col gap-3 group-hover:border-accent/50 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                
                <span className="text-accent font-bold tracking-wider uppercase text-sm">
                  {item.duration}
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-primary-text drop-shadow-sm">
                  {item.degree}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-600 font-bold text-lg sm:text-xl">
                    {item.college}
                  </span>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2 bg-background border border-border/50 hover:border-accent rounded-lg text-accent transition-all duration-300 hover:scale-110 shadow-sm"
                      title="Visit Site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                {item.cgpa && (
                  <p className="mt-4 text-primary-text bg-accent/10 border border-accent/20 inline-block px-5 py-2 rounded-full text-sm font-bold w-fit shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]">
                    CGPA: {item.cgpa}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
