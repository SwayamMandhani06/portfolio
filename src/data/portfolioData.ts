import { Project, Experiment, TimelineItem, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Swayam Mandhani',
  headline: 'Full-stack engineer building',
  headlineAccent: 'intelligent',
  headlineAccents: [
    'production-grade',
    'high-throughput',
    'data-driven',
    'autonomous',
    'resilient',
    'intelligent',
  ],
  headlineSuffix: 'systems.',
  roles: [
    'Full Stack Developer',
    'AI Engineer',
    'Data Analyst',
    'Cloud & DevOps',
    'Open Source Contributor',
  ],
  statusBadge: 'Available for opportunities',
  location: 'Pune, Maharashtra, India',
  email: 'swayammandhani.work@gmail.com',
  phone: '+91-9421852724',
  github: 'https://github.com/SwayamMandhani06',
  linkedin: 'https://linkedin.com/in/swayam-mandhani',
  resumeUrl: '/Swayam_Mandhani_Resume.pdf',
  bio: `I'm a Computer Engineering student at PCCoE Pune, building full-stack products with React, Next.js, and Node — and increasingly, systems that reason: RAG pipelines, LLM tool-calling agents, vector search. As Co-Treasurer of PCCoE's ACM chapter, I led the redesign that won the Outstanding Website Award 2025 among 200+ participating chapters, while running transparent budgeting for a 150+ member community. I've shipped a copyrighted agricultural marketplace app, co-authored a published research paper, and interned as a Data Analyst building BI systems for hospitality operations. I like building things that are real, not just demos.`,
  chips: [
    'PCCoE Pune',
    'Pune, Maharashtra',
    'Outstanding Website Award 2025',
    'Published Research (AICCoNS 2025)',
  ],
};

export const MARQUEE_ROW_1 = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'FastAPI',
  'MongoDB',
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'FastAPI',
  'MongoDB',
];

export const MARQUEE_ROW_2 = [
  'AWS',
  'Docker',
  'Terraform',
  'TensorFlow',
  'RAG / LLMs',
  'GCP',
  'AWS',
  'Docker',
  'Terraform',
  'TensorFlow',
  'RAG / LLMs',
  'GCP',
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C++', 'C'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST & GraphQL APIs', 'JWT Authentication'],
  },
  {
    id: 'ai-genai',
    label: 'AI / GenAI',
    skills: [
      'Retrieval-Augmented Generation (RAG)',
      'Embeddings',
      'Semantic Search',
      'Vector Databases',
      'Prompt Engineering',
      'AI Agents & Tool/Function Calling',
    ],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3, IAM, CloudWatch, VPC)', 'Git', 'GitHub', 'CI/CD', 'Docker', 'Linux'],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: ['MongoDB', 'MySQL', 'DynamoDB'],
  },
];

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    id: 'examsense-ai',
    number: '01',
    title: 'ExamSense AI',
    subtitle: 'Academic Intelligence & RAG Tutoring Platform',
    category: 'Full-Stack / AI',
    year: '2026',
    description:
      'Full-stack AI-native academic intelligence platform with JWT-based role authentication (Admin/Student), PDF syllabus ingestion, and a queued background processing pipeline handling 100+ documents with reliable error resolution.',
    highlights: [
      'Engineered a RAG-based Ask-AI chat agent using sentence-transformer embeddings, vector search, and LLM tool calling to improve retrieval quality.',
      'Shipped an analytics dashboard surfacing topic, difficulty, and repeated-question trends across 50+ queries.',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'FastAPI', 'MongoDB', 'RAG', 'Groq Llama 3.3'],
    githubUrl: 'https://github.com/SwayamMandhani06/examsense-ai',
    liveUrl: 'https://examsense-ai-project.vercel.app/',
    previewImages: {
      tile1: '/projects/examsense.png',
      tile2: '/projects/examsense.png',
      tileLarge: '/projects/examsense.png',
    },
  },
  {
    id: 'campuscare',
    number: '02',
    title: 'CampusCare',
    subtitle: 'Campus Complaint & Facility Management System',
    category: 'Full-Stack / DevOps',
    year: '2026',
    description:
      'Full-stack campus complaint and facility management system with role-based workflows for reporting, triaging, assigning, tracking, and resolving maintenance issues across Student, Admin, and Staff portals.',
    highlights: [
      'Automated cloud infrastructure provisioning and deployment using Terraform and Ansible on GCP Compute Engine.',
      'Containerized services with Docker Compose and configured an NGINX reverse proxy with isolated database networking.',
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'Terraform', 'Ansible', 'GCP'],
    githubUrl: 'https://github.com/SwayamMandhani06/CampusCare',
    liveUrl: 'http://34.93.174.126/',
    previewImages: {
      tile1: '/projects/campuscare.png',
      tile2: '/projects/campuscare.png',
      tileLarge: '/projects/campuscare.png',
    },
  },
  {
    id: 'taskly',
    number: '03',
    title: 'Taskly',
    subtitle: 'Local-First Productivity Platform & PWA',
    category: 'Frontend / Distributed State',
    year: '2026',
    description:
      'Local-first productivity platform with offline task management, habits, recurring tasks, subtasks, calendar planning, and cross-device synchronization.',
    highlights: [
      'Implemented IndexedDB persistence with Dexie.js, offline operation queuing, and background cloud sync.',
      'Supabase Realtime updates, authentication, PostgreSQL Row Level Security, and PWA installability.',
    ],
    techStack: ['React', 'TypeScript', 'Supabase', 'Dexie.js', 'Zustand', 'PWA'],
    githubUrl: 'https://github.com/SwayamMandhani06/Taskly',
    liveUrl: 'https://taskly-swayam.vercel.app/',
    previewImages: {
      tile1: '/projects/taskly.png',
      tile2: '/projects/taskly.png',
      tileLarge: '/projects/taskly.png',
    },
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    title: 'Habit Tracker',
    description: 'Minimalist offline-first PWA for habit tracking with streaks, daily accountability, and monthly analytics.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB'],
    githubUrl: 'https://github.com/SwayamMandhani06/Habit-Tracker',
    liveUrl: 'https://habit-tracker-swayam.vercel.app/pin?from=%2F',
    highlight: 'Offline-first PWA',
  },
  {
    title: 'Retail Sales Intelligence',
    description: 'End-to-end data engineering and analysis case study: cleaning, pipeline, visualization, and actionable revenue insights.',
    tech: ['Python', 'Pandas', 'SQL', 'Power BI'],
    githubUrl: 'https://github.com/SwayamMandhani06/retail-sales-intelligence',
    liveUrl: 'https://retail-sales-intelligence-ten.vercel.app/',
    highlight: 'BI & Analytics',
  },
  {
    title: 'Agro Product App',
    description: 'AI-enabled agricultural marketplace with a TensorFlow recommendation engine, live mandi price tracking, and multilingual support.',
    tech: ['Android Studio', 'Firebase', 'TensorFlow', 'Dart / Flutter'],
    githubUrl: 'https://github.com/SwayamMandhani06/agro-product-app',
    liveUrl: 'https://agro-product-app.vercel.app',
    highlight: 'Copyright Reg. LD-20250168587',
  },
  {
    title: 'VaultGuard',
    description: 'AI-powered fraud detection & transaction narrative generation dashboard with real-time risk anomaly scoring.',
    tech: ['React', 'Node.js', 'Groq', 'JavaScript'],
    githubUrl: 'https://github.com/SwayamMandhani06/VaultGuard',
    highlight: 'Fraud Detection & LLMs',
  },
  {
    title: 'JourneyHub',
    description: 'Full-stack travel agency booking and destination discovery platform.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/SwayamMandhani06/JourneyHub',
    highlight: 'Full-Stack Web',
  },
  {
    title: 'Datum AUTOSAR Analyzer',
    description: 'AI-powered AUTOSAR HLD analysis assistant for document intelligence, semantic search, architecture extraction, and citation RAG.',
    tech: ['Python', 'RAG', 'Vector Search', 'AUTOSAR'],
    githubUrl: 'https://github.com/SwayamMandhani06/datum',
    highlight: 'Automotive AI',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    period: 'Aug 2023',
    role: 'B.Tech in Computer Engineering',
    organization: 'Pimpri Chinchwad College of Engineering (PCCoE Pune)',
    description: 'Began engineering studies focusing on computer architecture, algorithms, distributed systems, and machine learning foundations.',
  },
  {
    period: 'July 2025 – Present',
    role: 'Co-Treasurer',
    organization: "PCCoE ACM Student Chapter",
    description:
      'Led the chapter website redesign that won the Outstanding Website Award 2025 among 200+ participating chapters at the ACM India Annual Event. Own budgeting and fund allocation for a 150+ member community with zero-discrepancy reporting. Coordinated 25+ technical events across 50+ students, faculty, and industry professionals.',
    metrics: ['Outstanding Website Award 2025', '150+ Members', '25+ Events'],
  },
  {
    period: 'June 2026 – August 2026',
    role: 'Data Analyst Intern',
    organization: 'Chinar Hospitality',
    description:
      'Built an AI-powered Sales, Revenue, Inventory, and Power BI analytics system for restaurant and catering operations. Designed automated ETL workflows turning raw POS transactions and stock records into structured reporting with interactive executive dashboards.',
    metrics: ['ETL Pipelines', 'Power BI Analytics', 'Interactive Dashboards'],
  },
  {
    period: '2025',
    role: 'Published Researcher & IP Registrant',
    organization: 'AICCoNS 2025 / Copyright Office of India',
    description:
      'Co-authored and published "AgriTrade: A Smart E-Commerce Platform for Farmers" at the 1st International Conference on AI, Computation, Communication & Network Security (AICCoNS 2025). Shipped the Agro Product App under the project, registered under India\'s Copyright Act (Cert. No. LD-20250168587).',
    metrics: ['Published at AICCoNS 2025', 'Copyright Cert. LD-20250168587'],
  },
  {
    period: 'June 2027 (Expected)',
    role: 'Graduation — B.Tech Computer Engineering',
    organization: 'PCCoE Pune',
    description: 'Completing degree program with strong practical foundations in AI, data systems, and product engineering.',
    isFuture: true,
  },
];

export const PROOF_DATA = {
  research: {
    title: 'Published Research',
    paper: 'AgriTrade: A Smart E-Commerce Platform for Farmers',
    venue: '1st Intl. Conference on AI, Computation, Communication & Network Security (AICCoNS 2025)',
    description:
      'Co-authored research on an AI-driven agricultural marketplace with real-time price tracking, weather forecasting, and a scalable recommendation engine.',
  },
  ip: {
    title: 'Registered Intellectual Property',
    name: 'Agro Product App',
    registration: 'Registered under the Copyright Act of India',
    certNo: 'Cert. No. LD-20250168587',
  },
  awards: [
    {
      title: 'Outstanding Website Award 2025',
      organization: 'ACM India Annual Event (200+ Chapters)',
      year: '2025',
    },
    {
      title: '1st Place Winner',
      organization: 'Codigo 2025 · PCCoE',
      year: '2025',
    },
    {
      title: 'Best Paper Award',
      organization: 'Tech Summit Baby Conference 2025 · PCCoE',
      year: '2025',
    },
  ],
  certifications: [
    'Claude 101, Claude Code 101 & AI Fluency with Anthropic API — Anthropic',
    'Software Engineering Job Simulation — JPMorgan Chase & Co. (via Forage)',
    'Data Analyst Job Simulation — Deloitte (via Forage)',
    'Java Masterclass 2025: 130+ Hours of Expert Lessons — Udemy',
  ],
};
