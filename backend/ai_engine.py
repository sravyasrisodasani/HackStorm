import os, json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def load_prompt(filename):
    with open(f'prompts/{filename}', 'r') as f:
        return f.read()

def load_demo(filename):
    with open(f'demo-data/{filename}', 'r') as f:
        return json.load(f)

def call_ai(system_prompt, user_message):
    try:
        response = client.chat.completions.create(
            model='gpt-4o',
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': f'Startup idea: {user_message}'}
            ],
            temperature=0.7
        )
        content = response.choices[0].message.content
        content = content.replace('`json', '').replace('`', '').strip()
        return json.loads(content)
    except Exception as e:
        print(f'AI call failed: {e}')
        return None

def analyze_market(idea: str):
    result = call_ai(load_prompt('market_prompt.txt'), idea)
    if result:
        return result
    return load_demo('restaurant_demo.json')['market']

def analyze_competitors(idea: str):
    result = call_ai(load_prompt('competitor_prompt.txt'), idea)
    if result:
        return result
    return load_demo('restaurant_demo.json')['competitors']

def analyze_risks(idea: str):
    result = call_ai(load_prompt('risk_prompt.txt'), idea)
    if result:
        return result
    return load_demo('restaurant_demo.json')['risklens']

def generate_scorecard(idea: str, market_score: int, saturation: str, trend: str):
    msg = f'{idea}. Market demand score: {market_score}. Saturation: {saturation}. Trend: {trend}'
    result = call_ai(load_prompt('score_prompt.txt'), msg)
    if result:
        return result
    return load_demo('restaurant_demo.json')['scorecard']

def analyze_heatmap(idea: str):
    result = call_ai(load_prompt('heatmap_prompt.txt'), idea)
    if result:
        return result
    return load_demo('restaurant_demo.json')['heatmap']