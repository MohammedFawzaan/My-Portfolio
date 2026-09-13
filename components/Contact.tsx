"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Loader2, Mail, Phone, Send } from "lucide-react";
import { useRef, useState } from "react";

interface ContactProps { contact: { email: string; phone: string; linkedin: string } }

const LinkedinIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.04c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export default function Contact({ contact }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.2 });
  const firstLineX = useTransform(progress, [0, 1], [-12, 18]);
  const secondLineX = useTransform(progress, [0, 1], [24, -14]);
  const thirdLineX = useTransform(progress, [0, 1], [-7, 11]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || "Failed to send message"); }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section-pad relative overflow-hidden">
      <div aria-hidden="true" className="absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#cde9df]/60 blur-[100px]" />
      <div className="section-shell relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div initial={reduceMotion ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="eyebrow">Contact / 08</span>
          <h2 className="mt-6 overflow-hidden text-[clamp(3.4rem,8vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.07em]">
            <motion.span style={{ x: firstLineX }} className="block will-change-transform motion-reduce:!transform-none">Let&apos;s make</motion.span>
            <motion.span style={{ x: secondLineX }} className="editorial-serif block italic text-accent will-change-transform motion-reduce:!transform-none">something</motion.span>
            <motion.span style={{ x: thirdLineX }} className="block will-change-transform motion-reduce:!transform-none">matter.</motion.span>
          </h2>
          <p className="mt-8 max-w-md leading-7 text-secondary-text">Have a role, product, or difficult engineering problem in mind? I&apos;d be glad to hear about it.</p>
          <div className="mt-9 flex flex-col items-start gap-3">
            <a href={gmailComposeLink} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-sm font-semibold"><span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface group-hover:border-accent group-hover:text-accent"><Mail size={16} /></span>{contact.email} <ArrowUpRight size={14} /></a>
            <a href={`tel:${contact.phone}`} className="group inline-flex items-center gap-3 text-sm font-semibold"><span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface group-hover:border-accent group-hover:text-accent"><Phone size={16} /></span>{contact.phone}</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-sm font-semibold"><span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface group-hover:border-accent group-hover:text-accent"><LinkedinIcon /></span>LinkedIn <ArrowUpRight size={14} /></a>
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="paper-card rounded-[2rem] p-6 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="group block"><span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-text transition-colors group-focus-within:text-accent">Your name</span><input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="John Doe" className="w-full rounded-2xl border border-border bg-[#fffefa]/78 px-4 py-3.5 text-base font-medium text-primary-text outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition-[border-color,background-color,box-shadow] placeholder:text-secondary-text/45 focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,118,104,0.10)]" /></label>
            <label className="group block"><span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-text transition-colors group-focus-within:text-accent">Email address</span><input required type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="john@example.com" className="w-full rounded-2xl border border-border bg-[#fffefa]/78 px-4 py-3.5 text-base font-medium text-primary-text outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition-[border-color,background-color,box-shadow] placeholder:text-secondary-text/45 focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,118,104,0.10)]" /></label>
          </div>
          <label className="group mt-7 block"><span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-text transition-colors group-focus-within:text-accent">Tell me about it</span><textarea required rows={7} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} placeholder="A little about the project, role, or idea…" className="w-full resize-none rounded-2xl border border-border bg-[#fffefa]/78 px-4 py-3.5 text-base font-medium leading-7 text-primary-text outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition-[border-color,background-color,box-shadow] placeholder:text-secondary-text/45 focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,118,104,0.10)]" /></label>
          <div aria-live="polite" className="mt-5 min-h-6 text-sm">{status === "success" && <p className="text-accent">Message sent successfully. I&apos;ll get back to you soon.</p>}{status === "error" && <p className="text-signal">{errorMessage}</p>}</div>
          <button type="submit" disabled={status === "loading"} className="button-primary mt-5 w-full disabled:cursor-wait disabled:opacity-60">{status === "loading" ? <><Loader2 size={17} className="animate-spin" /> Sending</> : <>Send message <Send size={16} /></>}</button>
        </motion.form>
      </div>
    </section>
  );
}
