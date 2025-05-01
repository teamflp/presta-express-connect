
import React, { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
  type,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={inputType}
          className={`w-full px-4 ${icon ? 'pl-11' : 'pl-4'} py-3 rounded-lg border border-gray-300 
          shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50
          bg-white ${className}`}
          {...props}
        />
        {type === 'password' && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
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
      <div className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          className={`appearance-none w-5 h-5 rounded border border-gray-300 
          checked:bg-primary checked:border-primary 
          focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/30
          transition-all duration-200 ${className}`}
          {...props}
        />
        <svg 
          className="absolute w-3.5 h-3.5 left-[3px] top-[4px] pointer-events-none opacity-0 peer-checked:opacity-100 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 12 10 16 18 8"></polyline>
        </svg>
      </div>
      <label htmlFor={id} className="ml-2.5 block text-sm text-gray-700 select-none cursor-pointer">
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
  const baseClasses = "px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-hover text-white border border-transparent focus:ring-primary/40 shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-transparent focus:ring-gray-300 shadow-sm hover:shadow-md",
    outline: "bg-transparent hover:bg-gray-50 text-primary border border-primary focus:ring-primary/30 hover:shadow-sm"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''} ${className}`}
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
        <>
          <span className="relative z-10">{children}</span>
          <span className="absolute inset-0 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 bg-opacity-10"></span>
        </>
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
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl border border-gray-100 transition-all">
      <div className="text-center space-y-2">
        {typeof title === 'string' ? (
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
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
        <span className="px-3 text-gray-500 bg-white">{text}</span>
      </div>
    </div>
  );
};
