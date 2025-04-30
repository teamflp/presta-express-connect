
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FormInput: React.FC<InputProps> = ({ 
  label, 
  id, 
  error, 
  className = "",
  icon,
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full px-4 ${icon ? 'pl-10' : 'pl-4'} py-2.5 rounded-lg border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#C63E46]'} 
          shadow-sm transition-all duration-200 focus:outline-none focus:border-[#C63E46] focus:ring-1 ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export const FormCheckbox: React.FC<CheckboxProps> = ({ 
  label, 
  id, 
  className = "", 
  ...props 
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className={`w-4 h-4 text-[#C63E46] border-gray-300 rounded focus:ring-[#C63E46] focus:ring-offset-0 ${className}`}
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const FormButton: React.FC<ButtonProps> = ({ 
  children, 
  isLoading = false, 
  variant = 'primary', 
  fullWidth = false,
  className = "", 
  ...props 
}) => {
  const baseClasses = "px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-[#C63E46] hover:bg-[#A33138] text-white border border-transparent focus:ring-[#C63E46]",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-transparent focus:ring-gray-300",
    outline: "bg-transparent hover:bg-gray-50 text-[#C63E46] border border-[#C63E46] focus:ring-[#C63E46]"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Traitement en cours...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

interface FormCardProps {
  children: React.ReactNode;
  title: React.ReactNode | string;
  subtitle?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  children,
  title,
  subtitle
}) => {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="text-center space-y-2">
        {typeof title === 'string' ? (
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        )}
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export const FormDivider: React.FC<{text: string}> = ({ text }) => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 text-gray-500 bg-white">{text}</span>
      </div>
    </div>
  );
};
