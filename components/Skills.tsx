"use client";
import { motion } from "framer-motion";

const getIconUrl = (skillName: string) => {
  const map: Record<string, string> = {
    "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    "C": "https://cdn.simpleicons.org/c/3B82F6",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg",
    "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "Expo": "https://cdn.simpleicons.org/expo/1E293B",
    "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", // Using wordmark via simple icon logic below if it looks better, but express original usually works
    "NestJS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "Prisma ORM": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    "TypeORM": "https://cdn.simpleicons.org/typeorm/FE0803",
    "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "ShadCN UI": "https://cdn.simpleicons.org/shadcnui/1E293B",
  };

  if (skillName === "Express.js") return "https://cdn.simpleicons.org/express/1E293B";

  return map[skillName] || `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg`;
};

export default function Skills({ skills }: { skills: string[] }) {
  const filteredSkills = skills.filter((s) => s.trim().toUpperCase() !== "SQL");

  return (
    <section id="skills" className="py-12 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 drop-shadow-md"
          >
            Capabilities
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" as const }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Technical Skills
          </motion.h3>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
        >
          {filteredSkills.map((skill) => {
            const floatDuration = 3 + Math.random() * 2;
            const floatDelay = Math.random() * 2;

            return (
              <motion.div
                key={skill}
                variants={{
                  hidden: { opacity: 0, scale: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: "spring" as const, stiffness: 100, damping: 10 }
                  }
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: Math.random() * 10 - 5,
                  zIndex: 20
                }}
                className="flex flex-col items-center justify-center gap-4 cursor-pointer group"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getIconUrl(skill)}
                    alt={skill}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <span className="text-sm md:text-base font-bold text-secondary-text text-center transition-colors duration-300 group-hover:text-primary-text drop-shadow-sm">
                  {skill}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
