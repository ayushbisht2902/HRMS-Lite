import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Employee } from '../../types/employee';
import { AttendanceCreate } from '../../types/attendance';

interface AttendanceFormProps {
    employees: Employee[];
    onSubmit: (data: AttendanceCreate) => Promise<void>;
    isSubmitting: boolean;
    selectedEmployeeId?: string;
    onEmployeeChange: (id: string) => void;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({
    employees,
    onSubmit,
    isSubmitting,
    selectedEmployeeId,
    onEmployeeChange
}) => {
    const getTodayLocal = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(getTodayLocal());
    const [status, setStatus] = useState<'Present' | 'Absent'>('Present');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmployeeId) return;
        onSubmit({ employee_id: selectedEmployeeId, date, status });
    };

    const employeeOptions = employees.map(emp => ({
        value: emp.id,
        label: `${emp.full_name} (${emp.employee_id})`
    }));

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <Select
                    label="Select Employee"
                    placeholder="Choose an employee..."
                    options={employeeOptions}
                    value={selectedEmployeeId || ''}
                    onChange={(e) => onEmployeeChange(e.target.value)}
                    required
                />

                <Input
                    label="Date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    max={getTodayLocal()}
                    required
                />

                <Select
                    label="Status"
                    options={[
                        { value: 'Present', label: 'Present' },
                        { value: 'Absent', label: 'Absent' }
                    ]}
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    required
                />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={!selectedEmployeeId}
                    className="w-full md:w-48"
                >
                    Mark Attendance
                </Button>
            </div>
        </form>
    );
};
