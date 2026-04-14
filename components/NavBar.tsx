"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavBarProps {
  navLinks: { name: string; href: string }[];
}

export default function NavBar({ navLinks }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background border-b border-border shadow-sm py-4" : "bg-background py-6"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#hero" className="font-mono text-2xl font-extrabold tracking-tighter text-primary-text drop-shadow-sm">
          &lt;Fawzaan /&gt;
        </a>

        {/* Desktop */}
        <nav className="hidden lg:flex gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-secondary-text hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-primary-text cursor-pointer relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col py-6 px-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-primary-text font-medium text-lg hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
