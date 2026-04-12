"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, Loader2 } from "lucide-react";

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>LinkedIn</title>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface ContactProps {
  contact: {
    email: string;
    phone: string;
    linkedin: string;
  };
}

export default function Contact({ contact }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <section id="contact" className="py-12 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4 drop-shadow-md"
          >
            Get In Touch
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" as const }}
            className="text-4xl sm:text-6xl font-extrabold text-primary-text drop-shadow-lg"
          >
            Contact Me
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <p className="text-xl font-medium text-secondary-text leading-relaxed">
              I’m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let&apos;s build something amazing together.
            </p>

            <div className="flex flex-col gap-6 sm:gap-8">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 sm:gap-4 text-primary-text hover:text-accent transition-colors group w-fit">
                <div className="p-3 sm:p-4 bg-section-alt rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-xl font-bold break-all">{contact.email}</span>
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-3 sm:gap-4 text-primary-text hover:text-accent transition-colors group w-fit">
                <div className="p-3 sm:p-4 bg-section-alt rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-xl font-bold">{contact.phone}</span>
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 sm:gap-4 text-primary-text hover:text-accent transition-colors group w-fit">
                <div className="p-3 sm:p-4 bg-section-alt rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <LinkedinIcon size={24} />
                </div>
                <span className="text-base sm:text-xl font-bold">LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold text-accent uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe"
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border-2 border-border p-3 sm:p-4 rounded-xl text-primary-text placeholder:text-secondary-text/50 focus:outline-none focus:border-accent transition-colors font-bold text-base sm:text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-accent uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com"
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border-2 border-border p-3 sm:p-4 rounded-xl text-primary-text placeholder:text-secondary-text/50 focus:outline-none focus:border-accent transition-colors font-bold text-base sm:text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-accent uppercase tracking-wider">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Hello, I'd like to talk about..."
                  required 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background border-2 border-border p-3 sm:p-4 rounded-xl text-primary-text placeholder:text-secondary-text/50 focus:outline-none focus:border-accent transition-colors font-bold text-base sm:text-lg resize-none"
                />
              </div>
              
              {status === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500 text-green-400 rounded-xl font-bold">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500 text-red-400 rounded-xl font-bold">
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-r from-accent to-purple-500 text-white rounded-xl p-3 sm:p-4 font-bold text-base sm:text-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all disabled:opacity-70 disabled:hover:shadow-none"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
