GOAL_DEFAULTS = {
    "Emergency fund": {"horizon": 2, "risk": "conservative", "account": "HISA"},
    "Save for big purchase": {"horizon": 2, "risk": "moderate", "account": "TFSA"},
    "Buying a home": {"horizon": 10, "risk": "moderate", "account": "FHSA"},
    "Build wealth long-term": {"horizon": 20, "risk": "aggressive", "account": "TFSA"},
    "Retirement": {"horizon": 30, "risk": "aggressive", "account": "TFSA / RRSP"},
}

def get_goal_defaults(goal: str):
    return GOAL_DEFAULTS.get(goal, {"horizon": 5, "risk": "moderate", "account": "TFSA"})
