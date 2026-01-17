from fastapi import FastAPI
from pydantic import BaseModel
from backend.logic.goal_defaults import get_goal_defaults
from backend.gemini import generate_educational_text

app = FastAPI()

class GoalInput(BaseModel):
    goal: str  # user-selected goal

@app.post("/submit_goal")
def post_goal(data: GoalInput):
    defaults = get_goal_defaults(data.goal)
    suggested_account = defaults['account']
    
    gemini_prompt = f"Deliver some educational content on personal finace. User has this financial goal: {data.goal}.\
                    Answer in a short paragraph why this goal is important, what an {suggested_account} is\
                    and why using a this account can help you reach your goal.\
                    Don't forget to indicate the total/yearly contribution limits."
    
    educational_text = generate_educational_text(prompt=gemini_prompt)
    
    return {
        "goal": data.goal,
        "default_horizon": defaults["horizon"],
        "default_risk": defaults["risk"],
        "account_focus": defaults["account"],
        "educational_text": educational_text
    }
