from sqlalchemy import Column, String, Date, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    employee_id = Column(String(50), ForeignKey("employees.id"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False) # "Present" or "Absent"

    employee = relationship("Employee", back_populates="attendance_records")

    __table_args__ = (
        UniqueConstraint('employee_id', 'date', name='_employee_date_uc'),
    )
