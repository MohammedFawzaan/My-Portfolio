"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink, Globe } from "lucide-react";

interface CertificateItem {
  name: string;
  link: string;
  siteLink: string;
}

export default function Achievements({ certificates }: { certificates: CertificateItem[] }) {
  return (
    <section id="achievements" className="py-12 bg-background relative overflow-hidden">
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
              className="glass p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] gap-4 sm:gap-0"
            >
              <div className="flex items-center gap-3 sm:gap-5 mr-0 sm:mr-4 w-full sm:w-auto">
                <div className="p-2 sm:p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-300 shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-sm sm:text-xl font-bold text-primary-text leading-tight drop-shadow-sm group-hover:text-accent transition-colors flex-1 pr-2">
                  {cert.name}
                </h4>
              </div>
              
              <div className="flex gap-2 sm:gap-3 shrink-0 self-end sm:self-auto">
                {cert.siteLink && (
                  <a 
                    href={cert.siteLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 sm:p-3 bg-section-alt border border-border/50 hover:border-accent rounded-xl text-accent transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-md bg-opacity-50"
                    title="Visit Platform Site"
                  >
                    <Globe className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </a>
                )}
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 sm:p-3 bg-gradient-to-r from-accent to-purple-500 border border-transparent hover:border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-md shadow-accent/20"
                    title="View Certificate"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
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
