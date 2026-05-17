from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys, os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from ai_engine import analyze_market, analyze_competitors, analyze_risks, generate_scorecard, analyze_heatmap, check_originality

app = FastAPI(title="StartupIQ AI Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaRequest(BaseModel):
    idea: str

class ScorecardRequest(BaseModel):
    idea: str
    market_score: int
    saturation: str
    trend: str

@app.get("/")
def home():
    return {"message": "StartupIQ AI Backend Running", "version": "2.0.0", "status": "healthy", "features": ["market", "competitors", "risklens", "scorecard", "heatmap", "originality"]}

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
    return {
        "idea": idea,
        "market": market,
        "competitors": competitors,
        "risks": risks,
        "scorecard": scorecard,
        "heatmap": heatmap,
        "originality": originality
    }
