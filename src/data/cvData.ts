export interface VhsTapeMeta {
  id: number;
  code: string;
  short: string;
  status: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
  svgType?:
    | 'langchain'
    | 'langgraph'
    | 'rag'
    | 'openai'
    | 'claude'
    | 'gemini'
    | 'langsmith'
    | 'aws'
    | 'n8n';
}

export interface SkillCategory {
  category: string;
  subtitle: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  link?: string;
  logoType: 'progclub' | 'isu' | 'crowdv' | 'greydevs' | 'instantschool';
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  logoType: 'unideb' | 'scc';
  bullets: string[];
}

export interface ProjectItem {
  title: string;
  badge: string;
  url: string;
  urlLabel: string;
  tech: string[];
  artType: 'modelverse' | 'thesis' | 'norvaspace';
  bullets: string[];
}

export interface AwardItem {
  title: string;
  org: string;
  year: string;
  badge: string;
}

export const VHS_TAPES: VhsTapeMeta[] = [
  { id: 0, code: 'TAPE 01', short: 'SKILLS', status: 'NOW PLAYING: TAPE 01 — SKILLS & TECH STACK' },
  { id: 1, code: 'TAPE 02', short: 'EXPERIENCE', status: 'NOW PLAYING: TAPE 02 — WORK EXPERIENCE' },
  { id: 2, code: 'TAPE 03', short: 'EDUCATION', status: 'NOW PLAYING: TAPE 03 — EDUCATION' },
  { id: 3, code: 'TAPE 04', short: 'PROJECTS', status: 'NOW PLAYING: TAPE 04 — APPLIED AI & RESEARCH PROJECTS' },
  { id: 4, code: 'TAPE 05', short: 'AWARDS', status: 'NOW PLAYING: TAPE 05 — AWARDS & HONORS' },
];

export const CORE_COMPETENCIES_TEXT =
  'LLM Applications • RAG & Vector Search • LangChain & LangGraph • Python & FastAPI • React & TypeScript • AWS & Docker • SQL & MongoDB';

export const SPOKEN_LANGUAGES_TEXT =
  'English (Fluent) • Hungarian (Basic) • Bengali (Native)';

export const CV_SKILLS: SkillCategory[] = [
  {
    category: '01 // PROGRAMMING LANGUAGES',
    subtitle: 'Core Systems, Scripting & Relational Querying',
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript (ES6+)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Java (Working Knowledge)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C++ (Working Knowledge)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'SQL (MySQL)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    category: '02 // LLM & AGENT SYSTEMS',
    subtitle: 'Multi-Step Planning, Tool Calling, Control Loops & RAG',
    items: [
      { name: 'LangChain', svgType: 'langchain' },
      { name: 'LangGraph', svgType: 'langgraph' },
      { name: 'RAG & Vector Search', svgType: 'rag' },
      { name: 'OpenAI API', svgType: 'openai' },
      { name: 'Anthropic Claude', svgType: 'claude' },
      { name: 'Google Gemini API', svgType: 'gemini' },
      { name: 'LangSmith Evaluation', svgType: 'langsmith' },
    ],
  },
  {
    category: '03 // MACHINE LEARNING & DATA STORAGE',
    subtitle: 'Deep Learning, CNNs, ETL Pipelines & Databases',
    items: [
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'Matplotlib & Seaborn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ],
  },
  {
    category: '04 // WEB & BACKEND ENGINEERING',
    subtitle: 'Production Full-Stack & Static Data Architectures',
    items: [
      { name: 'React.js (Highly Proficient)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Astro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },
  {
    category: '05 // CLOUD, PLATFORM & TOOLING',
    subtitle: 'Deployment, Containers, CI/CD & Workflow Automation',
    items: [
      { name: 'AWS', svgType: 'aws' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub Actions CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
      { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg' },
      { name: 'n8n Workflow Automation', svgType: 'n8n' },
      { name: 'pytest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg' },
      { name: 'JUnit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-original.svg' },
    ],
  },
];

export const CV_EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Programming Club, University of Debrecen',
    role: 'President',
    period: '01/2026 – Current',
    location: 'Debrecen, Hungary',
    link: 'https://norva.space',
    logoType: 'progclub',
    bullets: [
      'Lead a programming club of over 300 members, organizing workshops, hackathons and career-development events.',
      'Work with members across very different experience levels, from first-year beginners to competition medalists.',
      "Established and oversee the club's official GitHub organization to host member projects, and built the club website (https://norva.space).",
    ],
  },
  {
    company: 'International Student Union, University of Debrecen',
    role: 'Officer of Education',
    period: '11/2025 – Current',
    location: 'Debrecen, Hungary',
    logoType: 'isu',
    bullets: [
      'Manage educational programmes supporting a diverse international student body and collaborate with university staff to promote academic excellence.',
      'Serve as a point of contact for international students, turning recurring friction points into concrete programme improvements.',
    ],
  },
  {
    company: 'CrowdV',
    role: 'Campus Ambassador',
    period: '08/2024 – 01/2025',
    location: 'Dhaka, Bangladesh',
    logoType: 'crowdv',
    bullets: [
      'Supported individuals with visual impairment as a transcriber and promoted awareness for people with special needs.',
    ],
  },
  {
    company: 'Grey Devs',
    role: 'Founder & Lead',
    period: '06/2023 – Current',
    location: 'Debrecen, Hungary',
    logoType: 'greydevs',
    bullets: [
      'Founded and run a development studio delivering web, mobile, backend and AI-assisted solutions to startups and clients, owning scoping, architecture, delivery, deployment and post-launch support end to end.',
      'Design and build data-driven product systems, including automated ingestion pipelines that normalize multi-source external data into versioned, queryable stores.',
      'Advise clients on scaling backend systems, data models and AI-assisted features, with reliability, cost and maintainability as explicit design constraints.',
      'Led the team as Team Lead in three national and international competitions, advancing to the finals in each and winning outright.',
    ],
  },
  {
    company: 'Instant School',
    role: 'Affiliate Zone Leader',
    period: '03/2020 – 10/2022',
    location: 'Dhaka, Bangladesh',
    logoType: 'instantschool',
    bullets: [
      'Appointed and managed a team of 9 campus ambassadors, providing mentorship, coordination, and performance oversight, later promoted to Zone Leader.',
    ],
  },
];

export const CV_EDUCATION: EducationItem[] = [
  {
    institution: 'University of Debrecen',
    degree: 'BSc Computer Science',
    period: 'Expected 2027',
    location: 'Debrecen, Hungary',
    logoType: 'unideb',
    bullets: [
      'Stipendium Hungaricum Scholarship, 2024/25 from Tempus Public Foundation (Government of Hungary).',
    ],
  },
  {
    institution: 'Sylhet Cadet College',
    degree: 'High School Diploma',
    period: '2022',
    location: 'Sylhet, Bangladesh',
    logoType: 'scc',
    bullets: [
      'Bangladesh Government Merit Scholarship (2020 & 2022), Directorate of Secondary and Higher Education (DSHE).',
    ],
  },
];

export const CV_PROJECTS: ProjectItem[] = [
  {
    title: 'ModelVerse — LLM Pricing & Comparison Platform',
    badge: 'PRODUCTION AI PLATFORM',
    url: 'https://modelverse-app.pages.dev',
    urlLabel: 'LIVE PLATFORM (MODELVERSE-APP.PAGES.DEV) ↗',
    tech: ['Python', 'LangChain', 'LangGraph', 'RAG', 'FastAPI', 'Astro', 'AWS', 'Docker'],
    artType: 'modelverse',
    bullets: [
      'Live platform tracking pricing, context limits and use cases across 15 models and 8 coding agents, rendered as an Astro static site from versioned data.',
      'Scheduled pipeline aggregates and normalizes live data from three upstream sources into versioned daily snapshots.',
      'LLM layer with LangChain and LangGraph: scheduled workflows read the catalogue, call provider APIs, score each record and emit a daily digest, price-change alerts and per-model recommendations.',
      'Model comparison views, auto-updating market table and data-driven stack recommender.',
    ],
  },
  {
    title: 'Bachelor Thesis — Robustness of Deep Learning Models Under Adversarial Attacks',
    badge: 'DEEP LEARNING RESEARCH',
    url: 'https://github.com/sahriarnahid',
    urlLabel: 'GITHUB RESEARCH REPOSITORY ↗',
    tech: ['Python', 'PyTorch', 'NumPy', 'Matplotlib'],
    artType: 'thesis',
    bullets: [
      'Training a CNN and ResNet-18 on CIFAR-10 and measuring how accuracy holds up under standard and adaptive adversarial attacks (FGSM, PGD, BPDA).',
      'Comparing two defence approaches — adversarial training against input preprocessing and quantifying the accuracy trade-off each one costs.',
      'Reproducible PyTorch setup with fixed seeds and documented methodology.',
    ],
  },
  {
    title: 'Norva Space — University of Debrecen Programming Club Portal',
    badge: 'COMMUNITY PLATFORM',
    url: 'https://norva.space',
    urlLabel: 'VISIT NORVA.SPACE ↗',
    tech: ['React.js', 'TypeScript', 'Modern Web', 'GitHub Org'],
    artType: 'norvaspace',
    bullets: [
      'Official web platform and project hub built for the 300+ member Programming Club at the University of Debrecen.',
      'Showcases member repositories, hackathons, technical workshops, and career-development initiatives.',
    ],
  },
];

export const CV_AWARDS: AwardItem[] = [
  {
    title: 'National Award, ICSC',
    org: 'International Computer Science Competition',
    year: '2025',
    badge: 'NATIONAL AWARD',
  },
  {
    title: 'Finalist, BCOLBD',
    org: 'Bangladesh Blockchain Olympiad',
    year: '2024',
    badge: 'NATIONAL FINALIST',
  },
  {
    title: 'Award of Merit, IBCOL Finals',
    org: 'International Blockchain Olympiad',
    year: '2023',
    badge: 'INTERNATIONAL FINALS',
  },
  {
    title: 'Best Prototype Award, BCOLBD Finals',
    org: 'Bangladesh Blockchain Olympiad',
    year: '2023',
    badge: 'BEST PROTOTYPE',
  },
];

export function downloadPrintableCV(onComplete?: () => void) {
  const a = document.createElement('a');
  a.href = `${import.meta.env.BASE_URL}Sahriar_Rahman_Nahid_CV.pdf`;
  a.download = 'Sahriar_Rahman_Nahid_CV.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (onComplete) onComplete();
}
