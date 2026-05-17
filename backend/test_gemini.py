import os
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai

api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key found: {'YES' if api_key else 'NO'}")
print(f"Key starts with: {api_key[:10] if api_key else 'MISSING'}")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash-8b")
response = model.generate_content("Say hello in one sentence")
print("SUCCESS:", response.text)
