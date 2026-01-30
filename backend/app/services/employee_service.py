from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate
import uuid

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Employee).offset(skip).limit(limit).all()

def get_employee_by_id(db: Session, employee_id: str):
    return db.query(Employee).filter(Employee.id == employee_id).first()

def create_employee(db: Session, employee: EmployeeCreate):
    # Check if employee_id already exists
    existing_emp = db.query(Employee).filter(Employee.employee_id == employee.employee_id).first()
    if existing_emp:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Employee with ID {employee.employee_id} already exists"
        )
    
    # Check if email already exists
    existing_email = db.query(Employee).filter(Employee.email == employee.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email address is already registered"
        )
    
    db_employee = Employee(
        id=str(uuid.uuid4()),
        **employee.model_dump()
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, employee_id: str):
    db_employee = get_employee_by_id(db, employee_id)
    if not db_employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    db.delete(db_employee)
    db.commit()
    return db_employee
