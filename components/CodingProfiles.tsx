"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface ProfileItem { name: string; link: string; description: string }

const profileMeta: Record<string, { icon: string; color: string }> = {
  LeetCode: { icon: "https://cdn.simpleicons.org/leetcode/14211D", color: "#f2e2d7" },
  GitHub: { icon: "https://cdn.simpleicons.org/github/14211D", color: "#dfeee8" },
  GeeksforGeeks: { icon: "https://cdn.simpleicons.org/geeksforgeeks/0F7668", color: "#e9ede7" },
};

export default function CodingProfiles({ profiles }: { profiles: ProfileItem[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="coding-profiles" className="section-pad">
      <div className="section-shell">
        <SectionHeading eyebrow="Practice / 06" title="Proof of consistency." intro="Problem solving, public code, and the quiet repetition behind stronger engineering judgment." />
        <div className="grid gap-4 lg:grid-cols-3">
          {profiles.map((profile, index) => {
            const meta = profileMeta[profile.name] ?? { icon: "", color: "#ffffff" };
            return (
              <motion.article
                key={profile.name}
                initial={reduceMotion ? false : { opacity: 0, y: 34, rotate: index === 1 ? 0 : index === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                whileHover={reduceMotion ? undefined : { y: -6, rotate: index === 1 ? 0 : index === 0 ? -0.6 : 0.6 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.58, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-sm)]"
                style={{ background: meta.color }}
              >
                <div className="flex min-h-52 flex-col justify-between p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={meta.icon} alt="" className="h-9 w-9 object-contain" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary-text">0{index + 1}</span>
                  </div>
                  <div className="mt-12">
                    <h3 className="text-3xl font-semibold tracking-[-0.045em]">{profile.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-secondary-text">{profile.description}</p>
                    <div className="mt-5 flex items-center gap-2">
                      <a href={profile.link} target="_blank" rel="noreferrer" className="button-primary min-h-10 px-4 text-xs">Visit profile <ArrowUpRight size={14} /></a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
