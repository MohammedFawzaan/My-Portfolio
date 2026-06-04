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
import Certificates from "@/components/Certificates";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {

  const navLinks = [
    { name: "About", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Profiles", href: "#coding-profiles" },
    // { name: "Certificates", href: "#certificates" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <ThreeBackground />
      <NavBar navLinks={navLinks} />
      <main className="flex-1">
        <Hero hero={data.hero} />
        <SectionDivider />
        <Skills skills={data.skills} />
        <Education education={data.education} />
        <Projects projects={data.projects} />
        <Experience experience={data.experience} />
        <CodingProfiles profiles={data.codingProfiles} />
        {/* <Certificates certificates={data.certificates} /> */}
        <ResumeSection />
        <Contact contact={data.contact} />
      </main>
      <Footer />
    </>
  );
}
