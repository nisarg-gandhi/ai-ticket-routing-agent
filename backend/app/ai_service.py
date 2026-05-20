import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file (if it exists)
load_dotenv()

# Initialize the Groq client
# The Groq client automatically looks for the GROQ_API_KEY environment variable.
try:
    client = Groq()
except Exception as e:
    print(f"Warning: Failed to initialize Groq client (is GROQ_API_KEY set?): {e}")
    client = None

def classify_ticket(subject: str, message: str) -> dict:
    """
    Calls the Groq API to classify a ticket based on its subject and message.
    Returns a dictionary with 'category', 'urgency', and 'sentiment'.
    """
    if not client:
        return {
            "category": "General Inquiry",
            "urgency": "Medium",
            "sentiment": "Neutral"
        }

    # Prompt Engineering Strategy:
    # 1. System Role: Set a clear persona for the AI (expert customer support AI).
    # 2. Strict Constraints: Explicitly list the allowed categories, urgencies, and sentiments.
    # 3. Output Format: Demand a strict JSON response. Groq supports JSON mode for structured data.
    prompt = f"""
You are an expert customer support AI. Your task is to classify a support ticket.
Please analyze the following ticket subject and message, and categorize it based strictly on the criteria below.

Ticket Subject: "{subject}"
Ticket Message: "{message}"

Categories:
- Billing
- Bug Report
- Feature Request
- Technical Support
- Refund Request
- Account Access
- General Inquiry

Urgency:
- Low
- Medium
- High
- Critical

Sentiment:
- Positive
- Neutral
- Negative

Return ONLY a valid JSON object with exactly the following structure:
{{
    "category": "one of the categories",
    "urgency": "one of the urgencies",
    "sentiment": "one of the sentiments"
}}
"""
    
    try:
        # API Flow:
        # 1. We construct a chat completion request to the Groq API.
        # 2. We use 'llama3-8b-8192' model because it's extremely fast and good at simple reasoning/classification.
        # 3. We set response_format to "json_object" to ensure valid JSON is returned.
        # 4. We set temperature to 0.0 to ensure deterministic, consistent results.
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful AI assistant that outputs structured JSON for ticket classification."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-8b-8192", 
            response_format={"type": "json_object"},
            temperature=0.0,
        )
        
        # Parse the JSON string returned by the LLM into a Python dictionary
        response_content = chat_completion.choices[0].message.content
        result = json.loads(response_content)
        
        # Ensure we return the expected keys, fallback to defaults if the LLM hallucinated keys
        return {
            "category": result.get("category", "General Inquiry"),
            "urgency": result.get("urgency", "Medium"),
            "sentiment": result.get("sentiment", "Neutral")
        }
    except Exception as e:
        print(f"Error classifying ticket with Groq: {e}")
        # Robust Error Handling: Return default values if the API fails for any reason
        return {
            "category": "General Inquiry",
            "urgency": "Medium",
            "sentiment": "Neutral"
        }
