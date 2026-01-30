from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class EmployeeBase(BaseModel):
    employee_id: str = Field(..., description="Unique Employee ID")
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
