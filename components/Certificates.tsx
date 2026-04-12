"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink, Globe } from "lucide-react";

interface CertificateItem {
  name: string;
  link: string;
  siteLink: string;
  duration?: string;
}

export default function Certificates({ certificates }: { certificates: CertificateItem[] }) {
  return (
    <section id="certificates" className="py-12 bg-transparent relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 drop-shadow-md"
          >
            Credentials
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" as const }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Certificates
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="glass p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] gap-5 sm:gap-4"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0 w-full">
                <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shrink-0 mt-0.5">
                  <Award size={24} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="text-[15px] sm:text-lg font-bold text-primary-text leading-tight group-hover:text-accent transition-colors break-words whitespace-normal">
                    {cert.name}
                  </h4>
                  {cert.duration && (
                    <span className="text-xs sm:text-sm font-medium text-secondary-text mt-1.5 opacity-80">
                      {cert.duration}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 shrink-0 self-end sm:self-auto">
                {cert.siteLink && (
                  <a 
                    href={cert.siteLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 sm:p-3 bg-section-alt border border-border/50 hover:border-accent rounded-xl text-accent transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-md bg-opacity-50"
                    title="Visit Platform Site"
                  >
                    <Globe size={20} />
                  </a>
                )}
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 sm:p-3 bg-gradient-to-r from-accent to-purple-500 border border-transparent hover:border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-md shadow-accent/20"
                    title="View Certificate"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
