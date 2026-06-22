// ============================================================
// Central content + config for the portfolio.
// Edit values here to update the site (e.g. swap the email).
// ============================================================

export const profile = {
  name: "Vansh",
  roles: ["Full Stack Developer", "AI & Machine Learning Enthusiast"],
  tagline:
    "Building scalable web apps, intelligent systems, and real-world products.",
  location: "India",
  email: "singlavansh125@gmail.com",
  github: "https://github.com/vanshsingla66",
  githubUser: "vanshsingla66",
  linkedin: "https://www.linkedin.com/in/vansh-singla17",
  education: {
    degree: "B.Tech, Computer Science & Engineering (AI & Analytics)",
    school: "GLA University, Mathura",
    period: "2024 — Present",
  },
};

export const heroRotating = [
  "Full Stack Applications",
  "AI Powered Products",
  "Real-Time Systems",
  "Scalable Backend APIs",
];

export const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "MERN + AI", label: "Tech Stack" },
  { value: "Product", label: "Engineering Focus" },
];

export const exploring = [
  "Scalable backend systems",
  "Machine learning",
  "AI integrations",
  "Modern web architecture",
];

// --- Tech stack: category -> [{ name, icon-key }] ---
export const techStack: {
  category: string;
  accent: string;
  items: { name: string; icon: string }[];
}[] = [
  {
    category: "Languages",
    accent: "#4d7cff",
    items: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Java", icon: "java" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    category: "Frontend",
    accent: "#38e8ff",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
      { name: "Zustand", icon: "zustand" },
      { name: "React Query", icon: "reactquery" },
    ],
  },
  {
    category: "Backend",
    accent: "#a06bff",
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", icon: "rest" },
      { name: "JWT", icon: "jwt" },
      { name: "Socket.io", icon: "socket" },
    ],
  },
  {
    category: "Database",
    accent: "#5be0a0",
    items: [
      { name: "MongoDB", icon: "mongo" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    category: "AI / ML",
    accent: "#ff7eb6",
    items: [
      { name: "Scikit-learn", icon: "sklearn" },
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
      { name: "Matplotlib", icon: "matplotlib" },
    ],
  },
  {
    category: "Tools",
    accent: "#ffb347",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "VS Code", icon: "vscode" },
      { name: "Render", icon: "render" },
    ],
  },
];

export interface Project {
  name: string;
  subtitle?: string;
  tag: string;
  description: string;
  tech: string[];
  features: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    name: "Chatify",
    tag: "Realtime · Full Stack",
    description:
      "A real-time language exchange platform with messaging and video communication.",
    tech: ["React", "Node.js", "MongoDB", "Stream SDK", "JWT", "Socket.io"],
    features: [
      "Realtime messaging",
      "Video calling",
      "Authentication",
      "Friend request system",
      "Optimized state management",
    ],
    github: "https://github.com/vanshsingla66",
    demo: "",
  },
  {
    name: "ProtoStack",
    subtitle: "AI Powered Personalized Learning Platform",
    tag: "AI · Full Stack",
    description:
      "An intelligent learning system that detects knowledge gaps and recommends personalized learning paths.",
    tech: ["React", "Node.js", "Python", "MongoDB", "Scikit-learn"],
    features: [
      "AI recommendations",
      "Learning analytics",
      "Adaptive quizzes",
      "Personalized resources",
    ],
    github: "https://github.com/vanshsingla66",
    demo: "",
  },
  {
    name: "Knowledge Gap Detection",
    subtitle: "ML Classification System",
    tag: "Machine Learning",
    description:
      "Machine learning classifier that identifies topic-level weaknesses from student performance data.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    features: [
      "Data preprocessing",
      "Multi-label classification",
      "ML model comparison",
    ],
    github: "https://github.com/vanshsingla66",
    demo: "",
  },
];

export const journey = [
  {
    year: "2024",
    title: "Started Computer Science Engineering",
    body: "Began B.Tech in CSE (AI & Analytics) at GLA University, Mathura — diving into algorithms, systems, and the fundamentals.",
  },
  {
    year: "2025",
    title: "Built MERN stack applications",
    body: "Shipped full-stack products end to end — realtime apps, authentication, REST APIs, and clean state management.",
  },
  {
    year: "2026",
    title: "Exploring AI systems & scalable products",
    body: "Working on ML models, AI integrations, and architecture for systems built to scale to real users.",
  },
];
