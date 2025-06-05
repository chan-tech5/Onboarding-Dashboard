import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: Option[];
  error?: string;
  onChange: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, onChange, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} 
            ${className}`
          }
          onChange={(e) => onChange(e.target.value)}
          {...props}
        >
          <option value="" disabled>Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;