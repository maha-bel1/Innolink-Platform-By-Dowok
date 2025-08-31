export interface Partner {
  id: string;
  name: string;
  domain: string;
  compatibilityScore: number;
  specialties: string[];
  isRecommended: boolean;
  avatar: string;
  institution: string;
  bio: string;
  technicalSkills: string[];
  projects: Project[];
  collaborationNeeds: string[];
  collaborationOffers: string[];
  publications: Publication[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  technologies: string[];
}

export interface Publication {
  id: string;
  title: string;
  type: 'article' | 'paper' | 'documentation' | 'github';
  url: string;
  date: string;
}
