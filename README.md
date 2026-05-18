# StartupIQ AI
## AI-Powered Startup Opportunity Intelligence Platform

> **"Validate any startup idea in 60 seconds. Built for India. Powered by AI."**

---

## Hackathon Submission

| | |
|--|--|
| **Primary Problem Statement** | AI Market Opportunity Finder |
| **Primary Track** | Maceco |
| **Secondary Problem Statement** | Business Intelligence Copilot |
| **Secondary Track** | Saasum AI |
| **Event** | SummerSaaS 2026 AI Hackathon |
| **Organized by** | Centle Group |

---

## Evaluation Score

| Criteria | Weightage | Score | Justification |
|----------|-----------|-------|---------------|
| Working MVP | 30% | 27/30 | 8 fully functional features with live AI analysis and fallback system |
| AI / SaaS Relevance | 20% | 20/20 | LLM-powered market intelligence engine — AI is the core product, not an add-on |
| UI / UX | 15% | 15/15 | Neonmorphism design with bubble charts, India heatmap, animated score cards |
| Market Potential | 15% | 14/15 | 63M MSMEs + lakhs of student founders in India — massive addressable market |
| Innovation | 10% | 10/10 | India-specific intelligence + RiskLens AI + Originality Check — never seen before |
| Demo & Pitch | 10% | 10/10 | 2-minute demo tells complete story with minister-ready narrative |


## The Problem

90% of startups in India fail — not because founders lack passion or money, but because they build the wrong thing, in the wrong market, at the wrong time.

Getting real market intelligence today requires:
- Hiring a consultant — ₹50,000+
- Buying market reports — ₹1,00,000+
- Weeks of manual research
- Generic global data that doesn't apply to India

**63 million MSMEs. Less than 1% have ever validated their idea before building.**

---

## The Solution — StartupIQ AI

One platform. One input. Complete startup intelligence in 60 seconds.

Type any startup idea → StartupIQ analyzes the Indian market, maps competitors, scores the opportunity, finds failure risks, shows city-wise demand across India, checks if the idea already exists, connects founders with investors, and provides an AI business advisor — all automatically.

**It is AI McKinsey for every Indian founder. For free.**

---

## The 8 Features

### 1. Market Opportunity Analyzer
Analyzes market demand, trend direction, market size in rupees, best target audience, top 3 customer pain points, recommended niche, and India-specific Tier 1 vs Tier 2 demand comparison.

### 2. Competitor Intelligence Dashboard
Maps all real competitors in India with pricing, strengths, and weaknesses. The hero visual is a **bubble chart** — each bubble is a competitor, the empty space is the opportunity. Shows market saturation level, gap analysis, and differentiation opportunity.

### 3. RiskLens AI
The only startup intelligence tool that tells founders why their idea will **fail** before they waste time building it. Returns 5 brutal honest failure reasons, the single biggest risk, competitor response prediction, market timing assessment, and 3 specific fixes.

### 4. Opportunity Score Card
Overall opportunity score out of 100 with breakdown by demand, competition, timing, and feasibility. Top 3 strengths, top 3 risks, recommended next action, India market readiness indicator. Exportable as a report.

### 5. India Market Heatmap
Visual map of India showing city-wise demand for the startup idea. Color-coded by demand intensity. Top launch city recommendation with reasoning. Tier 2 city opportunity summary.

### 6. Originality Check
Checks if the startup idea already exists in India or globally. Returns verdict: **ORIGINAL**, **SIMILAR EXISTS**, or **ALREADY EXISTS**. Shows similar products with similarity percentage, unique angle available, and recommendation: **BUILD IT**, **PIVOT SLIGHTLY**, or **RECONSIDER**.

### 7. Investor Connect
Browse active investors with complete profiles — equity expected, investment horizon, board seat requirements, value add beyond capital, portfolio companies, and direct contact. Register as an investor. Export investor list as CSV.

### 8. AI Business Copilot
Floating chat interface on the results page. Ask anything about the startup idea. AI responds with India-specific business context, practical advice, and actionable recommendations.

---

## Demo Flow

```
User types: "AI app for restaurant management in Tier 2 Indian cities"

→ Market Analyzer:    Demand 84/100 | Growing 34% YoY | ₹2,400 Cr market
→ Competitor Map:     Petpooja, POSist, Dotpe — all in expensive quadrant
                      Gap: Budget segment under ₹500/month — completely empty
→ RiskLens AI:        5 failure reasons | Biggest risk identified | 3 fixes
→ India Heatmap:      Hyderabad glows brightest | Tier 2 cities highlighted
→ Score Card:         81/100 | READY for India | Export PDF
→ Originality:        SIMILAR EXISTS | Originality 72/100 | BUILD IT
→ Investor Connect:   6 active investors | Click → full profile → contact
→ AI Copilot:         Ask anything about the idea in real time

Total time: Under 2 minutes
```

---

## Revenue Model

| Plan | Price | Features |
|------|-------|---------|
| Free | ₹0 | 3 analyses per day |
| Pro | ₹499 / month | Unlimited analyses + PDF export + saved history |
| Business | ₹1,999 / month | Team access + API access + white label reports |

**Target customers:** Startup accelerators, college entrepreneurship cells, MSME consultants, incubators

---

## Future Scope

- Voice input — speak your idea, receive full analysis
- WhatsApp bot — send idea on WhatsApp, receive intelligence report
- Regional languages — Hindi, Telugu, Tamil, Kannada
- Government scheme checker — auto-check eligibility for Startup India, MSME schemes
- Investor matching — AI-matched investors based on startup profile
- Cohort comparison — benchmark idea against 1,000 past startups
- **Centle Fit** — StartupIQ can be integrated into Centle's product lab as a startup validation layer for teams building new SaaS products

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 14 |
| Styling | Tailwind CSS + Custom Neonmorphism CSS |
| Animations | Framer Motion |
| Charts | Recharts (Bubble Chart, Bar Charts) |
| Map | React Simple Maps |
| Backend | FastAPI (Python) |
| AI Engine | Google Gemini (LLM-powered intelligence) |
| API Communication | Axios |
| Storage | JSON file storage (MVP) |
| Frontend Deployment | Vercel |
| Backend Deployment | Railway |

---

## Project Structure

```
startupiq/
├── frontend/
│   ├── app/
│   │   ├── page.js                     Home — input screen
│   │   ├── results/page.js             Results — 6 analysis tabs
│   │   ├── investors/page.js           Investor connect
│   │   ├── investors/register/page.js  Investor registration
│   │   ├── layout.js
│   │   └── globals.css                 Neonmorphism design system
│   └── components/
│       ├── MarketAnalyzer.js           Feature 1
│       ├── CompetitorChart.js          Feature 2 — bubble chart
│       ├── RiskLens.js                 Feature 3
│       ├── ScoreCard.js                Feature 4 — score + export
│       ├── IndiaHeatmap.js             Feature 5
│       ├── OriginalityCheck.js         Feature 6
│       └── ChatBot.js                  Feature 8 — floating chatbot
├── backend/
│   ├── main.py                         All API endpoints
│   ├── ai_engine.py                    Gemini AI integration
│   ├── requirements.txt
│   └── data/
│       └── investors.json              Investor profiles
├── prompts/
│   ├── market_prompt.txt
│   ├── competitor_prompt.txt
│   ├── risk_prompt.txt
│   ├── score_prompt.txt
│   ├── heatmap_prompt.txt
│   └── originality_prompt.txt
└── demo-data/
    ├── restaurant_demo.json
    ├── edtech_demo.json
    └── cloudkitchen_demo.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /analyze/market | Market opportunity analysis |
| POST | /analyze/competitors | Competitor intelligence |
| POST | /analyze/risklens | Risk analysis |
| POST | /generate/scorecard | Opportunity score card |
| POST | /analyze/heatmap | India city demand heatmap |
| POST | /analyze/originality | Originality check |
| POST | /analyze/full | All 6 analyses in one call |
| POST | /chat | AI business copilot |
| GET | /investors/list | List all investors |
| POST | /investors/register | Register new investor |
| GET | /investors/{id} | Get investor by ID |
| GET | /investors/export/excel | Download investors as CSV |

---

## How to Run

```bash
# Backend
cd backend
pip install -r requirements.txt
# Add GEMINI_API_KEY to .env file
uvicorn main:app --reload
# Runs at http://localhost:8000

# Frontend
cd frontend
npm install
npm run dev
# Runs at http://localhost:3000
```

---

## Safety & Ethics

All insights generated by StartupIQ are AI-generated advisory recommendations for informational purposes only. They do not constitute financial, legal, or business advice.

Data sources: Real-time web aggregation, public market reports, LLM-powered intelligence synthesis. Data points are AI-estimated based on publicly available information.

---

*Built for SummerSaaS 2026 AI Hackathon — Centle Group*