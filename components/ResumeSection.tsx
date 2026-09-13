"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { useRef } from "react";

export default function ResumeSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, mass: 0.2 });
  const previewY = useTransform(progress, [0, 1], [34, -26]);
  const previewRotate = useTransform(progress, [0, 0.5, 1], [1.5, 0, -1.5]);

  const handleDownload = async () => {
    try {
      const response = await fetch("/Resume.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Mohammed_Fawzaan_Resume.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      window.open("/Resume.pdf", "_blank");
    }
  };

  return (
    <section ref={sectionRef} id="resume" className="section-pad border-y border-border bg-[#e9ede7]/65">
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-shell grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[var(--shadow-lg)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
          <div><span className="eyebrow">Résumé / 07</span><h2 className="mt-6 text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em]">The concise version.</h2><p className="mt-6 max-w-md leading-7 text-secondary-text">A focused overview of my engineering experience, education, projects, and technical capabilities.</p></div>
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={handleDownload} className="button-primary"><Download size={17} /> Download PDF</button>
            <a href="/Resume.pdf" target="_blank" className="button-secondary">Open résumé <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="relative min-h-[430px] border-t border-border bg-[#dfe6df] p-5 sm:min-h-[620px] sm:p-8 lg:border-l lg:border-t-0">
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] shadow-sm sm:left-7 sm:top-7"><FileText size={13} className="text-accent" /> Resume.pdf</div>
          <motion.div style={{ y: previewY, rotate: previewRotate }} className="mx-auto mt-12 aspect-[8.5/11] h-auto max-h-[calc(100%-3.5rem)] w-full max-w-[470px] overflow-hidden rounded-sm bg-white shadow-[0_18px_50px_rgba(20,33,29,0.15)] will-change-transform motion-reduce:!transform-none">
            <iframe src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit&zoom=page-fit" scrolling="no" className="block h-full w-full border-0" title="Mohammed Fawzaan Resume" loading="lazy" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
