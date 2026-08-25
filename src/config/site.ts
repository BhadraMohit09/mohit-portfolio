export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export const site = {
  name: "Bhadra Mohit",
  firstName: "ʇᴉɥoW",
  url: "https://bhadramohit.vercel.app",

  quote: {
    text: "",
    author: "",
  },

  profileImages: [
    "/astronaut.jpeg",
  ],

  bannerImage: "/banner-gradient.jpg",
  socialBannerImage: "",

  initials: "MB",

  role: "Full Stack Developer",

  location: "Jamnagar, Gujarat, India",

  timezone: "Asia/Kolkata",

  email: "bhadramohit.cloud@gmail.com",

  greeting: "Hey, I'm Mohit",

  tagline:
    "Crafting exceptional digital experiences with modern technologies, with a focus on scalable architecture, clean code, and great UX.",

  about: [
    "I'm a passionate full-stack developer with a strong foundation in modern web technologies and a keen interest in AI/ML. My journey in technology started with curiosity and has evolved into a professional pursuit of excellence.",

    "With experience spanning the MERN stack, .NET, and Python-based ML solutions, I enjoy turning innovative ideas into elegant, scalable digital solutions that provide real value.",

    "Currently working as a Software Engineer at ZennovaTech, I contribute to enterprise-grade full-stack applications while continuing to explore open-source projects and mentor students at Darshan University.",
  ],

  tldr: [
    "Building full-stack products.",
    "Engineering scalable systems.",
    "Learning AI & ML.",
    "Mentoring future developers.",
  ],

  status: {
    available: true,
    availableText: "open to opportunities",
    nowLearning: "System Design • AI/ML • Cloud Engineering • Advanced Backend",
    nowBuilding: "Enterprise full-stack applications",
    nowListening: "",
  },

  socials: {
    github: "https://github.com/BhadraMohit09",
    twitter: "",
    linkedin: "https://linkedin.com/in/bhadramohit27",
    email: "mailto:bhadramohit.cloud@gmail.com",
    resume: "",
    discord: "",
    medium: "",
  },

  experience: [
    {
      company: "ZennovaTech",
      role: "Software Engineer",
      period: "Current Role",
      blurb:
        "4 Projects shipped, 100% Typescript, 100+ APIs built, and 700+ commits. Architecting scalable full-stack enterprise applications and delivering high-performance custom web software using the MERN stack and .NET Core.",
    },

    {
      company: "Darshan University",
      role: "Teaching Assistant",
      period: "June 2024 – Present",
      blurb:
        "Mentored 100+ students, conducted 4+ technical workshops, supervised 50+ labs, and maintained a 95% positive feedback rating while guiding students through complex algorithms and web technologies.",
    },

    {
      company: "Freelance",
      role: "Full Stack Developer",
      period: "2022 – 2023",
      blurb:
        "3 projects mixed tech, 20+ APIs, and 500+ commits. Developed responsive web applications, integrating modern frontend libraries with robust backend systems to deliver end-to-end client solutions.",
    },

    {
      company: "GitHub Community",
      role: "Open Source Contributor",
      period: "2022 – Present",
      blurb:
        "Maintained multiple utility repositories and contributed to various open-source projects, accumulating 500+ commits across different projects and helping improve developer tools.",
      url: "https://github.com/BhadraMohit09",
    },
  ] as Job[],

  projects: [
    {
      title: "BharatAtlas (IndiaHub)",

      blurb:
        "India's largest structured searchable information portal providing instant lookup for 19,000+ PIN codes, 150,000+ IFSC branches, RTO vehicle series, railways, airports, and government schemes.",

      story:
        "A large-scale structured information platform designed to make frequently needed Indian public and geographic information instantly searchable. The platform brings together PIN codes, banking information, RTO vehicle series, railway information, airports, and government schemes into a unified searchable experience.",

      stack: [
        "Next.js",
        "Tailwind CSS",
        "Search API",
        "Vercel",
      ],

      year: "2026",

      links: {
        live: "https://onebharat.vercel.app",
      },

      featured: true,
      status: "Live",

      image:
        "https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend", "Fullstack"],
    },

    {
      title: "FileForge",

      blurb:
        "Universal client-side document and file transformation platform for converting PDFs, processing images, formatting JSON, and generating secure files directly in the browser.",

      story:
        "A privacy-focused browser-based file transformation platform designed to process files locally. The application focuses on speed, convenience, and privacy by performing core transformations directly on the client.",

      stack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Web Workers",
      ],

      year: "2026",

      links: {
        live: "https://file-forge-silk.vercel.app/",
      },

      featured: true,
      status: "Live",

      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "Bharat Grantha",

      blurb:
        "Digital heritage knowledge platform preserving and organizing India's sacred literature with 1,200+ scriptures, 3,400+ Vedic mantras, a temple explorer, and intelligent Granthika AI assistance.",

      story:
        "A digital heritage and knowledge platform focused on preserving and organizing India's sacred literature. The platform combines structured content, discovery tools, a temple explorer, and AI-assisted interaction through Granthika.",

      stack: [
        "Next.js",
        "Granthika AI",
        "Clerk Auth",
        "Tailwind CSS",
      ],

      year: "2026",

      links: {
        live: "https://granthika.vercel.app",
      },

      featured: true,
      status: "Live",

      image:
        "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend", "Fullstack"],
    },

    {
      title: "Time Hub",

      blurb:
        "Futuristic multi-functional time utility suite featuring a global World Clock, precision Stopwatch, customizable Countdown Timer, and smart audio Alarm alerts.",

      story:
        "A unified time utility experience bringing together multiple everyday time-management tools. The application provides interactive global timezone information alongside stopwatch, countdown, and audio alarm functionality.",

      stack: [
        "JavaScript",
        "Tailwind CSS",
        "Web Audio API",
        "Vercel",
      ],

      year: "2026",

      links: {
        live: "https://timehubone.vercel.app",
      },

      featured: true,
      status: "Live",

      image:
        "https://images.pexels.com/photos/1198264/pexels-photo-1198264.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "CryptoGuard Toolkit",

      blurb:
        "A client-side cybersecurity laboratory for encryption, decryption, and cryptographic hashing using industry-standard algorithms including AES, RSA, SHA-256, and SHA-512.",

      story:
        "A browser-based cryptography toolkit designed to provide practical utilities for encryption, decryption, and hashing. The application works with established cryptographic algorithms while keeping the experience accessible through a client-side interface.",

      stack: [
        "Web Crypto API",
        "JavaScript",
        "Tailwind CSS",
        "Security",
      ],

      year: "2026",

      links: {
        live: "https://cryptogaurdlab.vercel.app",
      },

      featured: true,
      status: "Live",

      image:
        "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "Finance Calculator",

      blurb:
        "Comprehensive financial calculator covering EMI, SIP, compound interest, and loan amortization, built for clean, mobile-friendly financial planning.",

      story:
        "A practical financial planning tool combining multiple commonly required calculations into a single clean interface. It supports EMI, SIP, compound interest, and loan amortization calculations with a mobile-friendly experience.",

      stack: [
        "React",
        "Vercel",
        "Tailwind CSS",
      ],

      year: "2026",

      links: {
        live: "https://fin-calc-delta.vercel.app/",
      },

      featured: true,
      status: "Live",

      image:
        "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "MAB Converter",

      blurb:
        "Modern converter for number-system and unit conversions with a keyboard-friendly interface, precision settings, and full accessibility support.",

      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vercel",
      ],

      year: "2026",

      links: {
        live: "https://mab-converter-beta.vercel.app/",
      },

      featured: false,
      status: "Live",

      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "GST Calculator",

      blurb:
        "A clean, fast GST calculation tool tailored for Indian businesses, supporting 5%, 12%, 18%, and 28% tax slabs with inclusive and exclusive calculation modes.",

      stack: [
        "Vanilla JS",
        "HTML5",
        "CSS3",
        "Cloudflare Pages",
      ],

      year: "2026",

      links: {
        live: "https://gst-calculator-76b.pages.dev/",
      },

      featured: false,
      status: "Live",

      image:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "AssessEdge360",

      blurb:
        "Enterprise-grade placement examination platform with timed assessments, automated grading, comprehensive analytics, and real-time monitoring.",

      story:
        "A full-stack assessment platform designed for placement examinations. The system combines timed assessments, automated grading, analytics, and real-time monitoring into an enterprise-oriented workflow.",

      stack: [
        "MERN Stack",
        "WebSockets",
        "JWT",
        "Redis",
        "Docker",
      ],

      year: "2026",

      links: {
        source:
          "https://github.com/BhadraMohit09/AssessEdge360",
      },

      featured: true,
      status: "In Development",

      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Fullstack", "Backend"],
    },

    {
      title: "Crop Analysis ML Pipeline",

      blurb:
        "Machine learning pipeline for agricultural data analysis with a Flask API, Docker deployment, PostgreSQL integration, and real-time predictions.",

      story:
        "A predictive agricultural system designed to analyze crop-related data and provide real-time predictions. The project combines machine learning with a Flask API, Docker deployment, and PostgreSQL.",

      stack: [
        "Python",
        "Flask",
        "Scikit-learn",
        "Docker",
        "PostgreSQL",
      ],

      year: "2026",

      links: {
        source:
          "https://github.com/BhadraMohit09/Crop_Analysis_with_Flask_API",
      },

      featured: false,
      status: "Open Source",

      image:
        "https://images.pexels.com/photos/1447238/pexels-photo-1447238.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Backend", "Fullstack"],
    },

    {
      title: "MAB Universal Converter",

      blurb:
        "Single interface for converting units, formats, and encodings, optimized for low-bandwidth environments with progressive enhancement.",

      stack: [
        "Vanilla JS",
        "HTML5",
        "CSS3",
        "PWA",
      ],

      year: "2026",

      links: {
        live:
          "https://mab-universal-converter-beta.netlify.app/",
      },

      featured: false,
      status: "Live",

      image:
        "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "MAB Translator",

      blurb:
        "Advanced translation application with real-time language detection, quick-copy functionality, and multiple download formats.",

      stack: [
        "React",
        "i18n",
        "REST API",
        "Material-UI",
      ],

      year: "2026",

      links: {
        live:
          "https://mab-translator-seven.vercel.app/",
      },

      featured: false,
      status: "Live",

      image:
        "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },

    {
      title: "Portfolio Website",

      blurb:
        "Modern responsive portfolio website built with React and Tailwind CSS, featuring smooth animations, PWA support, and optimized performance.",

      stack: [
        "React",
        "Tailwind CSS",
        "Vite",
        "PWA",
      ],

      year: "2026",

      links: {
        live: "https://bhadramohit.vercel.app/",
      },

      featured: false,
      status: "Live",

      image:
        "https://images.pexels.com/photos/3184465/pexels-photo/3184465.jpeg?auto=compress&cs=tinysrgb&w=800",

      categories: ["Frontend"],
    },
  ] as Project[],

  skills: [
    "React",
    "Node.js",
    "TypeScript",
    "JavaScript",
    ".NET Core",
    "C#",
    "Python",
    "Machine Learning",
    "MongoDB",
    "PostgreSQL",
    "SQL Server",
    "Next.js",
    "Express.js",
    "ASP.NET Core",
    "REST APIs",
    "WebSockets",
    "JWT",
    "OAuth2",
    "Redis",
    "Docker",
    "AWS",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "PWA",
    "GraphQL",
    "Git",
    "GitHub",
    "GitHub Actions",
    "Figma",
    "Postman",
    "Linux",
    "Nginx",
    "Web Workers",
    "Web Crypto API",
    "Scikit-learn",
    "Flask",
    "Redux",
  ],

  writing: [] as Post[],

  github: {
    username: "BhadraMohit09",
    contributionsLastYear: "500+",
  },

  footerNote: "Built with ❤️ and hardwork",
} as const;

export type Site = typeof site;