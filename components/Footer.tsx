import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#14211d] py-8 text-white">
      <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-lg font-semibold tracking-[-0.03em]">Mohammed Fawzaan</p><p className="mt-1 text-xs text-white/50">Designed & engineered with intention.</p></div>
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">© {new Date().getFullYear()} · Hyderabad, India</p>
        <a href="#hero" className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white">Back to top <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20"><ArrowUp size={14} /></span></a>
      </div>
    </footer>
  );
}
