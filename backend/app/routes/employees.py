from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.employee import Employee, EmployeeCreate
from app.services import employee_service

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("", response_model=Employee, status_code=status.HTTP_201_CREATED)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return employee_service.create_employee(db=db, employee=employee)

@router.get("", response_model=List[Employee])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return employee_service.get_employees(db, skip=skip, limit=limit)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(id: str, db: Session = Depends(get_db)):
    employee_service.delete_employee(db, employee_id=id)
    return None
