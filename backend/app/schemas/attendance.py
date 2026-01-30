from pydantic import BaseModel, Field
from datetime import date

class AttendanceBase(BaseModel):
    date: date
    status: str = Field(..., pattern="^(Present|Absent)$")

class AttendanceCreate(AttendanceBase):
    employee_id: str

class Attendance(AttendanceBase):
    id: int
    employee_id: str

    class Config:
        from_attributes = True
