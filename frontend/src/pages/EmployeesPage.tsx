import React, { useState, useEffect } from 'react';
import http from '../api/http';
import { Employee, EmployeeCreate } from '../types/employee';
import { EmployeeForm } from '../components/employees/EmployeeForm';
import { EmployeeTable } from '../components/employees/EmployeeTable';

const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formError, setFormError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const res = await http.get<Employee[]>('/employees');
            setEmployees(res.data);
            setError(null);
        } catch (err: any) {
            setError('System Error: Failed to synchronize employee records.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleCreateEmployee = async (data: EmployeeCreate) => {
        try {
            setSubmitting(true);
            setFormError(null);
            const res = await http.post<Employee>('/employees', data);
            setEmployees(prev => [...prev, res.data]);
            setFormError(null);
        } catch (err: any) {
            setFormError(err.response?.data?.detail || 'Validation Error: Please check your input.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteEmployee = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        try {
            await http.delete(`/employees/${id}`);
            setEmployees(prev => prev.filter(emp => emp.id !== id));
        } catch (err: any) {
            alert('Delete Operation Failed.');
        }
    };

    return (
        <div className="space-y-12">
            {/* 1. Page Header */}
            <header className="border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                <p className="text-sm text-gray-500 mt-1">Register new personnel and maintain organization records.</p>
            </header>

            {/* 2. Add Employee Form (Card) */}
            <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 px-1">Add New Employee</h2>
                <div className="card-container">
                    <EmployeeForm
                        onSubmit={handleCreateEmployee}
                        isSubmitting={submitting}
                        error={formError}
                    />
                </div>
            </section>

            {/* 3. Employee List Table */}
            <section>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Personnel Directory</h2>
                    {loading && <span className="text-xs text-gray-400 animate-pulse">Synchronizing...</span>}
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {loading && employees.length === 0 ? (
                    <div className="py-20 text-center text-gray-400 border border-gray-100 rounded-lg">
                        Loading employees...
                    </div>
                ) : employees.length === 0 ? (
                    <div className="py-20 text-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
                        No employees found. Add one to get started.
                    </div>
                ) : (
                    <EmployeeTable
                        employees={employees}
                        onDelete={handleDeleteEmployee}
                    />
                )}
            </section>
        </div>
    );
};

export default EmployeesPage;
