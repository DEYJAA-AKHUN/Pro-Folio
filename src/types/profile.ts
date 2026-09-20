export type Visibility = "public" | "private";

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  location?: string;
  visibility: Visibility;
};

export type Employment = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  location?: string;
  current?: boolean;
  visibility: Visibility;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  role?: string;
  status?: string;
  technologies?: string[];
  visibility: Visibility;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  visibility: Visibility;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  visibility: Visibility;
};

export type Achievement = {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
  visibility: Visibility;
};

export type Profile = {
  id: string;
  fullName: string;
  headline: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  education: Education[];
  employment: Employment[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
  visibility: Visibility;
};
