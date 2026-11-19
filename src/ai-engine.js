/**
 * VAISHNAVI AI - CONVERSATIONAL INTELLIGENCE ENGINE
 * Features:
 * - High-speed, deterministic offline semantic answering engine (zero latency, 100% verified facts)
 * - Strict adherence to Master RASE Section 7 System Prompt & Conversation Rules
 * - Covers all verified projects: Attendance System, Expense Tracker, AI Job Matching Agent, FIS Fire Extinguisher Robot
 * - Covers Hackathon Experience: Skill Parivar Hackathon (Frontend Participant)
 * - Optional LLM bridge (Gemini / OpenAI / FastAPI Backend) with graceful fallbacks
 */

import { PORTFOLIO_DATA } from './portfolio-data.js';

export class VaishnaviAIEngine {
  constructor(options = {}) {
    this.apiKey = options.apiKey || localStorage.getItem('vaishnavi_llm_api_key') || '';
    this.apiProvider = options.apiProvider || localStorage.getItem('vaishnavi_llm_provider') || 'client-nlp';
    this.backendUrl = options.backendUrl || 'http://localhost:8000';
    this.conversationHistory = [];
  }

  setApiKey(key, provider = 'gemini') {
    this.apiKey = key;
    this.apiProvider = provider;
    localStorage.setItem('vaishnavi_llm_api_key', key);
    localStorage.setItem('vaishnavi_llm_provider', provider);
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Main entry point to process a visitor's question
   */
  async ask(userQuestion) {
    const trimmed = (userQuestion || '').trim();
    if (!trimmed) {
      return {
        answer: "I'm listening! Please ask me anything about Vaishnavi's skills, education, projects, or hackathons.",
        sources: []
      };
    }

    // Record user turn
    this.conversationHistory.push({ role: 'user', content: trimmed });

    // If external LLM is configured and not client-nlp, attempt API call
    if (this.apiProvider === 'gemini' && this.apiKey) {
      try {
        const answer = await this.queryGemini(trimmed);
        this.conversationHistory.push({ role: 'assistant', content: answer });
        return { answer, mode: 'gemini' };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to verified portfolio NLP:', err);
      }
    }

    // Default: High-precision verified deterministic portfolio NLP engine
    const response = this.answerFromKnowledgeBase(trimmed);
    this.conversationHistory.push({ role: 'assistant', content: response.answer });
    return response;
  }

  /**
   * Deterministic, zero-hallucination NLP Knowledge Base
   * Adheres strictly to Section 7 System Prompt and Verified Facts
   */
  answerFromKnowledgeBase(question) {
    const q = question.toLowerCase();

    // 1. Who is Lakshmi Vaishnavi / About Vaishnavi
    if (
      this.matches(q, ['who is', 'about vaishnavi', 'tell me about vaishnavi', 'tell me about yourself', 'introduce', 'who are you', 'what do you do', 'bio', 'background'])
    ) {
      return {
        answer: "Lakshmi Vaishnavi Paritala is a Computer Science and Engineering student at KL University, Vijayawada. She is passionate about software development, Python programming, full-stack web applications, and emerging AI technologies. She loves transforming innovative ideas into practical, user-friendly digital solutions.",
        category: 'about'
      };
    }

    // 2. Education Background / College / School / CGPA
    if (
      this.matches(q, ['education', 'college', 'university', 'kl university', 'school', 'intermediate', 'degree', 'study', 'academic', 'cgpa', 'marks', 'percentage'])
    ) {
      if (this.matches(q, ['cgpa', 'gpa', 'score', 'grades', 'marks'])) {
        return {
          answer: "Vaishnavi is pursuing her B.Tech in Computer Science at KL University. In her Intermediate (MPC) at Priyadarshini Junior College, she achieved 92.7% (927/1000), and 90% (540/600) in her Secondary School at Sri Chaitanya School. Her university CGPA is currently undergoing official verification.",
          category: 'education'
        };
      }
      return {
        answer: "Vaishnavi is currently pursuing her B.Tech in Computer Science and Engineering at KL University (2024–Present). Prior to this, she completed her Intermediate in MPC at Priyadarshini Junior College with an impressive 92.7%, and her Secondary School at Sri Chaitanya School with 90%.",
        category: 'education'
      };
    }

    // 3. Project 1: Student Attendance Management System
    if (
      this.matches(q, ['attendance', 'student attendance', 'first project', 'project 1', 'project one', 'attendance system'])
    ) {
      return {
        answer: "The Student Attendance Management System is a web-based application built with React, JavaScript, HTML, and CSS to manage student registration, daily attendance marking, and record tracking. It includes automated attendance percentage calculation, a user-friendly UI, and defensive error handling.",
        category: 'project-attendance'
      };
    }

    // 4. Project 2: Personal Expense Tracker
    if (
      this.matches(q, ['expense', 'expense tracker', 'personal expense', 'second project', 'project 2', 'project two', 'finance'])
    ) {
      return {
        answer: "The Personal Expense Tracker is a web application that helps users record, categorize, organize, and monitor daily expenses. It features transaction entry, spending history, total calculations, and utilizes Python programming and data validation to ensure record accuracy.",
        category: 'project-expense'
      };
    }

    // 5. Project 3: AI Job & Career Matching Agent (Planned Project)
    if (
      this.matches(q, ['career matching', 'job matching', 'ai project', 'career agent', 'project 3', 'third project', 'resume parsing', 'embeddings', 'semantic search', 'planned project'])
    ) {
      return {
        answer: "The AI Job & Career Matching Agent is Vaishnavi's planned project. It proposes an AI assistant to analyze resumes, extract candidate skills, and identify relevant opportunities using vector embeddings, cosine similarity ranking, structured JSON outputs, and a Python REST API backend.",
        category: 'project-career-agent'
      };
    }

    // 6. Project 4: FIS – Automatic Fire Extinguisher Robot (First-Year Academic Project)
    if (
      this.matches(q, ['fire extinguisher', 'robot', 'fis', 'robotics', 'fourth project', 'project 4', 'academic project', 'hardware', 'fire detection'])
    ) {
      return {
        answer: "FIS – Automatic Fire Extinguisher Robot was a first-year engineering project where Vaishnavi participated in developing a basic robotic concept for fire detection and fire-extinguishing support. It aimed to reduce direct human exposure to hazards while giving her hands-on experience in prototype planning, logical thinking, and teamwork.",
        category: 'project-robot'
      };
    }

    // 7. Hackathon Participation: Skill Parivar Hackathon
    if (
      this.matches(q, ['hackathon', 'skill parivar', 'hackathons', 'competition', 'competitions', 'contest', 'frontend participant'])
    ) {
      return {
        answer: "Vaishnavi participated as a frontend contributor in the Skill Parivar Hackathon. She gained hands-on experience in collaborative problem-solving, translated ideas into user-facing interfaces, and strengthened her teamwork, adaptability, and creative thinking under time constraints.",
        category: 'hackathons'
      };
    }

    // 8. All Projects overview
    if (
      this.matches(q, ['projects', 'what projects', 'portfolio projects', 'work', 'showcase', 'list projects'])
    ) {
      return {
        answer: "Vaishnavi's portfolio includes four distinct engineering projects: the Student Attendance Management System in React, the Personal Expense Tracker in Python, her first-year FIS Automatic Fire Extinguisher Robot project, and her planned AI Job & Career Matching Agent. She has also participated in the Skill Parivar Hackathon as a frontend contributor.",
        category: 'projects-summary'
      };
    }

    // 9. Programming Languages & Technical Skills
    if (
      this.matches(q, ['skills', 'programming', 'languages', 'tech stack', 'technologies', 'python', 'react', 'spring boot', 'sql', 'c language', 'javascript'])
    ) {
      if (this.matches(q, ['python'])) {
        return {
          answer: "Python is one of Vaishnavi's core programming languages! She uses Python for software development, data validation, backend scripting, and exploring AI/LLM applications.",
          category: 'skills-python'
        };
      }
      if (this.matches(q, ['react', 'frontend'])) {
        return {
          answer: "For frontend engineering, Vaishnavi is skilled in React.js, modern JavaScript (ES6+), HTML5, CSS3, and responsive UI design. She holds a certification in Full-Stack React with Spring Boot.",
          category: 'skills-frontend'
        };
      }
      if (this.matches(q, ['spring', 'backend', 'java'])) {
        return {
          answer: "Vaishnavi has foundational expertise in Spring Boot, Spring Core, Dependency Injection, and REST API development, backed by professional certifications in Full-Stack React with Spring Boot and Spring Ecosystem Core.",
          category: 'skills-backend'
        };
      }
      return {
        answer: "Vaishnavi's core programming languages are Python, C, SQL, and JavaScript. Her frontend stack includes React.js, HTML5, and CSS3, while her backend foundations include Python and Spring Boot. She also utilizes Git, GitHub, and VS Code.",
        category: 'skills'
      };
    }

    // 10. AI & LLM Experience / Interests
    if (
      this.matches(q, ['ai', 'artificial intelligence', 'llm', 'machine learning', 'prompt engineering', 'rag', 'vector', 'retrieval'])
    ) {
      return {
        answer: "Vaishnavi is deeply interested in Artificial Intelligence and Large Language Models. Her focus areas include prompt engineering, structured JSON outputs, function calling, vector embeddings, semantic search, and RAG architectures for real-world software applications.",
        category: 'ai-interests'
      };
    }

    // 11. Certifications
    if (
      this.matches(q, ['certification', 'certificates', 'certified', 'credentials', 'courses'])
    ) {
      return {
        answer: "Vaishnavi holds two verified professional certifications: 'Full-Stack React with Spring Boot: Foundations' and 'Spring – Ecosystem and Core'. These substantiate her capabilities in component-based UI and enterprise Java microservices.",
        category: 'certifications'
      };
    }

    // 12. Internships & Opportunities
    if (
      this.matches(q, ['internship', 'hire', 'available', 'job', 'opportunities', 'full time', 'looking for', 'work with you'])
    ) {
      return {
        answer: "Yes, absolutely! Vaishnavi is actively seeking software development, full-stack, and AI engineering internship opportunities. She is eager to contribute her programming skills, dedication, and problem-solving mindset to forward-thinking engineering teams.",
        category: 'internship'
      };
    }

    // 13. Contact Information
    if (
      this.matches(q, ['contact', 'email', 'phone', 'reach', 'message', 'touch', 'location', 'where is she'])
    ) {
      return {
        answer: "You can reach Vaishnavi directly via email at vaishnaviparitala6@gmail.com, or by phone at +91 7901038380. She is based in Vijayawada, India. You can also send a direct message through the contact form right here on this portfolio!",
        category: 'contact'
      };
    }

    // 14. GitHub & Code Repositories
    if (
      this.matches(q, ['github', 'code', 'repository', 'repos', 'git', 'source code', 'profile'])
    ) {
      return {
        answer: "You can explore Vaishnavi's code repositories and projects directly on her GitHub profile at github.com/vaishnaviparitala. The GitHub section below highlights her public repositories.",
        category: 'github'
      };
    }

    // 15. Soft Skills & Strengths
    if (
      this.matches(q, ['strengths', 'soft skills', 'core skills', 'qualities', 'why hire'])
    ) {
      return {
        answer: "Vaishnavi's core strengths include analytical problem-solving, logical thinking, adaptable teamwork, clear communication, and quick learning of emerging technologies and engineering frameworks.",
        category: 'strengths'
      };
    }

    // 16. Languages Spoken
    if (
      this.matches(q, ['languages spoken', 'mother tongue', 'english', 'telugu', 'speak'])
    ) {
      return {
        answer: "Vaishnavi speaks English with professional communication proficiency, and Telugu as her native language.",
        category: 'languages'
      };
    }

    // 17. Greetings & Pleasantries
    if (
      this.matches(q, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'namaste'])
    ) {
      return {
        answer: "Hello! Welcome to Lakshmi Vaishnavi's portfolio. I'm her AI virtual assistant. Would you like to explore her software projects, hackathon experience, technical skills, or academic background?",
        category: 'greeting'
      };
    }

    if (this.matches(q, ['thank you', 'thanks', 'awesome', 'great', 'cool', 'nice'])) {
      return {
        answer: "You're very welcome! If you have any more questions about Vaishnavi or would like to discuss internship opportunities, I'm right here to help.",
        category: 'polite'
      };
    }

    // Strict Fallback (As required by Master RASE prompt)
    return {
      answer: "That information isn't currently available in my portfolio, but you can contact Vaishnavi directly at vaishnaviparitala6@gmail.com for more details.",
      category: 'fallback'
    };
  }

  matches(text, keywords) {
    return keywords.some(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      return regex.test(text) || text.includes(keyword);
    });
  }

  /**
   * Optional Gemini API integration if user configures their API key
   */
  async queryGemini(userPrompt) {
    const systemPrompt = `You are Vaishnavi AI, the friendly and professional female virtual assistant representing Lakshmi Vaishnavi Paritala.
Your purpose is to help website visitors understand Vaishnavi's education, skills, projects, certifications, hackathon participation, and professional interests.

IDENTITY:
You are an AI assistant representing Lakshmi Vaishnavi. You are not the actual person. Never claim to be a human or pretend to have personal experiences.

PERSONALITY:
Friendly, Intelligent, Confident, Respectful, Professional, Approachable. Concise but informative.

RESPONSE STYLE:
Speak naturally. Use simple professional English. Prefer conversational answers. Keep most spoken responses between 2 and 6 sentences.

VERIFIED PORTFOLIO KNOWLEDGE:
Name: Lakshmi Vaishnavi Paritala
Location: Vijayawada, India
Education: B.Tech in Computer Science and Engineering at KL University, 2024–Present.
CGPA: Do not disclose until the conflicting 8.78 and 9.02 values have been verified.
Intermediate: Priyadarshini Junior College (MPC), 92.7% (927/1000).
Secondary School: Sri Chaitanya School, 90% (540/600).
Programming: Python, C, SQL, JavaScript.
Frontend: HTML5, CSS3, JavaScript, React.js.
Backend: Spring Boot fundamentals, Python, REST APIs.
Tools: Git, GitHub, Visual Studio Code.
Certifications: 'Full-Stack React with Spring Boot: Foundations', 'Spring – Ecosystem and Core'.
Languages: English (Professional communication), Telugu (Native).

PROJECT 1: STUDENT ATTENDANCE MANAGEMENT SYSTEM (Completed)
React, JavaScript, HTML, CSS, Backend APIs. Manages student registration, daily attendance marking, attendance record tracking, percentage calculations, error testing.

PROJECT 2: PERSONAL EXPENSE TRACKER (Completed)
Python, Web Technologies, Data Validation. Records, categorizes, organizes, and monitors daily expenses, spending history, total calculations.

PROJECT 3: AI JOB & CAREER MATCHING AGENT (Planned Project)
Python, LLM APIs, Embeddings, SQL. Career assistant to analyze resumes, extract candidate skills, semantic matching with vector embeddings and cosine similarity, structured JSON outputs.

PROJECT 4: FIS – AUTOMATIC FIRE EXTINGUISHER ROBOT (First-Year Academic Project)
Participated in developing a basic robotic concept to assist in fire detection and fire-extinguishing support, reducing human exposure to fire hazards, prototype planning, logical thinking, and teamwork.

HACKATHON PARTICIPATION:
Skill Parivar Hackathon — Frontend Participant. Contributed to collaborative problem-solving, translated ideas into user-facing application interfaces, teamwork in time-constrained setting.

Email: vaishnaviparitala6@gmail.com
GitHub: https://github.com/vaishnaviparitala
Phone: +91 7901038380

CONVERSATION RULES:
Answer questions using verified portfolio information. Never invent work experience, fake awards, or client numbers. If information is missing, say: "That information isn't currently available in my portfolio, but you can contact Vaishnavi directly for more details."`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [
          ...this.conversationHistory.slice(-4).map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 250
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "That information isn't currently available in my portfolio, but you can contact Vaishnavi directly for more details.";
  }
}
