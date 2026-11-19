"""
VAISHNAVI AI - SECURE BACKEND SERVICE (FastAPI)
Provides secure server-side LLM conversational intelligence and ElevenLabs TTS proxy.
Keeps API credentials protected outside the browser.
"""

import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Load optional .env if python-dotenv installed
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = FastAPI(
    title="Vaishnavi AI Avatar Backend",
    version="1.0.0",
    description="Conversational intelligence and secure voice proxy for Lakshmi Vaishnavi's portfolio"
)

# Enable CORS for local and hosted frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")

SYSTEM_PROMPT = """You are Vaishnavi AI, the friendly and professional female virtual assistant representing Lakshmi Vaishnavi Paritala.
Your purpose is to help website visitors understand Vaishnavi's education, skills, projects, certifications, hackathons, and professional interests.

IDENTITY:
You are an AI assistant representing Lakshmi Vaishnavi. You are not the actual person. Never claim to be a human or pretend to have personal experiences.

PERSONALITY:
Friendly. Intelligent. Confident. Respectful. Professional. Approachable. Concise but informative.

RESPONSE STYLE:
Speak naturally. Use simple professional English. Prefer conversational answers. Explain technical concepts clearly. Keep most spoken responses between 2 and 6 sentences.

VERIFIED PORTFOLIO KNOWLEDGE:
Name: Lakshmi Vaishnavi Paritala
Location: Vijayawada, India
Education: B.Tech in Computer Science and Engineering at KL University, 2024–Present.
CGPA: Do not disclose until the conflicting 8.78 and 9.02 values have been verified.
Intermediate: Priyadarshini Junior College (MPC), 92.7% (927/1000).
Secondary School: Sri Chaitanya School, 90% (540/600).
Programming: Python, C, SQL, JavaScript.
Frontend: HTML5, CSS3, JavaScript, React.js, Web Design.
Backend: Spring Boot fundamentals, Python, REST APIs.
Tools: Git, GitHub, Visual Studio Code.
Core strengths: Problem-solving, logical thinking, teamwork, communication, adaptability, quick learning.
Certifications: 'Full-Stack React with Spring Boot: Foundations', 'Spring – Ecosystem and Core'.
Languages: English (Professional communication), Telugu (Native).

PROJECT 1: STUDENT ATTENDANCE MANAGEMENT SYSTEM (Status: Completed)
Technologies: React, JavaScript, HTML, CSS, Backend APIs. Web application to manage student registration, daily attendance marking, attendance record tracking, percentage calculations, error testing.

PROJECT 2: PERSONAL EXPENSE TRACKER (Status: Completed)
Technologies: Python, Web Technologies, Data Validation. Web application to record, categorize, organize, and monitor daily expenses, spending history, total calculations.

PROJECT 3: AI JOB & CAREER MATCHING AGENT (Status: Planned Project)
Technologies: Python, LLM APIs, Embeddings, SQL. Career assistant to analyze resumes, extract candidate skills, semantic matching with vector embeddings and cosine similarity, structured JSON outputs.

PROJECT 4: FIS – AUTOMATIC FIRE EXTINGUISHER ROBOT (Status: First-Year Academic Project)
Technologies: Robotics Concepts, Fire Detection, Embedded Systems, Sensors, Prototype Planning, Teamwork. Participated in developing a basic robotic concept to assist in fire detection and fire-extinguishing support, reducing human exposure to fire hazards.

HACKATHON PARTICIPATION:
Skill Parivar Hackathon — Frontend Participant. Participated as frontend contributor in collaborative problem-solving, translated ideas into user-facing application interfaces, teamwork in time-constrained setting.

CONTACT:
Email: vaishnaviparitala6@gmail.com
Phone: +91 7901038380
GitHub: https://github.com/vaishnaviparitala

CONVERSATION RULES:
Answer questions using verified portfolio information. Never invent work experience, fake awards, fake client numbers, or fake links.
If asked about unavailable information, say: "That information isn't currently available in the portfolio, but you can contact Vaishnavi directly for more details."
"""

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []
    api_key: Optional[str] = None

class TTSRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "portfolio_owner": "Lakshmi Vaishnavi Paritala",
        "has_gemini_key": bool(GEMINI_API_KEY),
        "has_elevenlabs_key": bool(ELEVENLABS_API_KEY)
    }

@app.post("/api/chat")
async def chat(req: ChatRequest):
    api_key = req.api_key or GEMINI_API_KEY

    # If Gemini API key is available, call Gemini
    if api_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            
            contents = []
            for m in (req.history or [])[-4:]:
                contents.append({
                    "role": "model" if m.role == "assistant" else "user",
                    "parts": [{"text": m.content}]
                })
            contents.append({"role": "user", "parts": [{"text": req.message}]})

            payload = {
                "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
                "contents": contents,
                "generationConfig": {"temperature": 0.3, "maxOutputTokens": 280}
            }

            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    ans = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text")
                    if ans:
                        return {"answer": ans.strip(), "engine": "gemini"}
        except Exception as e:
            print("Gemini API call failed:", e)

    # Deterministic fallback response if external API is not configured
    q = req.message.lower()
    if any(k in q for k in ["who is", "about", "introduce", "vaishnavi", "yourself"]):
        return {
            "answer": "Lakshmi Vaishnavi Paritala is a Computer Science and Engineering student at KL University, Vijayawada. She is passionate about software development, Python programming, full-stack web applications, and emerging AI technologies.",
            "engine": "verified-nlp"
        }
    elif any(k in q for k in ["attendance", "student attendance"]):
        return {
            "answer": "Her Student Attendance Management System is a web-based application built with React, JavaScript, HTML, CSS, and Backend APIs to manage student registration, daily attendance marking, and percentage calculation.",
            "engine": "verified-nlp"
        }
    elif any(k in q for k in ["expense", "tracker"]):
        return {
            "answer": "The Personal Expense Tracker is a web application that helps users record, categorize, organize, and monitor daily expenses using Python data processing, spending history logging, and input validation.",
            "engine": "verified-nlp"
        }
    elif any(k in q for k in ["career", "job", "matching", "agent"]):
        return {
            "answer": "The AI Job & Career Matching Agent is Vaishnavi's planned project focusing on semantic search, cosine similarity ranking, resume parsing, and LLM-driven skill extraction with Python, LLM APIs, Embeddings, and SQL.",
            "engine": "verified-nlp"
        }
    elif any(k in q for k in ["fire", "robot", "fis", "extinguisher"]):
        return {
            "answer": "FIS – Automatic Fire Extinguisher Robot was Vaishnavi's first-year engineering academic project where she participated in developing a basic robotic concept to assist in fire detection and fire-extinguishing support, reducing human hazard exposure.",
            "engine": "verified-nlp"
        }
    elif any(k in q for k in ["hackathon", "skill parivar"]):
        return {
            "answer": "Vaishnavi was a frontend participant in the Skill Parivar Hackathon, gaining experience in collaborative problem-solving, translating ideas into user-facing interfaces, and agile teamwork under time constraints.",
            "engine": "verified-nlp"
        }
    elif any(k in q for k in ["contact", "email", "phone"]):
        return {
            "answer": "You can reach Vaishnavi at vaishnaviparitala6@gmail.com, or +91 7901038380. Her GitHub is github.com/vaishnaviparitala.",
            "engine": "verified-nlp"
        }
    
    return {
        "answer": "That information isn't currently available in my portfolio, but you can contact Vaishnavi directly at vaishnaviparitala6@gmail.com for more details.",
        "engine": "verified-nlp"
    }

@app.post("/api/tts")
async def text_to_speech(req: TTSRequest):
    if not ELEVENLABS_API_KEY:
        raise HTTPException(status_code=400, detail="ElevenLabs API key not configured on backend")
    
    voice_id = req.voice_id or ELEVENLABS_VOICE_ID
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    headers = {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }
    payload = {
        "text": req.text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {"stability": 0.65, "similarity_boost": 0.8}
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        res = await client.post(url, json=payload, headers=headers)
        if res.status_code != 200:
            raise HTTPException(status_code=res.status_code, detail="ElevenLabs error")
        return {"audio_base64": res.content.hex()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
