GOAL_DEFAULTS = {
    "Emergency fund": {"horizon": 2, "risk": "conservative", "account": "HISA"},
    "Save for big purchase": {"horizon": 2, "risk": "moderate", "account": "TFSA"},
    "Buying a home": {"horizon": 10, "risk": "moderate", "account": "FHSA"},
    "Build wealth long-term": {"horizon": 20, "risk": "aggressive", "account": "TFSA"},
    "Retirement": {"horizon": 30, "risk": "aggressive", "account": "TFSA / RRSP"},
}

ALLOCATION_MAP = {
    "Conservative": {"stocks": 30, "bonds": 50, "cash": 20},
    "Moderate": {"stocks": 60, "bonds": 30, "cash": 10},
    "Aggressive": {"stocks": 80, "bonds": 15, "cash": 5},
}

def get_goal_defaults(goal: str):
    default_goal = {"horizon": 5, "risk": "moderate", "account": "TFSA"}
    return GOAL_DEFAULTS.get(goal, default_goal)

def categorize_horizon(num_years: int) -> str:   
    if num_years < 3:
        return "Short-term"
    elif num_years <= 10:
        return "Mid-term"
    else:
        return "Long-term"

def determine_risk(goal: str, horizon_category: str) -> str:
    if goal == "Emergency fund" or horizon_category == "Short-term":
        return "Conservative"
    elif horizon_category == "Mid-term":
        return "Moderate"
    else:
        return "Aggressive"