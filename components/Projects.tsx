"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.02 12.02 0 0024 12.297c0-6.627-5.373-12-12-12z"/>
  </svg>
);
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface ProjectItem {
  title: string;
  problem: string;
  techStack: string[];
  description: string;
  keyFeatures: string[];
  links: { github: string; live: string };
}

function GlowingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && ringRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
      
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * -0.3;
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#06B6D4" wireframe transparent opacity={0.6} emissive="#06B6D4" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={2} />
      </mesh>
      <pointLight color="#06B6D4" intensity={10} distance={10} />
    </group>
  );
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <section id="projects" className="py-32 bg-section-alt">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 drop-shadow-md"
          >
            My Work
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Projects
          </motion.h3>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project, index) => {
            const isExpanded = expandedId === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
              >
                <div 
                  className="px-8 py-8 flex items-center justify-between cursor-pointer relative z-20"
                  onClick={() => toggle(index)}
                >
                  <div className="flex-1 pr-8">
                    <h4 className="text-3xl font-extrabold text-primary-text group-hover:text-accent transition-colors drop-shadow-sm">
                      {project.title}
                    </h4>
                    <p className="text-secondary-text mt-3 font-medium line-clamp-1 text-lg">
                      {project.problem}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0, scale: isExpanded ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className="text-accent bg-accent/10 p-3 rounded-full"
                  >
                    <ChevronDown size={28} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden relative"
                    >
                      {/* Dynamic 3D Core Background */}
                      <div className="absolute right-0 top-0 w-2/3 h-full z-0 opacity-40 mix-blend-screen pointer-events-none hidden md:block">
                        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                          <ambientLight intensity={1} />
                          <GlowingCore />
                        </Canvas>
                      </div>

                      <div className="px-8 pb-10 pt-4 lg:pr-[45%] relative z-10 flex flex-col gap-8">
                        <p className="text-primary-text font-medium leading-relaxed text-lg">
                          {project.description}
                        </p>
                        
                        <div>
                          <h5 className="text-sm font-bold uppercase tracking-[0.1em] text-accent mb-4">Key Features</h5>
                          <ul className="text-primary-text font-medium space-y-3">
                            {project.keyFeatures.map((feature, i) => (
                              <motion.li 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i} 
                                className="flex items-start gap-3"
                              >
                                <span className="text-purple-500 mt-1">▹</span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-bold uppercase tracking-[0.1em] text-accent mb-4">Tech Stack</h5>
                          <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech, i) => (
                              <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                key={i} 
                                className="px-4 py-2 bg-gradient-to-r from-background to-surface border border-accent/30 text-primary-text font-semibold text-sm rounded-xl shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                          {project.links.github && (
                            <a 
                              href={project.links.github} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 transition-all font-bold"
                            >
                              <GithubIcon size={20} />
                              Source Code
                            </a>
                          )}
                          {project.links.live && project.links.live !== "coming-soon" && (
                            <a 
                              href={project.links.live} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accent to-purple-500 text-white rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 transition-all font-bold"
                            >
                              <ExternalLink size={20} />
                              Live Project
                            </a>
                          )}
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
