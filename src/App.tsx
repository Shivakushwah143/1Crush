
import { useState } from "react";

const sections = [
  {
    id: "overview",
    label: "Overview",
    icon: "ti-layout-dashboard",
  },
  {
    id: "personas",
    label: "User Personas",
    icon: "ti-users",
  },
  {
    id: "agents",
    label: "AI Agents",
    icon: "ti-cpu",
  },
  {
    id: "differentiators",
    label: "Differentiators",
    icon: "ti-star",
  },
  {
    id: "techstack",
    label: "Tech Stack",
    icon: "ti-code",
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: "ti-calendar",
  },
];

const personas = [
  {
    name: "Priya",
    age: 32,
    tag: "Salaried",
    color: "#0F6E56",
    bg: "#E1F5EE",
    location: "Thane, Maharashtra",
    income: "₹35,000/month (fixed)",
    language: "Marathi",
    pain: "Overwhelmed by financial jargon, sold wrong products (ULIPs), misses employer benefits, can't distinguish legitimate advice from WhatsApp tips.",
    need: "A trusted Marathi-speaking advisor for retirement planning and goal-based saving.",
  },
  {
    name: "Rajesh",
    age: 24,
    tag: "Gig Worker",
    color: "#185FA5",
    bg: "#E6F1FB",
    location: "Mumbai, Maharashtra",
    income: "₹15,000–₹40,000/month (variable)",
    language: "Hindi",
    pain: "No emergency fund, no health insurance, falls prey to predatory instant loan apps. Traditional budgeting tools don't work for irregular income.",
    need: "Gig-native cash flow management + real-time scam protection.",
  },
  {
    name: "Kisan",
    age: 45,
    tag: "Farmer",
    color: "#854F0B",
    bg: "#FAEEDA",
    location: "Rural Karnataka",
    income: "Seasonal, weather-dependent",
    language: "Kannada",
    pain: "Informal loans at high interest, unable to access PM-KISAN / crop insurance due to confusing processes, exploited by middlemen.",
    need: "Voice-first Kannada guidance on government schemes, seasonal cash flow planning.",
  },
  {
    name: "Divya",
    age: 28,
    tag: "Accessibility",
    color: "#993556",
    bg: "#FBEAF0",
    location: "Pune, Maharashtra",
    income: "₹25,000/month",
    language: "English/Hindi",
    pain: "Banking apps not screen-reader friendly, relies on family for financial tasks which compromises her independence and privacy.",
    need: "Voice-based interactions, accessible interfaces, guidance without chart dependencies.",
  },
  {
    name: "Students",
    age: "16–22",
    tag: "Prevention",
    color: "#534AB7",
    bg: "#EEEDFE",
    location: "Schools & Colleges, India",
    income: "Pocket money / first salary",
    language: "English / Hinglish",
    pain: "Zero financial education in curriculum. First salary decisions compound for 40 years. Vulnerable to crypto scams, credit card traps, peer pressure spending.",
    need: "Financial life simulation, bite-sized gamified learning, social ArthScore.",
  },
];

const agents = [
  {
    name: "Orchestrator",
    color: "#534AB7",
    bg: "#EEEDFE",
    icon: "ti-adjustments-horizontal",
    role: "Master router and profiler. Detects user's language, income type, literacy level, accessibility needs, and life stage from the first message. Routes to appropriate agents and maintains context across sessions.",
    inputs: ["User message", "Inferred profile", "Channel (WhatsApp/Voice/Web)"],
    outputs: ["Agent selection", "Language config", "Modality config"],
  },
  {
    name: "Educator",
    color: "#0F6E56",
    bg: "#E1F5EE",
    icon: "ti-book",
    role: "Delivers personalized financial lessons across 5 axes: language, literacy level, income context, life stage, and learning style. Uses farming analogies for Kisan, gig-worker examples for Rajesh. Gamified with streaks and micro-quizzes.",
    inputs: ["User profile", "Topic requested", "Prior learning history"],
    outputs: ["Personalized lesson", "Quiz", "Next lesson recommendation"],
  },
  {
    name: "Decision Coach",
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: "ti-brand-speedtest",
    role: "Intervenes at the exact moment of a financial decision. User says 'I'm thinking of taking a loan' — agent immediately provides contextual analysis, alternatives, and a clear recommendation. Not education — live guidance.",
    inputs: ["Decision intent", "User financial profile", "Current context"],
    outputs: ["Decision analysis", "Alternatives", "Action recommendation"],
  },
  {
    name: "Fraud Sentinel",
    color: "#993C1D",
    bg: "#FAECE7",
    icon: "ti-shield-check",
    role: "Two modes: reactive (user forwards suspicious message, agent checks against RBI flagged list and calculates true APR) and proactive pre-bunking (sends inoculation stories before scams reach the user). 3× more effective than debunking after the fact.",
    inputs: ["Suspicious message / URL", "User vulnerability profile", "RBI/SEBI database"],
    outputs: ["Scam verdict", "True cost breakdown", "Safe alternative"],
  },
  {
    name: "Variable Income OS",
    color: "#854F0B",
    bg: "#FAEEDA",
    icon: "ti-arrows-exchange",
    role: "Purpose-built for gig workers and farmers. Tracks earning events, predicts slow periods from history, triggers micro-savings after every delivery batch, aligns insurance premiums to high-earning weeks. First system designed for India's 15 crore gig workers.",
    inputs: ["Earning event", "Income history", "Upcoming obligations"],
    outputs: ["Save-now trigger", "Cash flow forecast", "Insurance timing"],
  },
  {
    name: "Progress Tracker",
    color: "#3B6D11",
    bg: "#EAF3DE",
    icon: "ti-chart-line",
    role: "Tracks real behavioral change — not quiz scores. Did they open a PPF account after the lesson? Did they stop using the flagged app? Generates the ArthScore: a behavioral health metric. Also powers the social leaderboard for community motivation.",
    inputs: ["Behavioral signals", "Self-reported actions", "Financial milestones"],
    outputs: ["ArthScore", "Progress report", "Next nudge"],
  },
];

const differentiators = [
  {
    number: "01",
    title: "Decision-moment intervention",
    tag: "Core",
    color: "#534AB7",
    bg: "#EEEDFE",
    description:
      "Most platforms teach. ArthSaathi intercepts. When Rajesh is about to take a predatory loan, ArthSaathi responds within seconds with the true APR, a safe alternative, and a one-tap action. This is the gap no competitor has filled.",
    impact: "Prevents bad decisions before they happen",
  },
  {
    number: "02",
    title: "NGO multiplier effect",
    tag: "Scale",
    color: "#0F6E56",
    bg: "#E1F5EE",
    description:
      "One NGO educator + ArthSaathi = 200 users reached at zero marginal cost. The NGO portal generates customized lessons in Kannada/Marathi in 2 clicks, runs WhatsApp broadcasts with interactive quizzes, and tracks which members improved their ArthScore over 30 days.",
    impact: "1 educator → 200 users → viral community spread",
  },
  {
    number: "03",
    title: "Scam inoculation engine",
    tag: "Novel",
    color: "#993C1D",
    bg: "#FAECE7",
    description:
      "Pre-bunking: sends personalized scam vulnerability stories BEFORE scams arrive. Research shows pre-bunking is 3× more effective than debunking. Rajesh gets a story about a delivery worker who almost fell for an instant loan app — before the loan app WhatsApp message arrives.",
    impact: "Behavioral science-backed, proactive protection",
  },
  {
    number: "04",
    title: "Irregular income OS",
    tag: "Novel",
    color: "#185FA5",
    bg: "#E6F1FB",
    description:
      "Every financial tool assumes monthly salary. ArthSaathi is the first system designed for India's 15 crore gig workers. Micro-savings triggered after every earning event. Emergency fund built in ₹200–₹500 increments. Insurance timed to high-earning weeks.",
    impact: "Addresses a completely underserved market category",
  },
  {
    number: "05",
    title: "ArthScore — behavioral metric",
    tag: "Measurement",
    color: "#3B6D11",
    bg: "#EAF3DE",
    description:
      "Judges will ask: how do you know it works? ArthScore measures real behavioral change — PPF accounts opened, flagged apps stopped, emergency fund built. Not quiz completion rates. Priya's ArthScore goes 43→67 over 3 months. That's the story Nomura wants.",
    impact: "Answers the hardest judge question: does it work?",
  },
  {
    number: "06",
    title: "Financial life simulator",
    tag: "Students",
    color: "#993556",
    bg: "#FBEAF0",
    description:
      "College students get a virtual financial life: starting salary ₹25k, rent, EMI trap, a crypto 'friend tip', a job loss in month 4. They make decisions in a 10-minute sandbox and see the 10-year projection of those exact choices. Designed to be shared — viral by design.",
    impact: "Viral college distribution + immunity before crisis",
  },
  {
    number: "07",
    title: "Life event trigger engine",
    tag: "Engagement",
    color: "#854F0B",
    bg: "#FAEEDA",
    description:
      "Detects life events in conversation and proactively pushes guidance. 'Beti ka admission hua' → education loan comparison + Sukanya Samriddhi guide. 'Fasal barbaad ho gayi' → PM Fasal Bima claim process. 'Pehli salary aayi' → 50/30/20 rule + first SIP setup in 3 taps.",
    impact: "Turns ArthSaathi into a life companion, not a tool",
  },
  {
    number: "08",
    title: "Trusted messenger network",
    tag: "Last Mile",
    color: "#534AB7",
    bg: "#EEEDFE",
    description:
      "Kisan won't trust a bot. But he trusts his Kisan Mitra. SHG leaders, ASHA workers, and Kisan Mitra agents use ArthSaathi as their back-end intelligence. The AI never appears — only the trusted human does. This is how you reach the last mile.",
    impact: "Solves the trust barrier for rural + low-literacy users",
  },
];

const techStack = [
  {
    category: "Frontend",
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: "ti-device-laptop",
    items: [
      { name: "React", version: "18.2.0", use: "Web app UI", free: true },
      { name: "Vite", version: "5.2.0", use: "Build tool", free: true },
      { name: "Tailwind CSS", version: "3.4.1", use: "Styling", free: true },
      { name: "shadcn/ui", version: "0.8.0", use: "Component library", free: true },
      { name: "React Router", version: "6.22.0", use: "Routing", free: true },
    ],
  },
  {
    category: "Backend",
    color: "#0F6E56",
    bg: "#E1F5EE",
    icon: "ti-server",
    items: [
      { name: "Node.js", version: "20.11.0 LTS", use: "Runtime", free: true },
      { name: "Express", version: "4.18.3", use: "API server", free: true },
      { name: "MongoDB", version: "7.0.0", use: "Primary database", free: true },
      { name: "Mongoose", version: "8.2.0", use: "ODM", free: true },
      { name: "Redis", version: "7.2.0", use: "Session + cache", free: true },
    ],
  },
  {
    category: "AI / Agents",
    color: "#534AB7",
    bg: "#EEEDFE",
    icon: "ti-brain",
    items: [
      { name: "LangGraph", version: "0.1.19", use: "Multi-agent orchestration", free: true },
      { name: "GPT-4o", version: "2024-05-13", use: "Decision coach + educator", free: false, note: "Free tier + credits" },
      { name: "Claude Sonnet", version: "claude-sonnet-4-20250514", use: "Safety + evaluation layer", free: false, note: "Free tier" },
      { name: "LangChain", version: "0.1.20", use: "Agent tooling + memory", free: true },
      { name: "Chroma DB", version: "0.4.24", use: "Vector store for RAG", free: true },
    ],
  },
  {
    category: "Voice & NLP",
    color: "#993C1D",
    bg: "#FAECE7",
    icon: "ti-microphone",
    items: [
      { name: "Whisper API", version: "openai-whisper-1", use: "Speech to text (STT)", free: false, note: "Free tier" },
      { name: "ElevenLabs", version: "v2 API", use: "Text to speech (TTS)", free: false, note: "Free tier" },
      { name: "IndicTrans2", version: "1.0.0", use: "Hindi/Kannada/Marathi translation", free: true },
      { name: "IndicNLP", version: "0.92", use: "Indian language processing", free: true },
    ],
  },
  {
    category: "Integrations",
    color: "#3B6D11",
    bg: "#EAF3DE",
    icon: "ti-plug",
    items: [
      { name: "WhatsApp Business API", version: "Meta Cloud v18.0", use: "Primary channel", free: false, note: "Free tier" },
      { name: "Twilio", version: "4.19.0", use: "SMS fallback / IVR", free: false, note: "Free credits" },
      { name: "DigiLocker API", version: "v2.0", use: "Document verification", free: true },
      { name: "RBI Open API", version: "v1.0", use: "Flagged NBFC / scam list", free: true },
    ],
  },
  {
    category: "Infrastructure",
    color: "#854F0B",
    bg: "#FAEEDA",
    icon: "ti-cloud",
    items: [
      { name: "Docker", version: "24.0.7", use: "Containerization", free: true },
      { name: "Python", version: "3.11.7", use: "ML scripts + data processing", free: true },
      { name: "FastAPI", version: "0.110.0", use: "ML microservices", free: true },
      { name: "Nginx", version: "1.25.3", use: "Reverse proxy", free: true },
    ],
  },
];

const timeline = [
  {
    date: "June 4",
    label: "Launch",
    status: "done",
    detail: "Competition launched. Register at nomura.com/india/careers",
  },
  {
    date: "June 11",
    label: "Executive Summary due",
    status: "urgent",
    detail: "5:00 PM deadline. 2 pages max. Send to kakushin@nomura.com. Include full tech stack with exact version numbers.",
  },
  {
    date: "June 19",
    label: "Shortlist announced",
    status: "upcoming",
    detail: "Teams advancing to Round 2 will be notified.",
  },
  {
    date: "June 22–24",
    label: "Round 2 Presentations",
    status: "upcoming",
    detail: "15 min presentation + 5 min Q&A. Need UI mockups, data models, architecture diagrams.",
  },
  {
    date: "June 25",
    label: "Finalists announced",
    status: "upcoming",
    detail: "Teams selected for Grand Finale notified.",
  },
  {
    date: "July 3",
    label: "Grand Finale — Day 1",
    status: "upcoming",
    detail: "Full day coding at Nomura Services India office.",
  },
  {
    date: "July 4",
    label: "Grand Finale — Day 2",
    status: "upcoming",
    detail: "Present final solution to Nomura's senior technology professionals. Felicitation ceremony.",
  },
];

export default function ArthSaathiDoc() {
  const [active, setActive] = useState("overview");
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [expandedDiff, setExpandedDiff] = useState(null);

  return (
    <div className="font-serif bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-7 pt-5 pb-0">
        <div className="mb-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
              ArthSaathi
            </span>
            <span className="text-xs text-gray-500 font-sans bg-gray-100 border border-gray-200 rounded px-2 py-0.5">
              Nomura KakushIN 10.0 — Team Brief
            </span>
          </div>
          <p className="font-sans text-xs text-gray-500 mt-1">
            Financial Literacy &amp; Agentic AI · 2027 Batch · Deadline June 11, 2026
          </p>
        </div>
        {/* Nav */}
        <div className="flex gap-0.5 overflow-x-auto">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`font-sans text-xs px-3.5 py-2 border-b-2 whitespace-nowrap transition-colors ${
                active === s.id
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className={`ti ${s.icon} text-sm mr-1.5 align-middle inline-block`} aria-hidden="true" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 max-w-4xl mx-auto">
        {/* Overview Section */}
        {active === "overview" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="font-sans text-[11px] tracking-wide text-gray-500 uppercase mb-2">
                The Problem
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                India has financial access. It doesn't have financial understanding.
              </h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                UPI transactions break records daily. Stock market participation is at an all-time high. Yet millions still struggle with basic concepts — credit scores, retirement planning, predatory lending. The gap between financial access and financial understanding has never been wider. Most solutions teach. Nobody intervenes.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="font-sans text-[11px] tracking-wide text-gray-500 uppercase mb-2">
                Our Solution
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                ArthSaathi — Your Financial Guardian Network
              </h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                A 6-agent agentic AI system that intercepts bad financial decisions at the exact moment they happen, builds financial immunity in students before the crisis hits, and scales through India's existing NGO networks so one educator reaches 200 people.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Target users", value: "5 persona segments" },
                  { label: "AI agents", value: "6 specialized" },
                  { label: "Primary channel", value: "WhatsApp + Voice" },
                  { label: "Success metric", value: "ArthScore (behavioral)" },
                ].map(m => (
                  <div key={m.label} className="bg-gray-50 rounded-lg p-3">
                    <div className="font-sans text-xs text-gray-500 mb-1">{m.label}</div>
                    <div className="font-sans text-sm font-medium text-gray-900">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="font-sans text-[11px] tracking-wide text-gray-500 uppercase mb-3">
                Pitch in 3 sentences
              </div>
              <blockquote className="m-0 p-4 border-l-[3px] border-gray-400 italic text-sm text-gray-800 leading-relaxed bg-gray-50 rounded-r-lg">
                ArthSaathi is a 6-agent financial guardian system that intervenes at the exact moment of a bad financial decision — not just after. It builds financial immunity in students through life simulation, protects gig workers from predatory lending in real time, and scales through India's existing NGO networks so one educator reaches 200 people. Success is measured not by lessons completed but by the ArthScore — a behavioral health metric that tracks whether people actually change what they do with money.
              </blockquote>
            </div>
          </div>
        )}

        {/* Personas Section */}
        {active === "personas" && (
          <div className="space-y-4">
            {personas.map(p => (
              <div key={p.name} className="bg-white border border-gray-200 rounded-xl p-5 grid grid-cols-[auto,1fr] gap-5">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-13 h-13 rounded-full border-2 flex items-center justify-center font-sans text-lg font-bold"
                    style={{ background: p.bg, borderColor: `${p.color}30`, color: p.color }}
                  >
                    {p.name[0]}
                  </div>
                  <span
                    className="font-sans text-[11px] py-0.5 px-2 rounded-full font-medium"
                    style={{ background: p.bg, color: p.color }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-sans text-base font-semibold text-gray-900">{p.name}</span>
                    <span className="font-sans text-xs text-gray-500">
                      Age {p.age} · {p.location}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                    {[["Income", p.income], ["Language", p.language]].map(([k, v]) => (
                      <div key={k}>
                        <span className="font-sans text-[11px] text-gray-500">{k}: </span>
                        <span className="font-sans text-xs text-gray-800 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mb-2">
                    <div className="font-sans text-[11px] text-gray-500 mb-0.5">PAIN POINT</div>
                    <p className="font-sans text-xs text-gray-800 leading-relaxed">{p.pain}</p>
                  </div>
                  <div
                    className="p-2.5 rounded-lg border-l-[3px]"
                    style={{ background: p.bg, borderLeftColor: p.color }}
                  >
                    <div className="font-sans text-[11px] mb-0.5" style={{ color: p.color }}>
                      WHAT THEY NEED
                    </div>
                    <p className="font-sans text-xs text-gray-800 leading-relaxed">{p.need}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Agents Section */}
        {active === "agents" && (
          <div className="space-y-3">
            <p className="font-sans text-xs text-gray-500 mb-2">
              Click any agent to expand details. All agents share a common memory store and are coordinated by the Orchestrator.
            </p>
            {agents.map((a, i) => (
              <div
                key={a.name}
                className="bg-white border rounded-xl overflow-hidden transition-colors"
                style={{
                  borderColor: expandedAgent === i ? `${a.color}60` : "var(--color-border-tertiary, #e5e7eb)",
                  borderWidth: expandedAgent === i ? "1.5px" : "0.5px",
                }}
              >
                <div
                  onClick={() => setExpandedAgent(expandedAgent === i ? null : i)}
                  className="p-4 flex items-center gap-3.5 cursor-pointer"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg }}
                  >
                    <i className={`ti ${a.icon} text-lg`} style={{ color: a.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="font-sans text-sm font-semibold text-gray-900">
                      Agent {i + 1}: {a.name}
                    </div>
                    <div className="font-sans text-xs text-gray-500 mt-0.5">
                      {a.role.split(".")[0]}.
                    </div>
                  </div>
                  <i
                    className={`ti ${expandedAgent === i ? "ti-chevron-up" : "ti-chevron-down"} text-gray-500 text-base`}
                    aria-hidden="true"
                  />
                </div>
                {expandedAgent === i && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <p className="font-sans text-xs text-gray-700 leading-relaxed mb-4">{a.role}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="font-sans text-[11px] tracking-wide text-gray-500 mb-1.5">
                          INPUTS
                        </div>
                        {a.inputs.map(inp => (
                          <div key={inp} className="font-sans text-xs text-gray-700 py-0.5 flex items-center gap-1.5">
                            <i className="ti ti-arrow-right text-xs" style={{ color: a.color }} aria-hidden="true" /> {inp}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="font-sans text-[11px] tracking-wide text-gray-500 mb-1.5">
                          OUTPUTS
                        </div>
                        {a.outputs.map(out => (
                          <div key={out} className="font-sans text-xs text-gray-700 py-0.5 flex items-center gap-1.5">
                            <i className="ti ti-check text-xs" style={{ color: a.color }} aria-hidden="true" /> {out}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Responsible AI note */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex gap-3 items-start">
              <i className="ti ti-shield text-red-600 text-lg flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-sans text-xs font-semibold text-red-700 mb-1">
                  Responsible AI Layer (across all agents)
                </div>
                <p className="font-sans text-[11px] text-red-800 leading-relaxed">
                  No investment advice · SEBI/RBI compliance guardrails · Hallucination detection on financial data · Human escalation triggers · Data minimization (no raw financial data stored) · Transparent AI limitations disclosure · Consent-based behavioral tracking
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Differentiators Section */}
        {active === "differentiators" && (
          <div className="space-y-3">
            <p className="font-sans text-xs text-gray-500 mb-2">
              8 differentiators that separate ArthSaathi from every other team's submission. Click to expand.
            </p>
            {differentiators.map((d, i) => (
              <div
                key={d.number}
                className="bg-white border rounded-xl overflow-hidden"
                style={{
                  borderColor: expandedDiff === i ? `${d.color}50` : "var(--color-border-tertiary, #e5e7eb)",
                  borderWidth: expandedDiff === i ? "1.5px" : "0.5px",
                }}
              >
                <div
                  onClick={() => setExpandedDiff(expandedDiff === i ? null : i)}
                  className="p-4 flex items-center gap-3.5 cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center font-sans text-[11px] font-bold flex-shrink-0"
                    style={{ background: d.bg, color: d.color }}
                  >
                    {d.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-semibold text-gray-900">{d.title}</span>
                      <span
                        className="font-sans text-[11px] py-0.5 px-2 rounded-full"
                        style={{ background: d.bg, color: d.color }}
                      >
                        {d.tag}
                      </span>
                    </div>
                    <div className="font-sans text-xs text-gray-500 mt-0.5">{d.impact}</div>
                  </div>
                  <i
                    className={`ti ${expandedDiff === i ? "ti-chevron-up" : "ti-chevron-down"} text-gray-500 text-base`}
                    aria-hidden="true"
                  />
                </div>
                {expandedDiff === i && (
                  <div className="border-t border-gray-200 p-4">
                    <p className="font-sans text-xs text-gray-700 leading-relaxed">{d.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Section with Free Resources Highlight */}
        {active === "techstack" && (
          <div>
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-4 flex gap-2.5 items-start">
              <i className="ti ti-alert-triangle text-amber-700 text-base flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-sans text-xs text-amber-800 m-0">
                Critical: The executive summary must list ALL tools with EXACT version numbers. Nomura sets up your environment in advance. Missing or wrong versions = disqualification on Grand Finale day.
              </p>
            </div>

            {/* Free Resources Summary Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <i className="ti ti-discount text-emerald-700 text-base" aria-hidden="true" />
                <h3 className="font-sans text-sm font-semibold text-emerald-800">💰 100% Free & Open Source Resources</h3>
              </div>
              <p className="font-sans text-xs text-emerald-700 mb-3">
                ArthSaathi is built entirely on free tiers, open-source software, and freely available APIs. No paid licenses required for pilot or scale-up.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React", "Node.js", "MongoDB", "LangGraph", "Whisper (free tier)",
                  "ElevenLabs (free tier)", "WhatsApp API (free tier)", "IndicTrans2",
                  "Docker", "Tailwind CSS", "Chroma DB", "FastAPI"
                ].map(res => (
                  <span key={res} className="bg-white text-emerald-700 text-[11px] font-medium px-2 py-1 rounded-full border border-emerald-200">
                    {res}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {techStack.map(cat => (
                <div key={cat.category} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div
                    className="px-5 py-3 flex items-center gap-2.5 border-b border-gray-200"
                    style={{ background: cat.bg }}
                  >
                    <i className={`ti ${cat.icon} text-base`} style={{ color: cat.color }} aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold" style={{ color: cat.color }}>
                      {cat.category}
                    </span>
                  </div>
                  <div>
                    {cat.items.map((item, idx) => (
                      <div
                        key={item.name}
                        className="px-5 py-2.5 grid grid-cols-[180px,1fr,auto,auto] gap-3 items-center border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-mono text-xs text-gray-800 font-medium">{item.name}</span>
                        <span className="font-sans text-xs text-gray-500">{item.use}</span>
                        <span className="font-mono text-[11px] bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-gray-600 whitespace-nowrap">
                          {item.version}
                        </span>
                        {item.free !== undefined && (
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                              item.free ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.free ? "Free" : "Free Tier"}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Section */}
        {active === "timeline" && (
          <div>
            <div className="relative pl-7">
              <div className="absolute left-2.5 top-6 bottom-6 w-px bg-gray-200" />
              {timeline.map((t, i) => (
                <div key={t.date} className={`relative ${i < timeline.length - 1 ? "mb-5" : ""}`}>
                  <div
                    className="absolute -left-[1.375rem] top-3.5 w-3 h-3 rounded-full"
                    style={{
                      background: t.status === "done" ? "#3B6D11" : t.status === "urgent" ? "#A32D2D" : "white",
                      border: t.status === "upcoming" ? "1.5px solid #9ca3af" : "none",
                    }}
                  />
                  <div
                    className={`bg-white border rounded-lg p-3.5 ${
                      t.status === "urgent" ? "border-red-300" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <span
                        className={`font-sans text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          t.status === "done"
                            ? "bg-green-100 text-green-700"
                            : t.status === "urgent"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t.date}
                      </span>
                      <span className="font-sans text-sm font-semibold text-gray-900">{t.label}</span>
                      {t.status === "urgent" && (
                        <span className="font-sans text-[11px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
              <div className="font-sans text-xs font-semibold text-gray-900 mb-3">Executive Summary checklist</div>
              {[
                "About us — 2–3 sentences per team member",
                "Problem understanding — use Rajesh's loan story as the hook",
                "Proposed solution — ArthSaathi, 6-agent system",
                "Key differentiators — decision-moment intervention, ArthScore, NGO multiplier",
                "All tools + exact version numbers (copy from Tech Stack tab)",
                "File named: [College]_[TeamName]_[FirstNames]_Executive Summary",
                "Email to kakushin@nomura.com by June 11, 5:00 PM",
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 py-1.5 ${
                    i < 6 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <i className="ti ti-circle-check text-green-600 text-base flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-sans text-xs text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}