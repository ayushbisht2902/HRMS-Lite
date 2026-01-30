from datetime import date
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.schemas.attendance import AttendanceCreate
from sqlalchemy.exc import IntegrityError

def get_attendance_by_employee(db: Session, employee_id: str, start_date: date = None, end_date: date = None):
    query = db.query(Attendance).filter(Attendance.employee_id == employee_id)
    if start_date:
        query = query.filter(Attendance.date >= start_date)
    if end_date:
        query = query.filter(Attendance.date <= end_date)
    return query.all()

def mark_attendance(db: Session, attendance: AttendanceCreate):
    # Verify employee exists
    emp = db.query(Employee).filter(Employee.id == attendance.employee_id).first()
    if not emp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee record not found"
        )
    
    if attendance.date > date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot mark attendance for future dates"
        )
    
    try:
        db_attendance = Attendance(**attendance.model_dump())
        db.add(db_attendance)
        db.commit()
        db.refresh(db_attendance)
        return db_attendance
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Attendance already marked for this employee on {attendance.date}"
        )
