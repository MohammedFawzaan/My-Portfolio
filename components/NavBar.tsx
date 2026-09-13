"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavBarProps {
  navLinks: { name: string; href: string }[];
}

export default function NavBar({ navLinks }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    setIsScrolled(latest > 24);
    setIsHidden(latest > previous && latest > 180);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <motion.header
      animate={{ y: isHidden && !isOpen ? -96 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <motion.div
        layout={!reduceMotion}
        className={`relative mx-auto flex max-w-[1180px] items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-5 ${
          isScrolled
            ? "h-14 border-border bg-[#fffefa]/90 shadow-[0_12px_40px_rgba(20,33,29,0.09)] backdrop-blur-xl"
            : "h-16 border-transparent bg-transparent"
        }`}
      >
        <motion.span aria-hidden="true" className="absolute inset-x-7 bottom-0 h-px origin-left bg-accent/60" style={{ scaleX: scrollYProgress }} />
        <a href="#hero" aria-label="Back to top" className="group flex items-center gap-3 font-semibold tracking-[-0.03em]">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-text text-xs text-white transition-transform group-hover:rotate-[-8deg]">MF</span>
          <span className="hidden sm:block">Mohammed Fawzaan</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <motion.a key={link.name} href={link.href} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="rounded-full px-3.5 py-2 text-sm font-medium text-secondary-text transition-colors hover:bg-white hover:text-primary-text">
              {link.name}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <a href="#contact" className="button-primary min-h-10 px-4 text-xs">
              Let&apos;s talk <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-primary-text lg:hidden"
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 max-w-[1180px] overflow-hidden rounded-[1.75rem] border border-border bg-[#fffefa]/95 p-3 shadow-[0_28px_80px_rgba(20,33,29,0.16)] backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold hover:bg-section-alt">
                  <span>{link.name}</span><span className="font-mono text-xs text-secondary-text">0{index + 1}</span>
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="button-primary mt-2">Start a conversation <ArrowUpRight size={17} /></a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
