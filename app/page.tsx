import { getPortfolioData } from "@/lib/contentParser";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CodingProfiles from "@/components/CodingProfiles";
import Achievements from "@/components/Achievements";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const data = getPortfolioData();

  const navLinks = [
    { name: "About", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Profiles", href: "#coding-profiles" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <NavBar navLinks={navLinks} />
      <main className="flex-1">
        <Hero hero={data.hero} />
        <Skills skills={data.skills} />
        <Education education={data.education} />
        <Projects projects={data.projects} />
        <Experience experience={data.experience} />
        <CodingProfiles profiles={data.codingProfiles} />
        <Achievements data={data.achievementsCertifications} />
        <ResumeSection />
        <Contact contact={data.contact} />
      </main>
      <Footer />
    </>
  );
}
