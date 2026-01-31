import rawPersonalData from "../../personal_data.json";

export type HighlightIcon = "code2" | "lightbulb" | "users" | "bookopen";

export type AboutHighlight = {
  title: string;
  description: string;
  icon?: HighlightIcon;
};

export type SocialType = "email" | "github" | "linkedin" | "twitter" | "website";

export type SocialLink = {
  type: SocialType;
  label: string;
  url: string;
  handle: string;
};

export type Experience = {
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
};

export type Project = {
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  stars: string;
  link: string;
  github: string;
  tags: string[];
  featured: boolean;
};

export type PersonalData = {
  first_name: string;
  last_name: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  address?: string;
  resume_url: string;
  about: {
    paragraphs: string[];
    highlights: AboutHighlight[];
  };
  contact: {
    email: string;
    phone: string;
    address?: string;
    socials: SocialLink[];
  };
  experience: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
};

export const personalData = rawPersonalData as PersonalData;

export const fullName = [personalData.first_name, personalData.last_name]
  .filter(Boolean)
  .join(" ");

