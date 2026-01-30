import React from 'react';
import { Employee } from '../../types/employee';
import { Button } from '../common/Button';

interface EmployeeTableProps {
    employees: Employee[];
    onDelete: (id: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee ID</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {employees.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-blue-600">{emp.employee_id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{emp.full_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                                    {emp.department}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right">
                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(emp.id)}
                                    title="Remove Employee"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
