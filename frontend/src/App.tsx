import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';
import AttendancePage from './pages/AttendancePage';

const App: React.FC = () => {
    const location = useLocation();

    const isPageActive = (path: string) => {
        if (location.pathname === path) return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-8 h-full">
                        <Link to="/employees" className="text-sm font-black tracking-tighter uppercase text-gray-900 border-r border-gray-200 pr-8 mr-2 hidden md:block">
                            HRMS <span className="text-blue-600">Lite</span>
                        </Link>

                        <div className="flex items-center gap-2 h-full">
                            <Link
                                to="/employees"
                                className={`nav-link h-full flex items-center px-4 border-b-2 transition-all ${isPageActive('/employees') || location.pathname === '/' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                            >
                                Employees
                            </Link>
                            <Link
                                to="/attendance"
                                className={`nav-link h-full flex items-center px-4 border-b-2 transition-all ${isPageActive('/attendance') ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                            >
                                Attendance
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Global</span>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                <Routes>
                    <Route path="/" element={<Navigate to="/employees" replace />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/attendance" element={<AttendancePage />} />
                </Routes>
            </main>

            {/* Simple Footer */}
            <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">HRMS Lite System</span>
                    <span className="text-[10px] text-gray-400 mt-1 uppercase">Cloud Managed &bullet; Secure &bullet; v2.5.0</span>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-tight">
                    &copy; 2026 Internal Operations Team. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default App;
