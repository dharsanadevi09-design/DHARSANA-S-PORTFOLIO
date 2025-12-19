
export interface Education {
  degree: string;
  institution: string;
  year: string;
  score: string;
  details: string;
}

export interface Skill {
  name: string;
  icon: string; // URL to icon image
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string; // Project screenshot/cover
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  issuerLogo?: string; // Company logo
  certificateImage?: string; // Actual certificate image
}

export interface ServiceItem {
  title: string;
  description: string;
  price?: string; // Added price for payment step
}

export interface ConsultationTopic {
  id: string;
  title: string;
  description: string;
  price: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PortfolioData {
  // Settings
  headerLogo: string; // URL for nav logo
  
  // Home
  name: string;
  role: string;
  intro: string;
  heroBackgroundImage?: string; // Dynamic background for Home
  
  // About
  aboutMe: string;
  aboutImage: string; // URL
  education: Education[];
  
  // Skills
  skills: Skill[];
  
  // Projects
  projects: Project[];
  
  // Experience
  experience: ExperienceItem[];
  certificates: Certificate[];
  
  // Contact
  contactEmail: string;
  location: string;
  
  // Services & Consultation
  resumeLink: string;
  offeredServices: ServiceItem[]; // General services (Web Dev, etc)
  consultationTopics: ConsultationTopic[]; // Paid topics - Payment required
  paymentDetails: string;
  
  // Footer
  footerTitle?: string;
  footerText?: string;
  socialLinks: SocialLink[];
}