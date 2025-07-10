import React from 'react';

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  icon,
  iconPosition = 'left',
  inputClassName = '',
  containerClassName = '',
  disabled = false,
  type = 'text',
  ...props
}) => {
  return (
    <div className={`${className}`}>
      <div className={`relative ${containerClassName}`}>
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${icon && iconPosition === 'left' ? 'pl-10' : 'pl-4'} ${icon && iconPosition === 'right' ? 'pr-10' : 'pr-4'} py-3 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${inputClassName}`}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;