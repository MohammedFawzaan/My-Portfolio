"use client";
import { motion } from "framer-motion";
import { Medal, Award } from "lucide-react";

interface AchievementsCertifications {
  achievements: string[];
  certifications: string[];
}

export default function Achievements({ data }: { data: AchievementsCertifications }) {
  return (
    <section id="achievements" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" as const }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Achievements & Certifications
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 hidden-divider">
          {/* Achievements */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8 pb-4 border-b border-border"
            >
              <Medal className="text-accent" size={28} />
              <h4 className="text-2xl font-bold text-primary-text">Achievements</h4>
            </motion.div>
            <ul className="flex flex-col gap-6">
              {data.achievements.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="font-semibold text-primary-text leading-relaxed text-lg"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8 pb-4 border-b border-border"
            >
              <Award className="text-accent" size={28} />
              <h4 className="text-2xl font-bold text-primary-text">Certifications</h4>
            </motion.div>
            <ul className="flex flex-col gap-6">
              {data.certifications.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="font-semibold text-primary-text leading-relaxed text-lg"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
