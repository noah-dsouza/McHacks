from fastapi import FastAPI
from pydantic import BaseModel
from backend.logic.build_financial_profile import get_goal_defaults, categorize_horizon, determine_risk
from backend.gemini import generate_educational_text
from backend.models import UserFinancialProfile, GoalInput, HorizonInput

app = FastAPI()

@app.post("/submit_goal")
def submit_goal(data: GoalInput):
    defaults = get_goal_defaults(data.goal)
    
    profile = UserFinancialProfile(
        goal=data.goal,
        suggested_account=defaults['account'],
        horizon=defaults['horizon']
    )

    gemini_prompt = (
        f"Deliver a short educational paragraph on personal finance. "
        f"The user wants to achieve '{profile.goal}'. Explain why this goal is important, "
        f"what a {profile.suggested_account} is, and why using it helps achieve the goal. "
        f"Include total/yearly contribution limits if applicable."
    )

    goal_text = generate_educational_text(prompt=gemini_prompt)

    return {
        "profile": profile.model_dump(),
        "educational_text": goal_text
    }


@app.post("/submit_horizon")
def submit_horizon(data: HorizonInput):
    profile = data.profile
    
    profile.horizon = data.horizon # number of years for investment timeline
    profile.horizon_category = categorize_horizon(profile.horizon)

    profile.risk_profile = determine_risk(profile.goal, profile.horizon_category)

    gemini_prompt = (
        f"Explain in a short paragraph that the user has a {profile.horizon_category} investment horizon based on their input and how it"
        f"affects a user's investment strategy for the goal '{profile.goal}'. "
        f"Also indicate why the risk level '{profile.risk_profile}' fits this horizon category."
    )

    educational_text = generate_educational_text(prompt=gemini_prompt)
    
    return {
        "profile": profile.model_dump(exclude_none=True),
        "educational_text": educational_text
    }