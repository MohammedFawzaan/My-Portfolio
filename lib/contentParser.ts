import fs from 'fs';
import path from 'path';

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    tagline: string;
    summary: string;
  };
  skills: string[];
  education: {
    degree: string;
    college: string;
    link: string;
    duration: string;
    cgpa: string;
  }[];
  projects: {
    title: string;
    problem: string;
    techStack: string[];
    description: string;
    keyFeatures: string[];
    links: { github: string; live: string };
    logo: string;
  }[];
  experience: {
    role: string;
    company: string;
    link: string;
    duration: string;
    responsibilities: string[];
  }[];
  codingProfiles: {
    name: string;
    link: string;
    description: string;
  }[];
  certificates: {
    name: string;
    link: string;
    siteLink: string;
  }[];
  contact: {
    phone: string;
    email: string;
    linkedin: string;
  };
}

export function getPortfolioData(): PortfolioData {
  const filePath = path.join(process.cwd(), 'content.txt');
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error("Could not read content.txt", e);
  }

  const result: any = {
    hero: { name: '', title: '', tagline: '', summary: '' },
    skills: [],
    education: [],
    projects: [],
    experience: [],
    codingProfiles: [],
    certificates: [],
    contact: { phone: '', email: '', linkedin: '' },
  };

  const lines = content.split('\n').map(l => l.trim());
  let currentSection = '';

  let currentProject: any = null;
  let currentExperience: any = null;
  let inProjectArray = '';

  const extractVal = (line: string, prefix: string) => line.substring(prefix.length).trim();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (line.match(/^SECTION\s+\d+:/)) {
      currentSection = line;
      continue;
    }

    if (line === '---') continue;

    if (currentSection.includes('HERO + ABOUT')) {
      if (line.startsWith('Name:')) result.hero.name = extractVal(line, 'Name:');
      else if (line.startsWith('Title:')) result.hero.title = extractVal(line, 'Title:');
      else if (line.startsWith('Tagline:')) result.hero.tagline = extractVal(line, 'Tagline:');
      else if (line.startsWith('Professional Summary:')) {
        let summary = '';
        let j = i + 1;
        while (j < lines.length && !lines[j].startsWith('---') && !lines[j].match(/^SECTION/)) {
          if (lines[j]) summary += lines[j] + ' ';
          j++;
        }
        result.hero.summary = summary.trim();
        i = j - 1;
      }
    } else if (currentSection.includes('Skills') || currentSection.includes('SECTION 2')) {
      result.skills.push(line);
    } else if (currentSection.includes('Education') || currentSection.includes('SECTION 3')) {
      if (!line.startsWith('CGPA:')) {
        let edu: any = { degree: line };
        if (i + 1 < lines.length) {
          const l2 = lines[++i];
          if (l2.includes('link - ')) {
            const parts = l2.split('link - ');
            edu.college = parts[0].trim();
            edu.link = parts[1].trim();
          } else {
            edu.college = l2;
            edu.link = '';
          }
        }
        if (i + 1 < lines.length) {
          edu.duration = lines[++i];
        }
        if (i + 1 < lines.length) {
          const cgpaLine = lines[++i];
          if (cgpaLine.startsWith('CGPA:')) edu.cgpa = extractVal(cgpaLine, 'CGPA:');
        }
        result.education.push(edu);
      }
    } else if (currentSection.includes('PROJECTS') || currentSection.includes('SECTION 4')) {
      if (line.startsWith('Project ')) {
        if (currentProject) result.projects.push(currentProject);
        currentProject = { title: extractVal(line, line.split(':')[0] + ':'), problem: '', techStack: [], description: '', keyFeatures: [], links: { github: '', live: '' }, logo: '' };

        // Auto-assign logos based on titles
        const lowerTitle = currentProject.title.toLowerCase();
        if (lowerTitle.includes('career pilot')) currentProject.logo = '/AICareerPilotLogo.png';
        else if (lowerTitle.includes('ride') || lowerTitle.includes('ridenow')) currentProject.logo = '/RideNowLogo.png';
        else if (lowerTitle.includes('chemistry') || lowerTitle.includes('virtual lab')) currentProject.logo = '/VirtualLabLogo.jpg';
        else if (lowerTitle.includes('cookbook') || lowerTitle.includes('ai cookbook')) currentProject.logo = '/AICookBookLogo.png';

        inProjectArray = '';
      } else if (line.startsWith('Problem:')) {
        currentProject.problem = extractVal(line, 'Problem:');
        inProjectArray = '';
      } else if (line.startsWith('Tech Stack:')) {
        inProjectArray = 'tech';
      } else if (line.startsWith('Description:')) {
        inProjectArray = 'desc';
      } else if (line.startsWith('Key Features:')) {
        inProjectArray = 'feat';
      } else if (line.startsWith('Links:')) {
        inProjectArray = 'links';
      } else if (inProjectArray === 'tech') {
        currentProject.techStack.push(line);
      } else if (inProjectArray === 'desc') {
        currentProject.description += (currentProject.description ? ' ' : '') + line;
      } else if (inProjectArray === 'feat') {
        currentProject.keyFeatures.push(line);
      } else if (inProjectArray === 'links') {
        if (line.startsWith('GitHub:')) currentProject.links.github = extractVal(line, 'GitHub:');
        else if (line.startsWith('Live Demo:')) currentProject.links.live = extractVal(line, 'Live Demo:');
      }
    } else if (currentSection.includes('EXPERIENCE') || currentSection.includes('SECTION 5')) {
      if (line.startsWith('Role:')) {
        if (currentExperience) result.experience.push(currentExperience);
        currentExperience = { role: extractVal(line, 'Role:'), company: '', link: '', responsibilities: [] };
      } else if (line.startsWith('Company:')) {
        const cLine = extractVal(line, 'Company:');
        if (cLine.includes('- link -')) {
          const parts = cLine.split('- link -');
          currentExperience.company = parts[0].trim();
          currentExperience.link = parts[1].trim();
        } else {
          currentExperience.company = cLine;
        }
        // Look for duration line
        if (i + 1 < lines.length && (lines[i + 1].includes(' - ') || lines[i + 1].includes('Present') || lines[i + 1].includes('Dec'))) {
          currentExperience.duration = lines[++i];
        }
      } else if (line.startsWith('Responsibilities:')) {
        // nothing
      } else {
        if (currentExperience) currentExperience.responsibilities.push(line);
      }
    } else if (currentSection.includes('CODING PROFILES') || currentSection.includes('SECTION 6')) {
      if (line.includes(': ')) {
        const parts = line.split(': ');
        const name = parts[0];
        const link = parts.slice(1).join(': ');
        let desc = '';
        if (i + 1 < lines.length && !lines[i + 1].includes(': ') && !lines[i + 1].startsWith('---') && !lines[i + 1].startsWith('SECTION')) {
          desc = lines[++i];
        }
        result.codingProfiles.push({ name, link, description: desc });
      }
    } else if (currentSection.includes('CERTIFICATES') || currentSection.includes('SECTION 7')) {
      if (line.includes('Sigma') || line.includes('Data Structures') || line.includes('Internship') || line.includes('Virtual Internship') || line.includes('NullClass')) {
        let certName = line;
        let siteLink = '';

        const siteMatch = line.match(/\((.*?)\s+link\s+-\s+(https?:\/\/.*?)\)/);
        if (siteMatch) {
          siteLink = siteMatch[2].trim();
          certName = line.replace(siteMatch[0], '').trim();
        }

        let cert: any = { name: certName, link: '', siteLink, duration: '' };
        while (i + 1 < lines.length && 
               !lines[i + 1].includes('Sigma') && 
               !lines[i + 1].includes('Data Structures') && 
               !lines[i + 1].includes('Internship') && 
               !lines[i + 1].includes('NullClass') && 
               !lines[i + 1].startsWith('---') && 
               !lines[i + 1].startsWith('SECTION')) {
          let nextLine = lines[++i];
          if (nextLine.startsWith('link - ')) {
            cert.link = extractVal(nextLine, 'link - ');
          } else if (nextLine.trim() !== '') {
            cert.duration = nextLine.trim();
          }
        }
        result.certificates.push(cert);
      }
    } else if (currentSection.includes('CONTACT') || currentSection.includes('SECTION 9')) {
      if (line.startsWith('📞')) result.contact.phone = extractVal(line, '📞');
      else if (line.startsWith('✉️')) {
        let eml = extractVal(line, '✉️');
        if (eml.includes('[')) {
          const m = eml.match(/\[(.*?)\]/);
          if (m) result.contact.email = m[1];
        } else {
          result.contact.email = eml;
        }
      }
      else if (line.startsWith('🔗')) result.contact.linkedin = extractVal(line, '🔗');
    }
  }

  if (currentProject) result.projects.push(currentProject);
  if (currentExperience) result.experience.push(currentExperience);

  return result as PortfolioData;
}
