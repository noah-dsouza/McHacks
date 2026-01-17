from pydantic import BaseModel
from typing import Optional

class UserFinancialProfile(BaseModel):
    goal: Optional[str] = None
    suggested_account: Optional[str] = None
    horizon: Optional[int] = None
    horizon_category: Optional[str] = None
    risk_profile: Optional[str] = None

class GoalInput(BaseModel):
    goal: str  

class HorizonInput(BaseModel):
    horizon: int  
    profile: UserFinancialProfile  

class AllocationInput(BaseModel):
    profile: UserFinancialProfile  
    risk_override: Optional[str] = None 