from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sys, os, json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from ai_engine import analyze_market, analyze_competitors, analyze_risks, generate_scorecard, analyze_heatmap, check_originality

app = FastAPI(title="StartupIQ AI Backend", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Data Models ───────────────────────────────────────────────────────────────

class IdeaRequest(BaseModel):
    idea: str

class ScorecardRequest(BaseModel):
    idea: str
    market_score: int
    saturation: str
    trend: str

class InvestorProfile(BaseModel):
    name: str
    firm: str
    email: str
    phone: str
    sectors: str
    ticket_size: str
    stage: str
    bio: str
    linkedin: Optional[str] = ""
    equity_expected: Optional[str] = ""
    investment_horizon: Optional[str] = ""
    board_seat: Optional[str] = ""
    value_add: Optional[str] = ""
    portfolio_companies: Optional[str] = ""
    location: Optional[str] = ""

class ChatRequest(BaseModel):
    message: str
    idea: Optional[str] = ""
    context: Optional[str] = ""

# ─── Helpers ───────────────────────────────────────────────────────────────────

INVESTORS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "investors.json")

def load_investors():
    if os.path.exists(INVESTORS_FILE):
        with open(INVESTORS_FILE, "r") as f:
            return json.load(f)
    return []

def save_investors(investors):
    with open(INVESTORS_FILE, "w") as f:
        json.dump(investors, f, indent=2)

# ─── Health ────────────────────────────────────────────────────────────────────

@app.get("/")
def home():
    return {"message": "StartupIQ AI Backend Running", "version": "3.0.0", "status": "healthy"}

# ─── Analysis Endpoints ────────────────────────────────────────────────────────

@app.post("/analyze/market")
def market_analysis(request: IdeaRequest):
    if not request.idea or len(request.idea) < 5:
        raise HTTPException(status_code=400, detail="Please provide a valid startup idea")
    return analyze_market(request.idea)

@app.post("/analyze/competitors")
def competitor_analysis(request: IdeaRequest):
    if not request.idea or len(request.idea) < 5:
        raise HTTPException(status_code=400, detail="Please provide a valid startup idea")
    return analyze_competitors(request.idea)

@app.post("/analyze/risklens")
def risklens_analysis(request: IdeaRequest):
    if not request.idea or len(request.idea) < 5:
        raise HTTPException(status_code=400, detail="Please provide a valid startup idea")
    return analyze_risks(request.idea)

@app.post("/generate/scorecard")
def scorecard_generation(request: ScorecardRequest):
    return generate_scorecard(request.idea, request.market_score, request.saturation, request.trend)

@app.post("/analyze/heatmap")
def heatmap_analysis(request: IdeaRequest):
    if not request.idea or len(request.idea) < 5:
        raise HTTPException(status_code=400, detail="Please provide a valid startup idea")
    return analyze_heatmap(request.idea)

@app.post("/analyze/originality")
def originality_check(request: IdeaRequest):
    if not request.idea or len(request.idea) < 5:
        raise HTTPException(status_code=400, detail="Please provide a valid startup idea")
    return check_originality(request.idea)

@app.post("/analyze/full")
def full_analysis(request: IdeaRequest):
    idea = request.idea
    market = analyze_market(idea)
    competitors = analyze_competitors(idea)
    risks = analyze_risks(idea)
    scorecard = generate_scorecard(
        idea,
        market.get("market_demand_score", 70),
        competitors.get("saturation_level", "medium"),
        market.get("trend_direction", "growing")
    )
    heatmap = analyze_heatmap(idea)
    originality = check_originality(idea)
    return {"idea": idea, "market": market, "competitors": competitors, "risks": risks, "scorecard": scorecard, "heatmap": heatmap, "originality": originality}

# ─── Investor Endpoints ────────────────────────────────────────────────────────

@app.post("/investors/register")
def register_investor(profile: InvestorProfile):
    investors = load_investors()
    # Check if email already exists
    for inv in investors:
        if inv["email"] == profile.email:
            raise HTTPException(status_code=400, detail="Investor with this email already registered")
    investor_data = profile.dict()
    investor_data["id"] = len(investors) + 1
    investors.append(investor_data)
    save_investors(investors)
    return {"message": "Investor registered successfully", "id": investor_data["id"]}

@app.get("/investors/list")
def list_investors():
    investors = load_investors()
    # Return without sensitive info
    safe_list = []
    for inv in investors:
        safe_list.append({
            "id": inv.get("id"),
            "name": inv.get("name"),
            "firm": inv.get("firm"),
            "sectors": inv.get("sectors"),
            "ticket_size": inv.get("ticket_size"),
            "stage": inv.get("stage"),
            "bio": inv.get("bio"),
            "linkedin": inv.get("linkedin", ""),
            "email": inv.get("email")
        })
    return safe_list

@app.get("/investors/{investor_id}")
def get_investor(investor_id: int):
    investors = load_investors()
    for inv in investors:
        if inv.get("id") == investor_id:
            return inv
    raise HTTPException(status_code=404, detail="Investor not found")

@app.get("/investors/export/excel")
def export_investors_excel():
    import csv, io
    from fastapi.responses import StreamingResponse
    investors = load_investors()
    output = io.StringIO()
    if investors:
        writer = csv.DictWriter(output, fieldnames=investors[0].keys())
        writer.writeheader()
        writer.writerows(investors)
    output.seek(0)
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=startupiq_investors.csv"}
    )

# ─── Chatbot Endpoint ──────────────────────────────────────────────────────────

@app.post("/chat")
def business_chat(request: ChatRequest):
    from ai_engine import call_ai
    system_prompt = f"""You are StartupIQ's AI Business Advisor. You help founders with business questions.
You are friendly, concise, and give practical India-specific advice.
If the user has analyzed a startup idea, use that context to give relevant answers.
Current startup idea being analyzed: {request.idea if request.idea else 'Not specified'}
Keep responses under 150 words. Be direct and actionable."""
    
    result = call_ai(system_prompt, request.message)
    
    # For chat, we don't need JSON - just text
    # So call Gemini directly for text response
    try:
        import google.generativeai as genai
        import os
        from dotenv import load_dotenv
        load_dotenv()
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        chat_model = genai.GenerativeModel("gemini-3-flash-preview")
        full_prompt = f"""You are StartupIQ's AI Business Advisor. You help founders with business questions.
You are friendly, concise, and give practical India-specific advice.
Current startup idea: {request.idea if request.idea else 'Not specified'}
Keep responses under 150 words. Be direct and actionable.

User question: {request.message}"""
        response = chat_model.generate_content(full_prompt)
        return {"reply": response.text.strip()}
    except Exception as e:
        return {"reply": f"I'm here to help with your startup questions! Could you rephrase that? (Error: {str(e)[:50]})"}
