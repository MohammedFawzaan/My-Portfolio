"use client";
import { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
        ? "bg-background border-b border-border shadow-sm py-3"
        : "bg-background py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#hero"
          className="font-mono text-2xl font-extrabold tracking-tighter text-primary-text drop-shadow-sm"
        >
          &lt;Fawzaan /&gt;
        </a>

        {/* Desktop Nav */}
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

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg text-primary-text hover:bg-accent/10 active:bg-accent/20 transition-colors cursor-pointer"
          onClick={handleToggle}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col py-4 px-6 gap-1 bg-background border-b border-border shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary-text font-medium text-lg hover:text-accent hover:bg-accent/5 transition-colors py-3 px-4 rounded-lg"
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
