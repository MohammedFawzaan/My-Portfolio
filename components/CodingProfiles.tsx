"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProfileItem {
  name: string;
  link: string;
  description: string;
}

export default function CodingProfiles({ profiles }: { profiles: ProfileItem[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getImageSrc = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("leetcode")) return "/leetcode-dashboard.png";
    if (lowerName.includes("geek") || lowerName.includes("gfg")) return "/gfg-dashboard.png";
    if (lowerName.includes("github")) return "/github-dashboard.png";
    return null;
  };

  const getIconSrc = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("leetcode")) return "https://cdn.simpleicons.org/leetcode/FFA116";
    if (lowerName.includes("geek") || lowerName.includes("gfg")) return "https://cdn.simpleicons.org/geeksforgeeks/2F8D46";
    if (lowerName.includes("github")) return "https://cdn.simpleicons.org/github/FFFFFF";
    return null;
  };

  return (
    <section id="coding-profiles" className="py-24 bg-section-alt">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 drop-shadow-md"
          >
            Showcase
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" as const }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Coding Profiles
          </motion.h3>
        </div>

        <div className="flex flex-col gap-6">
          {profiles.map((profile, index) => {
            const isExpanded = expandedIndex === index;
            const imgSrc = getImageSrc(profile.name);
            const iconSrc = getIconSrc(profile.name);

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass overflow-hidden transition-colors hover:border-accent shadow-lg"
              >
                <div 
                  className="px-8 py-6 flex items-center justify-between cursor-pointer"
                  onClick={() => toggle(index)}
                >
                  <div className="flex items-center gap-4">
                    {iconSrc && (
                       /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={iconSrc} alt={`${profile.name} logo`} className="w-8 h-8 object-contain drop-shadow-md" />
                    )}
                    <h4 className="text-2xl font-bold text-primary-text drop-shadow-sm">
                      {profile.name}
                    </h4>
                    <span className="text-secondary-text hidden sm:block font-bold">•</span>
                    <p className="text-secondary-text font-semibold hidden sm:block">
                      {profile.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-accent">
                    <a 
                      href={profile.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 bg-background border border-border/50 hover:border-accent rounded-full transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      title="Visit Profile"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="p-1">
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </div>

                {/* Mobile description visibility fallback */}
                <p className="text-secondary-text font-medium px-8 pb-4 sm:hidden">
                  {profile.description}
                </p>

                <AnimatePresence>
                  {isExpanded && imgSrc && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-section-alt border-t border-border"
                    >
                      <div className="p-6">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                          <Image 
                            src={imgSrc} 
                            alt={`${profile.name} Dashboard`} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
