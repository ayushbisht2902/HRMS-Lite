from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.core.database import get_db
from app.schemas.attendance import Attendance, AttendanceCreate
from app.services import attendance_service

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("", response_model=Attendance, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    return attendance_service.mark_attendance(db=db, attendance=attendance)

@router.get("", response_model=List[Attendance])
def read_attendance(
    employee_id: str, 
    start_date: date = None, 
    end_date: date = None, 
    db: Session = Depends(get_db)
):
    return attendance_service.get_attendance_by_employee(
        db, 
        employee_id=employee_id, 
        start_date=start_date, 
        end_date=end_date
    )
