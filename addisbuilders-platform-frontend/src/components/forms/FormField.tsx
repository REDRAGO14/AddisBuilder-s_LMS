import React from 'react';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  htmlFor,
  children,
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
          {label}
          {required && <span className="text-red-500 ml-1 rtl:ml-0 rtl:mr-1">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>
      ) : null}
    </div>
  );
};
