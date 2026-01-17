import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=gemini_api_key)

def generate_educational_text(prompt: str):
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt
    )
    
    return response.text