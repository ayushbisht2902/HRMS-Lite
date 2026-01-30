import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>}
            <input
                className={`w-full px-3 py-2 text-sm bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};
