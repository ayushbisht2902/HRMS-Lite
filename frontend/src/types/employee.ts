export interface Employee {
    id: string; // Internal UUID
    employee_id: string; // Human-readable ID
    full_name: string;
    email: string;
    department: string;
    created_at?: string;
}

export interface EmployeeCreate {
    employee_id: string;
    full_name: string;
    email: string;
    department: string;
}
