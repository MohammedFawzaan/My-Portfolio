import data from "@/lib/portfolio.json";
import NavBar from "@/components/NavBar";
import ThreeBackground from "@/components/ThreeBackground";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CodingProfiles from "@/components/CodingProfiles";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "Stack", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
  ];

  return (
    <>
      <ThreeBackground />
      <NavBar navLinks={navLinks} />
      <main className="flex-1 relative">
        <Hero hero={data.hero} />
        <SectionDivider />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <CodingProfiles profiles={data.codingProfiles} />
        <ResumeSection />
        <Contact contact={data.contact} />
      </main>
      <Footer />
    </>
  );
}
