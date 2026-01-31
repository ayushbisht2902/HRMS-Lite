import React, { useState, useEffect } from 'react';
import http from '../api/http';
import { Employee } from '../types/employee';
import { Attendance, AttendanceCreate } from '../types/attendance';
import { AttendanceForm } from '../components/attendance/AttendanceForm';
import { AttendanceTable } from '../components/attendance/AttendanceTable';

const AttendancePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
    const [loadingAttendance, setLoadingAttendance] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [marking, setMarking] = useState(false);

    // Filter states
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await http.get<Employee[]>('/employees');
                setEmployees(res.data);
            } catch (err) {
                setError('Connection Error: Unable to load workforce registry.');
            } finally {
            }
        };
        fetchEmployees();
    }, []);

    const fetchAttendance = async (empId: string, start?: string, end?: string) => {
        try {
            setLoadingAttendance(true);
            let url = `/attendance?employee_id=${empId}`;
            if (start) url += `&start_date=${start}`;
            if (end) url += `&end_date=${end}`;
            const res = await http.get<Attendance[]>(url);
            setAttendanceRecords(res.data);
        } catch (err) {
            setError('System Error: Failed to retrieve attendance history.');
        } finally {
            setLoadingAttendance(false);
        }
    };

    const handleEmployeeSelect = (id: string) => {
        setSelectedEmployeeId(id);
        fetchAttendance(id, startDate, endDate);
    };

    const handleFilterChange = () => {
        if (selectedEmployeeId) {
            fetchAttendance(selectedEmployeeId, startDate, endDate);
        }
    };

    const handleMarkAttendance = async (data: AttendanceCreate) => {
        try {
            setMarking(true);
            await http.post<Attendance>('/attendance', data);
            fetchAttendance(data.employee_id, startDate, endDate);
        } catch (err: any) {
            alert(err.response?.data?.detail || 'Update Failed: Attendance record conflict.');
        } finally {
            setMarking(false);
        }
    };

    const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

    // Summary stats
    const stats = {
        present: attendanceRecords.filter(r => r.status === 'Present').length,
        absent: attendanceRecords.filter(r => r.status === 'Absent').length,
        total: attendanceRecords.length
    };

    const getTodayLocal = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="space-y-12">
            {/* 1. Page Header */}
            <header className="border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
                <p className="text-sm text-gray-500 mt-1">Monitor and record daily personnel availability.</p>
            </header>

            {/* Error Alert */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded text-sm">
                    {error}
                </div>
            )}

            {/* 2. Mark Attendance Form */}
            <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 px-1">Log Daily Attendance</h2>
                <div className="card-container">
                    <AttendanceForm
                        employees={employees}
                        selectedEmployeeId={selectedEmployeeId || undefined}
                        onEmployeeChange={handleEmployeeSelect}
                        onSubmit={handleMarkAttendance}
                        isSubmitting={marking}
                    />
                </div>
            </section>

            {/* 3. Attendance Records Table & Filters */}
            <section>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 px-1">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                            {selectedEmployee ? `Activity Log: ${selectedEmployee.full_name}` : 'History Log'}
                        </h2>
                    </div>

                    {selectedEmployeeId && (
                        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3 text-xs">
                                <span className="text-gray-400 font-bold uppercase min-w-[32px]">From</span>
                                <input
                                    type="date"
                                    className="flex-1 border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-blue-100 outline-none"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    max={getTodayLocal()}
                                />
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                                <span className="text-gray-400 font-bold uppercase min-w-[32px]">To</span>
                                <input
                                    type="date"
                                    className="flex-1 border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-blue-100 outline-none"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    max={getTodayLocal()}
                                />
                            </div>
                            <button
                                onClick={handleFilterChange}
                                className="sm:ml-2 bg-blue-600 text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                            >
                                Apply Filters
                            </button>
                        </div>
                    )}
                </div>

                {!selectedEmployeeId ? (
                    <div className="py-20 text-center text-gray-400 border border-gray-100 rounded-lg bg-gray-50/30 px-4">
                        Select an employee from the dropdown to view and manage their logs.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm text-center">
                                <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Total Recs</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm text-center">
                                <p className="text-[10px] sm:text-[11px] font-bold text-green-500 uppercase tracking-widest mb-1 sm:mb-2">Present</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.present}</p>
                            </div>
                            <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm text-center sm:col-span-2 md:col-span-1">
                                <p className="text-[10px] sm:text-[11px] font-bold text-red-500 uppercase tracking-widest mb-1 sm:mb-2">Absent</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.absent}</p>
                            </div>
                        </div>

                        <AttendanceTable records={attendanceRecords} isLoading={loadingAttendance} />
                    </div>
                )}
            </section>
        </div>
    );
};

export default AttendancePage;
