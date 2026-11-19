# Lakshmi Vaishnavi Paritala — AI-Powered Portfolio Website
### Featuring Real-Time Interactive Female AI Avatar ("Vaishnavi AI")

[![KL University](https://img.shields.io/badge/KL%20University-B.Tech%20CSE-F5B6C1?style=for-the-badge)](https://www.kluniversity.in)
[![Python](https://img.shields.io/badge/Python-3.13-5D83F5?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![GitHub](https://img.shields.io/badge/GitHub-vaishnaviparitala-242424?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vaishnaviparitala)

---

## 🌟 Executive Overview
This is the personal portfolio of **Lakshmi Vaishnavi Paritala**, a Computer Science and Engineering undergraduate at **KL University, Vijayawada, India**, aspiring software developer, and AI enthusiast.

The website is engineered with a **photorealistic, interactive female AI virtual assistant ("Vaishnavi AI")** with an authentic **female speaking voice** (Indian English priority). The AI avatar introduces Vaishnavi, presents her academic background, explains her 4 verified engineering projects, discusses her **Skill Parivar Hackathon** experience, breaks down her technical competencies, and converses with recruiters in real time using both **voice** and **text**.

### 🎨 Visual & Architectural Design
Directly inspired by high-end luxury portfolio aesthetics:
- **Color Palette**:
  - Soft Pink: `#F5B6C1`
  - Light Blush: `#FCE7EB` & `#FFF5F7`
  - Crisp White: `#FFFFFF`
  - Charcoal Typography: `#242424`
  - Accent Soft Blue: `#5D83F5`
  - Muted Grey: `#777777`
- **Architectural Arch Layout**: An arched portrait area on the left with an organic rounded bottom, housing the photorealistic avatar with live breathing, blinking, and audio-reactive lip synchronization.
- **Serif & Sans Typography**: Elegant serif headings (*Playfair Display*) paired with clean modern sans-serif body (*Plus Jakarta Sans*).
- **Stat Metric Strip**: Highlighting her university, 4 projects, Skill Parivar Hackathon, Intermediate MPC score (92.7%), and industry certifications.

---

## 🤖 The Female AI Avatar ("Vaishnavi AI")

### 1. Visual & Animation Engine (`src/avatar-animator.js`)
- **Photorealistic Digital Human**: Realistic young adult Indian female portrait in a chic pastel pink tailored blazer with natural skin texture, warm friendly smile, and expressive brown eyes.
- **Natural Micro-Kinematics**:
  - **Breathing**: Continuous sinusoidal vertical scale and chest cadence at ~0.26 Hz.
  - **Organic Blinking**: Randomized blink intervals (every 3–5 seconds) with realistic quadratic eyelid closure and lash feathering.
  - **Posture Sway**: Subtle micro-head stabilization mimicking human presence.
- **Real-Time Lip Synchronization**:
  - Dynamic mouth opening, height modulation, oral cavity shading, and dental line rendering driven directly by spoken audio frequency and syllabic energy.
  - Smooth spring interpolation (60 FPS) ensures movements are natural and organic.

### 2. Female Voice Synthesis & Speech Recognition (`src/voice-engine.js`)
- **Natural Female Voice**: Prioritizes Indian English neural female voices (e.g., `en-IN` Google / Microsoft Heera / Neerja) with automatic fallback to natural female voices.
- **Speech Recognition (STT)**: Direct microphone input with live interim transcript display and automatic processing upon utterance completion.
- **Optional ElevenLabs Neural TTS**: Built-in support for streaming studio-grade Indian female neural voices via Web Audio API.

### 3. Conversational Intelligence & Guardrails (`src/ai-engine.js`)
- **Strict Verification Protocol**: Grounded 100% in verified facts from Vaishnavi's academic resume. Covers all 4 engineering projects and the Skill Parivar Hackathon. Never fabricates past work experience, awards, or false deployment metrics.
- **First-Time Welcome Script**: Speaks the official introduction upon first interaction:
  > *"Hello! Welcome to Lakshmi Vaishnavi's portfolio. I'm Vaishnavi's AI portfolio assistant. I'm here to help you explore her technical skills, educational journey, projects, and passion for software development. You can ask me about her Student Attendance Management System, Personal Expense Tracker, her Fire Extinguisher Robot project, her Skill Parivar Hackathon experience, or her interest in Artificial Intelligence. So, what would you like to know today?"*
- **Missing Information Fallback**:
  > *"That information isn't currently available in my portfolio, but you can contact Vaishnavi directly for more details."*

---

## 📂 Project Structure

```text
vaishnavi-portfolio/
├── index.html                  # Master production-ready web application & UI
├── vaishnavi_avatar.jpg        # Photorealistic studio portrait of Vaishnavi
├── reference_design.jpg        # Visual reference inspiration
├── package.json                # Project manifest and scripts
├── README.md                   # Complete documentation
│
├── src/
│   ├── portfolio-data.js       # Verified facts, 4 projects, hackathons, skills
│   ├── ai-engine.js            # Conversational intelligence & intent classifier
│   ├── voice-engine.js         # Female TTS synthesis, STT microphone recognition
│   └── avatar-animator.js      # Canvas 2.5D facial mesh & lip-sync engine
│
└── backend/
    ├── app.py                  # Python FastAPI service for secure LLM/TTS proxying
    ├── requirements.txt        # FastAPI, Uvicorn, Pydantic, HTTPX
    └── .env.example            # Environment variables template
```

---

## 💼 Featured Engineering Projects

### 1. Student Attendance Management System `[Completed]`
- **Stack**: React, JavaScript, HTML, CSS, Backend APIs
- **Description**: Developed a web-based application to manage student registration, daily attendance marking, and attendance record tracking.
- **Highlights**:
  - Implemented attendance percentage calculations and organized student records for simplified academic management.
  - Designed a user-friendly interface and tested application inputs and logic to identify and resolve common errors.

### 2. Personal Expense Tracker `[Completed]`
- **Stack**: Python, Web Technologies, Data Validation
- **Description**: Built a web-based application to record, categorize, organize, and monitor daily expenses.
- **Highlights**:
  - Implemented expense entry, transaction categorization, spending history, and total expense calculation features.
  - Applied Python programming, data processing, and input validation to improve the accuracy of expense records.

### 3. AI Job & Career Matching Agent `[Planned Project]`
- **Stack**: Python, LLM APIs, Embeddings, SQL
- **Description**: Proposed an AI-powered career assistant to analyze resumes, extract candidate skills, and identify relevant job opportunities.
- **Highlights**:
  - Planned semantic matching using vector embeddings and cosine similarity to compare candidate profiles with job descriptions.
  - Designed a proposed workflow involving structured JSON outputs, AI-generated career insights, and a Python REST API backend.

### 4. FIS – Automatic Fire Extinguisher Robot `[First-Year Academic Project]`
- **Stack**: Robotics Concepts, Fire Detection, Embedded Systems, Sensors, Prototype Planning, Teamwork
- **Description**: Participated in a first-year engineering project focused on developing a basic robotic concept to assist in fire detection and fire-extinguishing applications.
- **Highlights**:
  - Explored how a mobile robot could identify a fire situation and support an extinguisher mechanism as a practical approach to reducing direct human exposure to fire hazards.
  - Gained introductory experience in understanding real-world problems, prototype planning, logical thinking, teamwork, and applying engineering concepts to a practical safety-oriented project.

---

## 🏆 Hackathon Participation

### Skill Parivar Hackathon `[Frontend Participant]`
- **Role**: Frontend Participant & Contributor
- **Highlights**:
  - Participated in a hackathon as a frontend contributor, gaining experience in collaborative problem-solving and technology-based solution development.
  - Engaged in frontend development activities and explored the process of translating ideas into user-facing application interfaces.
  - Strengthened teamwork, adaptability, creative thinking, and the ability to work collaboratively in a time-constrained setting.

---

## 🚀 How to Run the Portfolio

### Option A: Instant Browser Preview (Zero Dependencies)
Run with Python's built-in HTTP server:

```powershell
python -m http.server 3000
```
Open **`http://localhost:3000`** in your browser (**Google Chrome** or **Microsoft Edge** recommended for Web Speech & Microphone support).

---

### Option B: Run with Python FastAPI Backend
```powershell
cd backend
pip install -r requirements.txt
python app.py
```
The backend starts at `http://localhost:8000`.

---

## 🌐 Deployment Instructions

### Deploy to GitHub Pages
1. Push this repository to `https://github.com/vaishnaviparitala/portfolio`.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` / `root` and click **Save**.
4. Your portfolio will be live at `https://vaishnaviparitala.github.io/portfolio`.

---

*Designed with creativity and built with passion by Lakshmi Vaishnavi Paritala.*
