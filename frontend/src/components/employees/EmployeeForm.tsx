import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { EmployeeCreate } from '../../types/employee';

interface EmployeeFormProps {
    onSubmit: (data: EmployeeCreate) => Promise<void>;
    isSubmitting: boolean;
    error?: string | null;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, isSubmitting, error }) => {
    const [formData, setFormData] = useState<EmployeeCreate>({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
    });

    const departments = [
        { value: 'Engineering', label: 'Engineering' },
        { value: 'HR', label: 'HR' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Design', label: 'Design' }
    ];

const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
        // Clear form if successful (this logic is simplified, usually controlled by parent if error occurs)
        if (!error) {
            setFormData({
                employee_id: '',
                full_name: '',
                email: '',
                department: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <Input
                    label="Employee ID"
                    placeholder="e.g. EMP101"
                    value={formData.employee_id}
                    onChange={e => setFormData({ ...formData, employee_id: e.target.value })}
                    required
                />

                <Input
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <Select
                    label="Department"
                    placeholder="Choose Department"
                    options={departments}
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    required
                />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-full md:w-48"
                >
                    Add Employee
                </Button>
            </div>
        </form>
    );
};
