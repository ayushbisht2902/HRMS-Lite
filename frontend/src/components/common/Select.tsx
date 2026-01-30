import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ label, error, options, placeholder, className = '', ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>}
            <div className="relative">
                <select
                    className={`w-full px-3 py-2 text-sm bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer ${className}`}
                    {...props}
                    defaultValue={props.value === undefined ? "" : props.value}
                >
                    {placeholder && <option value="" disabled>{placeholder}</option>}
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};
