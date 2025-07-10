import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={children ? 'mr-2' : ''}>
          {icon}
        </span>
      )}
      
      {children && <span>{children}</span>}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={children ? 'ml-2' : ''}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;