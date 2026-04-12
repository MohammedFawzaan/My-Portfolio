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
    <section id="achievements" className="py-32 bg-background relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
            >
              <div className="flex items-center gap-5 mr-4">
                <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-300">
                  <Award size={24} />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-primary-text leading-tight drop-shadow-sm group-hover:text-accent transition-colors">
                  {cert.name}
                </h4>
              </div>
              
              <div className="flex gap-3 shrink-0">
                {cert.siteLink && (
                  <a 
                    href={cert.siteLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-section-alt border border-border/50 hover:border-accent rounded-xl text-accent transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-md bg-opacity-50"
                    title="Visit Platform Site"
                  >
                    <Globe size={18} />
                  </a>
                )}
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-gradient-to-r from-accent to-purple-500 border border-transparent hover:border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-md shadow-accent/20"
                    title="View Certificate"
                  >
                    <ExternalLink size={18} />
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
