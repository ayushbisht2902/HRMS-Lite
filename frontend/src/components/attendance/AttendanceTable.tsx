import React from 'react';
import { Attendance } from '../../types/attendance';

interface AttendanceTableProps {
    records: Attendance[];
    isLoading?: boolean;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, isLoading }) => {
    if (isLoading && records.length === 0) {
        return (
            <div className="py-20 text-center text-gray-400 border border-gray-100 rounded-lg">
                Synchronizing logs...
            </div>
        );
    }

    if (records.length === 0) {
        return (
            <div className="py-20 text-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
                No attendance records found for this personnel.
            </div>
        );
    }

    const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {sortedRecords.map(record => (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.date}</td>
                            <td className="px-6 py-4 text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${record.status === 'Present'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {record.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
