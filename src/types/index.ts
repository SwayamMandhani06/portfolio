export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  year: string;
  githubUrl: string;
  liveUrl?: string;
  category: string;
  previewImages: {
    tile1: string;
    tile2: string;
    tileLarge: string;
  };
}

export interface Experiment {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  highlight?: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  metrics?: string[];
  isFuture?: boolean;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}
