import os, json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-3-flash-preview")

def load_prompt(filename):
    paths = [
        f"prompts/{filename}",
        f"../prompts/{filename}",
        os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "prompts", filename)
    ]
    for path in paths:
        if os.path.exists(path):
            with open(path, "r") as f:
                return f.read()
    raise FileNotFoundError(f"Prompt file {filename} not found")

def call_ai(system_prompt, user_message):
    try:
        full_prompt = f"{system_prompt}\n\nStartup idea: {user_message}\n\nReturn ONLY valid JSON. No explanation. No markdown. No code blocks. Just raw JSON."
        response = model.generate_content(full_prompt)
        content = response.text.strip()
        content = content.replace("```json", "").replace("```", "").strip()
        return json.loads(content)
    except Exception as e:
        print(f"AI call failed: {e}")
        return None

def analyze_market(idea: str):
    result = call_ai(load_prompt("market_prompt.txt"), idea)
    if result:
        return result
    print(f"WARNING: AI failed for market analysis of: {idea}")
    return {"market_demand_score": 75, "trend_direction": "growing", "trend_percentage": 25, "market_size_inr": "Analyzing...", "best_target_audience": "Analysis unavailable - please retry", "top_3_pain_points": ["Retry for accurate results"], "recommended_niche": "Retry for accurate results", "india_specific_insight": "Retry for accurate results", "tier1_demand": "medium", "tier2_demand": "medium"}

def analyze_competitors(idea: str):
    result = call_ai(load_prompt("competitor_prompt.txt"), idea)
    if result:
        return result
    print(f"WARNING: AI failed for competitor analysis of: {idea}")
    return {"competitors": [{"name": "Analysis failed - retry", "pricing": "N/A", "target_customer": "N/A", "strength": "N/A", "weakness": "N/A"}], "saturation_level": "medium", "saturation_explanation": "Retry for accurate results", "market_gap": "Retry for accurate results", "differentiation_opportunity": "Retry for accurate results"}

def analyze_risks(idea: str):
    result = call_ai(load_prompt("risk_prompt.txt"), idea)
    if result:
        return result
    print(f"WARNING: AI failed for risk analysis of: {idea}")
    return {"top_5_failure_reasons": ["Retry for accurate results"], "biggest_risk": "Retry for accurate results", "competitor_response": "Retry for accurate results", "market_timing": "Retry for accurate results", "three_things_to_fix": ["Retry for accurate results"]}

def generate_scorecard(idea: str, market_score: int, saturation: str, trend: str):
    msg = f"{idea}. Market demand score: {market_score}. Saturation: {saturation}. Trend: {trend}"
    result = call_ai(load_prompt("score_prompt.txt"), msg)
    if result:
        return result
    print(f"WARNING: AI failed for scorecard of: {idea}")
    return {"overall_score": market_score, "score_breakdown": {"demand": 20, "competition": 18, "timing": 20, "feasibility": 17}, "top_3_strengths": ["Retry for accurate results"], "top_3_risks": ["Retry for accurate results"], "recommended_next_action": "Retry for accurate results", "india_market_readiness": "emerging"}

def analyze_heatmap(idea: str):
    result = call_ai(load_prompt("heatmap_prompt.txt"), idea)
    if result:
        return result
    print(f"WARNING: AI failed for heatmap of: {idea}")
    return {"city_demand": [{"city": "Hyderabad", "state": "Telangana", "demand_score": 80, "reason": "Retry for accurate results"}, {"city": "Bangalore", "state": "Karnataka", "demand_score": 85, "reason": "Retry for accurate results"}, {"city": "Mumbai", "state": "Maharashtra", "demand_score": 82, "reason": "Retry for accurate results"}], "top_launch_city": "Bangalore", "top_launch_reason": "Retry for accurate results", "tier2_opportunity": "Retry for accurate results"}

def check_originality(idea: str):
    result = call_ai(load_prompt("originality_prompt.txt"), idea)
    if result:
        return result
    print(f"WARNING: AI failed for originality check of: {idea}")
    return {"verdict": "SIMILAR_EXISTS", "verdict_explanation": "Retry for accurate results", "existing_products": [], "originality_score": 70, "unique_angle_available": "Retry for accurate results", "recommendation": "BUILD_IT", "recommendation_reason": "Retry for accurate results"}
