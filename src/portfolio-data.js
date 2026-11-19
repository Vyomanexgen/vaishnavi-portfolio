/**
 * LAKSHMI VAISHNAVI PARITALA - VERIFIED PORTFOLIO DATA
 * Strictly adheres to verified resume facts and Master RASE prompt requirements.
 */

export const PORTFOLIO_DATA = {
  personal: {
    fullName: "Lakshmi Vaishnavi Paritala",
    shortName: "Vaishnavi",
    tagline: "Computer Science & Engineering Student | Aspiring Software Developer",
    heroHeadline: "Building Intelligent Digital Experiences with Code & Creativity.",
    heroDescription: "I'm a Computer Science and Engineering student passionate about software development, full-stack applications, and emerging AI technologies. I love transforming ideas into practical, user-friendly digital solutions.",
    location: "Vijayawada, India",
    email: "vaishnaviparitala6@gmail.com",
    phone: "+91 7901038380",
    phoneFormatted: "+91 79010 38380",
    github: "https://github.com/vaishnaviparitala",
    githubUsername: "vaishnaviparitala",
    linkedin: "https://www.linkedin.com/in/vaishnavi-paritala",
    avatarImage: "./vaishnavi_photo.jpg",
    statusBadge: "Open to Internships & Projects (2025–2026)",
    university: "KL University, Vijayawada",
    degree: "B.Tech in Computer Science & Engineering",
    batch: "2024 – Present",
  },

  metrics: [
    { value: "KL University", label: "B.Tech CSE Undergraduate", highlight: true },
    { value: "4", label: "Engineering Projects", highlight: false },
    { value: "Skill Parivar", label: "Hackathon Participant", highlight: false },
    { value: "92.7%", label: "Intermediate MPC Score", highlight: false },
    { value: "2", label: "Industry Certifications", highlight: false }
  ],

  about: {
    heading: "More About Me",
    bio: [
      "I'm Lakshmi Vaishnavi Paritala, a Computer Science and Engineering undergraduate at KL University. I enjoy programming, problem-solving, and developing practical software applications.",
      "My technical interests include Python programming, web development, React, Spring Boot, database management, and AI-powered application development.",
      "I believe in continuous learning, exploring new technologies, and turning innovative ideas into working solutions.",
      "My goal is to grow as a software developer and contribute to meaningful technology projects."
    ],
    highlights: [
      {
        icon: "code",
        title: "Programming & Problem Solving",
        description: "Strong foundation in Python, C, SQL, and algorithmic thinking to solve computational problems efficiently."
      },
      {
        icon: "layout",
        title: "Full-Stack Web Development",
        description: "Building responsive frontends with React and JavaScript alongside backend fundamentals in Spring Boot and Python."
      },
      {
        icon: "cpu",
        title: "AI & Emerging Technologies",
        description: "Exploring LLMs, prompt engineering, semantic embeddings, cosine similarity search, and structured JSON outputs."
      },
      {
        icon: "graduation-cap",
        title: "Continuous Learning & Hackathons",
        description: "Active hackathon contributor (Skill Parivar), dedicated to rapid prototype development and team collaboration."
      }
    ]
  },

  skills: {
    programming: [
      { name: "Python", level: "Proficient", icon: "terminal" },
      { name: "C", level: "Core Foundations", icon: "cpu" },
      { name: "SQL", level: "Database Queries", icon: "database" },
      { name: "JavaScript", level: "ES6+ Modern JS", icon: "code" }
    ],
    frontend: [
      { name: "HTML5", level: "Semantic Markup", icon: "file-code" },
      { name: "CSS3", level: "Styling & Responsive", icon: "palette" },
      { name: "JavaScript", level: "Client-side Logic", icon: "zap" },
      { name: "React.js", level: "Component Architecture", icon: "component" },
      { name: "Web Design", level: "UI/UX & Accessibility", icon: "layout" }
    ],
    backend: [
      { name: "Python", level: "Backend Logic & Scripts", icon: "server" },
      { name: "Spring Boot", level: "Enterprise Java Framework", icon: "box" },
      { name: "REST API Fundamentals", level: "Endpoint Architecture", icon: "network" }
    ],
    tools: [
      { name: "Git", level: "Version Control", icon: "git-branch" },
      { name: "GitHub", level: "Collaboration & Repos", icon: "github" },
      { name: "Visual Studio Code", level: "Primary Development IDE", icon: "monitor" }
    ],
    coreStrengths: [
      { name: "Problem-Solving", desc: "Structured approach to debugging and logical design." },
      { name: "Logical Thinking", desc: "Data flow analysis and algorithmic reasoning." },
      { name: "Teamwork", desc: "Collaborative mindset for group engineering tasks & hackathons." },
      { name: "Communication", desc: "Clear technical and interpersonal presentation." },
      { name: "Adaptability", desc: "Quick adjustment to new technology stacks." },
      { name: "Quick Learning", desc: "Rapid uptake of libraries, APIs, and frameworks." }
    ],
    aiInterests: [
      { name: "Prompt Engineering", desc: "Structuring system instructions for optimal LLM accuracy." },
      { name: "Structured JSON Outputs", desc: "Guaranteed JSON schema generation for deterministic API pipelines." },
      { name: "Function & Tool Calling", desc: "Connecting LLMs to external APIs and deterministic code functions." },
      { name: "Embeddings", desc: "Vector representations of text for semantic similarity search." },
      { name: "Semantic Search", desc: "Finding contextual relevance beyond simple keyword search." },
      { name: "Retrieval-Augmented Generation (RAG)", desc: "Augmenting model knowledge with verified document stores." },
      { name: "LLM Integration", desc: "Connecting modern generative models into end-user software applications." }
    ]
  },

  projects: [
    {
      id: "project-1",
      number: "01",
      title: "Student Attendance Management System",
      status: "Completed",
      statusClass: "completed",
      badge: "Completed Project",
      shortDescription: "A web-based application to manage student registration, daily attendance marking, and attendance record tracking.",
      overview: "Developed a web-based application to manage student registration, daily attendance marking, and attendance record tracking.",
      problemStatement: "Manual paper attendance registers lead to calculation errors, misplaced records, and excessive administrative effort. Academic institutions need a lightweight, intuitive system for rapid student registration and automated attendance percentage tracking.",
      features: [
        "Developed a web-based application to manage student registration, daily attendance marking, and attendance record tracking.",
        "Implemented attendance percentage calculations and organized student records for simplified academic management.",
        "Designed a user-friendly interface and tested application inputs and logic to identify and resolve common errors."
      ],
      technologies: ["React", "JavaScript", "HTML", "CSS", "Backend APIs"],
      myContribution: "Developed the core web interface with React, implemented attendance tracking and percentage calculation logic, and conducted thorough application testing to identify and resolve common errors.",
      github: "https://github.com/vaishnaviparitala",
      liveDemo: null,
      gradient: "from-pink-100 to-rose-50"
    },
    {
      id: "project-2",
      number: "02",
      title: "Personal Expense Tracker",
      status: "Completed",
      statusClass: "completed",
      badge: "Completed Project",
      shortDescription: "Built a web-based application to record, categorize, organize, and monitor daily expenses.",
      overview: "Built a web-based application to record, categorize, organize, and monitor daily expenses.",
      problemStatement: "Without consistent tracking, individuals struggle to understand their spending habits, identify wasteful expenses, or stay within budgeting limits.",
      features: [
        "Built a web-based application to record, categorize, organize, and monitor daily expenses.",
        "Implemented expense entry, transaction categorization, spending history, and total expense calculation features.",
        "Applied Python programming, data processing, and input validation to improve the accuracy of expense records."
      ],
      technologies: ["Python", "Web Technologies", "Data Validation"],
      myContribution: "Engineered the expense logging functionality, structured the data processing and category summation routines in Python, and applied input validation to ensure financial record accuracy.",
      github: "https://github.com/vaishnaviparitala",
      liveDemo: null,
      gradient: "from-blue-50 to-indigo-50"
    },
    {
      id: "project-3",
      number: "03",
      title: "AI Job & Career Matching Agent",
      status: "Planned Project",
      statusClass: "in-progress",
      badge: "Planned Project",
      shortDescription: "Proposed an AI-powered career assistant to analyze resumes, extract candidate skills, and identify relevant job opportunities.",
      overview: "Proposed an AI-powered career assistant to analyze resumes, extract candidate skills, and identify relevant job opportunities using semantic matching and embeddings.",
      problemStatement: "Traditional keyword-based job matching fails to capture contextual nuance, synonyms, and transferable skills, resulting in poor job recommendations and overlooked qualified candidates.",
      features: [
        "Proposed an AI-powered career assistant to analyze resumes, extract candidate skills, and identify relevant job opportunities.",
        "Planned semantic matching using vector embeddings and cosine similarity to compare candidate profiles with job descriptions.",
        "Designed a proposed workflow involving structured JSON outputs, AI-generated career insights, and a Python REST API backend."
      ],
      technologies: ["Python", "LLM APIs", "Embeddings", "SQL"],
      myContribution: "Architecting the technical pipeline: designing prompt schemas for deterministic skill extraction, planning vector similarity matching with cosine similarity, and specifying Python REST API contracts.",
      github: "https://github.com/vaishnaviparitala",
      liveDemo: null,
      gradient: "from-purple-50 to-pink-50"
    },
    {
      id: "project-4",
      number: "04",
      title: "FIS – Automatic Fire Extinguisher Robot",
      status: "First-Year Academic Project",
      statusClass: "academic",
      badge: "First-Year Academic Project",
      shortDescription: "Developed a basic robotic concept to assist in fire detection and fire-extinguishing applications.",
      overview: "Participated in a first-year engineering project focused on developing a basic robotic concept to assist in fire detection and fire-extinguishing applications.",
      problemStatement: "Direct human exposure to fire hazards poses significant safety risks during emergency situations. Exploring robotic systems offers a practical path toward remote detection and suppression.",
      features: [
        "Participated in a first-year engineering project focused on developing a basic robotic concept to assist in fire detection and fire-extinguishing applications.",
        "Explored how a mobile robot could identify a fire situation and support an extinguisher mechanism as a practical approach to reducing direct human exposure to fire hazards.",
        "Gained introductory experience in understanding real-world problems, prototype planning, logical thinking, teamwork, and applying engineering concepts to a practical safety-oriented project."
      ],
      technologies: ["Robotics Concepts", "Fire Detection", "Embedded Systems", "Sensors", "Prototype Planning", "Teamwork"],
      myContribution: "Contributed to conceptual design, prototype planning, logical thinking, and collaborative teamwork to apply introductory engineering principles to a practical safety-oriented robot.",
      github: "https://github.com/vaishnaviparitala",
      liveDemo: null,
      gradient: "from-orange-50 to-rose-50"
    }
  ],

  hackathons: [
    {
      title: "Skill Parivar Hackathon",
      role: "Frontend Participant",
      badge: "Hackathon Participant",
      organization: "Skill Parivar",
      description: "Participated in a hackathon as a frontend contributor, gaining experience in collaborative problem-solving and technology-based solution development.",
      highlights: [
        "Participated in a hackathon as a frontend contributor, gaining experience in collaborative problem-solving and technology-based solution development.",
        "Engaged in frontend development activities and explored the process of translating ideas into user-facing application interfaces.",
        "Strengthened teamwork, adaptability, creative thinking, and the ability to work collaboratively in a time-constrained setting."
      ],
      skills: ["Frontend Development", "Collaborative Problem-Solving", "Rapid Prototyping", "Teamwork", "Adaptability", "Creative Thinking"]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      institution: "KL University, Vijayawada",
      period: "2024 – Present",
      status: "Currently Pursuing (1st/2nd Year)",
      details: "Focusing on core computer science foundations including data structures, object-oriented programming with Python/Java, web development, and artificial intelligence fundamentals.",
      cgpaNote: "Academic record under official university verification (Recorded: 8.78 / 9.02)"
    },
    {
      degree: "Intermediate — MPC (Maths, Physics, Chemistry)",
      field: "Board of Intermediate Education, AP",
      institution: "Priyadarshini Junior College",
      period: "2022 – 2024",
      status: "Completed",
      score: "927 / 1000 (92.7%)",
      details: "Rigorous academic preparation in Mathematics, Physics, and Chemistry fostering strong analytical and mathematical problem-solving capabilities."
    },
    {
      degree: "Secondary School Education (10th Standard)",
      field: "SSC Board of Andhra Pradesh",
      institution: "Sri Chaitanya School",
      period: "2021 – 2022",
      status: "Completed",
      score: "540 / 600 (90.0%)",
      details: "Solid scholastic foundation with distinction across STEM subjects, logical reasoning, and communication."
    }
  ],

  certifications: [
    {
      title: "Full-Stack React with Spring Boot: Foundations",
      issuer: "Professional Certification",
      skills: ["React.js", "Spring Boot", "REST APIs", "Full-Stack Architecture"],
      description: "Covers modern component-driven UI development in React coupled with enterprise Java Spring Boot backend microservices."
    },
    {
      title: "Spring – Ecosystem and Core",
      issuer: "Professional Certification",
      skills: ["Spring Core", "Dependency Injection", "Inversion of Control (IoC)", "Bean Lifecycle"],
      description: "In-depth understanding of the Spring framework ecosystem, core annotations, IoC containers, and modular application development."
    }
  ],

  languages: [
    {
      language: "English",
      proficiency: "Professional Working Proficiency",
      note: "Confident oral and written communication for technical documentation and international collaboration."
    },
    {
      language: "Telugu",
      proficiency: "Native / Mother Tongue",
      note: "Fluent native speaker with natural regional communication capability."
    }
  ],

  avatarConfig: {
    name: "Vaishnavi AI",
    title: "Virtual Portfolio Representative",
    welcomeScript: "Hello! Welcome to Lakshmi Vaishnavi's portfolio. I'm Vaishnavi's AI portfolio assistant. I'm here to help you explore her technical skills, educational journey, projects, and passion for software development. You can ask me about her Student Attendance Management System, Personal Expense Tracker, her Fire Extinguisher Robot project, her Skill Parivar Hackathon experience, or her interest in Artificial Intelligence. So, what would you like to know today?",
    sampleQuestions: [
      "Tell me about Lakshmi Vaishnavi",
      "Explain the Attendance System project",
      "What is the Personal Expense Tracker?",
      "Tell me about the Fire Extinguisher Robot",
      "Tell me about the Skill Parivar Hackathon",
      "Tell me about the AI Career Matching Agent",
      "What programming languages does she know?",
      "What certifications does she hold?",
      "Is she available for internships?",
      "How can I contact Vaishnavi?"
    ]
  }
};
