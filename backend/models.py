from pydantic import BaseModel
from typing import Optional, Dict

class UserFinancialProfile(BaseModel):
    goal: Optional[str] = None
    suggested_account: Optional[str] = None
    horizon: Optional[int] = None
    horizon_category: Optional[str] = None
    risk_profile: Optional[str] = None
    asset_allocation: Optional[Dict] = None

class GoalInput(BaseModel):
    goal: str  

class HorizonInput(BaseModel):
    profile: UserFinancialProfile  
    horizon: int  

class AllocationInput(BaseModel):
    profile: UserFinancialProfile  
    risk_override: Optional[str] = None 

class PortfolioProjectionInput(BaseModel):
    profile: UserFinancialProfile
    investment_amount: float
    allocation_override: Optional[Dict[str, float]] = None