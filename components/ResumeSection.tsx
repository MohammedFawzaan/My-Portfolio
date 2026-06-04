"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function ResumeSection() {
  const handleDownload = async () => {
    try {
      const response = await fetch("/Resume.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Mohammed_Fawzaan_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open("/Resume.pdf", "_blank");
    }
  };

  return (
    <section id="resume" className="py-12 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: "spring" as const }}
          className="text-4xl sm:text-6xl font-extrabold text-primary-text mb-16 drop-shadow-lg"
        >
          Resume
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-2xl aspect-[1/1.4] border border-border shadow-[0_0_30px_rgba(59,130,246,0.12)] mb-12 overflow-hidden rounded-xl bg-surface/50 backdrop-blur-sm"
        >
          <iframe
            src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-full"
            title="Mohammed Fawzaan Resume"
          />
        </motion.div>

        <motion.button
          onClick={handleDownload}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
        >
          <Download size={24} />
          Download Resume
        </motion.button>
      </div>
    </section>
  );
}
